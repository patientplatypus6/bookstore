package platypus.bookstore.handlers

import platypus.bookstore.repos.BookRepository
import platypus.bookstore.classes.db.*
import platypus.bookstore.api.postrequest
import platypus.bookstore.api.getrequest

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

  suspend fun findbookidsbycartholdername():List<BookIDSbyCartholdername>{
    return bookRepo.findbookidsbycartholdername(System.currentTimeMillis())
  }

  suspend fun findcartholderbybookid(uniqueid: String, milliseconds: Long):String{
    var booklist = bookRepo.findcartholderbybookid(uniqueid, milliseconds)
    if(booklist.size>0){
      var name: String = "";
      for(book in booklist){
        name = book.cartholdername;
      }
      return name;
    }else{
      return ""
    }
  }

  suspend fun addbooktocartuser(bookuniqueid: String, username: String):Boolean{
    var bookupdated = false;
    var milliseconds:Long = System.currentTimeMillis()
    var booknotorderednotcart:List<BookTime> = bookRepo.findBookIdNotOrderedNotInCart(bookuniqueid, milliseconds)
    var foundsize = booknotorderednotcart.size
    if(foundsize>0){
      for (book in booknotorderednotcart){
        bookupdated = bookRepo.updateBookinCartUser(bookuniqueid, milliseconds, username)
      }
      if(bookupdated){
        val posthash:HashMap<String,String> = HashMap<String, String>()
        posthash.put("bookuniqueid", bookuniqueid)
        posthash.put("username: ", username)
        posthash.put("time: ", "3600000")
        postrequest(posthash, "http://nodeserver:4000/bookincart")
      }
      return bookupdated
    }else{
      return false
    }
  } 

  suspend fun addbooktocartguest(bookuniqueid: String, username: String):Boolean{
    println("inside addbooktocartguest")
    var bookupdated = false;
    var milliseconds:Long = System.currentTimeMillis()
    var booknotorderednotcart:List<BookTime> = bookRepo.findBookIdNotOrderedNotInCart(bookuniqueid, milliseconds)
    println("value of booknotrorderednotcart: $booknotorderednotcart")
    if(booknotorderednotcart.size>0){
      println("inside size > 0")
      for (book in booknotorderednotcart){
        bookupdated = bookRepo.updateBookinCartGuest(bookuniqueid, milliseconds, username)
        println("value of bookupdated: $bookupdated")
      }
      if(bookupdated){
        println("inside if statement for bookupdated")
        val posthash:HashMap<String,String> = HashMap<String, String>()
        posthash.put("bookuniqueid", bookuniqueid)
        posthash.put("username", username)
        posthash.put("time", "600000")
        postrequest(posthash, "http://nodeserver:4000/bookincart")
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

  suspend fun removebookcart(bookuniqueid: String):Boolean{
    return bookRepo.removebookcart(bookuniqueid)
  }

  suspend fun checkcart(bookuniqueid: String):List<BookIDSbyCartholdername>{
    var milliseconds = System.currentTimeMillis()
    var returnval = bookRepo.findbooksincarts(bookuniqueid, milliseconds)
    println("value of returnval $returnval")
    return returnval;
  }

  suspend fun checkcartmultiple():List<BookIDSbyCartholdername>{
    var milliseconds = System.currentTimeMillis()
    var returnval = bookRepo.findbooksincartsmultiple(milliseconds)
    return returnval;
  }

} 