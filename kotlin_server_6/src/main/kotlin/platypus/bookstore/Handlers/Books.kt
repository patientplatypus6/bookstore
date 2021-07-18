package platypus.bookstore.handlers

import platypus.bookstore.repos.BookRepository
import platypus.bookstore.classes.db.*

class BooksHandler(val bookRepo: BookRepository){

  suspend fun deletebook(bookid: String):Boolean{
    var deletedbook = bookRepo.deletebybookid(bookid)
    return deletedbook;
  }

  suspend fun findbookbyuniqueid(uniqueid: String):Book{
    var returnvallist =  bookRepo.findbookbyuniqueid(uniqueid)
    var returnval = Book()
    if(returnvallist.size==1){
      for(returnbook in returnvallist){
        returnval = returnbook
      }
    }
    println("findbookbyuniqueid returnvallist $returnvallist")
    println("findbookbyuniqueid returnval $returnval")
    return returnval
  }
  
  suspend fun findbooks():List<BookTime>{
    println("findBooks")
    val books:List<BookTime> = bookRepo.findBooks();
    println("value of booktime $books")
    return books;
  }

  suspend fun findbooksforsale():List<Book>{
    println("findBooks")
    val books:List<Book> = bookRepo.findBooksforsale();
    println("value of books $books")
    return books;
  }

  suspend fun addbook(book: Book):Boolean{

    println("inside addbook handler and value of book $book")

    var booktime = BookTime()

    booktime.title = book.title
    booktime.subtitle = book.subtitle
    booktime.author = book.author
    booktime.publisher = book.publisher
    booktime.currentcopyright = book.currentcopyright
    booktime.bookedition = book.bookedition
    booktime.uniqueid = book.uniqueid
    booktime.storyinfo = book.storyinfo
    booktime.condition = book.condition
    booktime.isbn = book.isbn
    booktime.timeordered = 0
    booktime.timeshipped = 0
    booktime.incartguest = 0
    booktime.incartuser = 0

    println("after booktime assignment and value of booktime $booktime")

    var bookAdded:Boolean = bookRepo.saveabook(
      booktime.title,
      booktime.subtitle,
      booktime.author,
      booktime.publisher,
      booktime.currentcopyright,
      booktime.bookedition,
      booktime.uniqueid,
      booktime.storyinfo,
      booktime.condition,
      booktime.isbn,
      booktime.timeordered,
      booktime.timeshipped,
      booktime.incartguest,
      booktime.incartuser
    )
    return bookAdded
  }

  suspend fun updatebook(book: Book):Boolean{
    var bookUpdated:Boolean = bookRepo.updateabook(
      book.title, book.subtitle, book.author, book.publisher, 
      book.currentcopyright, book.bookedition, book.storyinfo, book.condition, book.isbn, book.uniqueid
    )
    return bookUpdated
  }

  suspend fun findBookIdNotOrdered(bookuniqueid: String):List<BookTime>{
    return bookRepo.findBookIdNotOrdered(bookuniqueid)
  }

  suspend fun addbooktocartuser(bookuniqueid: String, username: String):Boolean{
    var bookupdated = false;
    var milliseconds:Long = System.currentTimeMillis()
    var booknotorderednotcart:List<BookTime> = bookRepo.findBookIdNotOrderedNotInCart(bookuniqueid, milliseconds)
    var foundsize = booknotorderednotcart.size
    println("foundsize $foundsize")
    if(foundsize>0){
      for (book in booknotorderednotcart){
        println("before addbooktocartuser values are bookuniqueid $bookuniqueid milliseconds $milliseconds username $username")
        bookupdated = bookRepo.updateBookinCartUser(bookuniqueid, milliseconds, username)
        println("value of bookupdated in for loop: $bookupdated")
      }
      println("value of bookupdated outside for loop: $bookupdated")
      return bookupdated
    }else{
      return false
    }
  } 

  suspend fun addbooktocartguest(bookuniqueid: String, username: String):Boolean{
    var bookupdated = false;
    var milliseconds:Long = System.currentTimeMillis()
    var booknotorderednotcart:List<BookTime> = bookRepo.findBookIdNotOrderedNotInCart(bookuniqueid, milliseconds)
    if(booknotorderednotcart.size>0){
      for (book in booknotorderednotcart){
        bookupdated = bookRepo.updateBookinCartGuest(bookuniqueid, milliseconds, username)
      }
      return bookupdated
    }else{
      return false
    }
  }

  suspend fun findbooksincartbynameuser(username:String):List<Book>{
    println("in findbooksincartbynameuser and username: $username")
    return bookRepo.findbooksincartbynameuser(username, System.currentTimeMillis())
  }

  suspend fun findbooksincartbynameguest(username:String):List<Book>{
    return bookRepo.findbooksincartbynameguest(username, System.currentTimeMillis())
  }

} 