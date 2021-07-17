package platypus.bookstore.handlers

import platypus.bookstore.repos.BookRepository
import platypus.bookstore.classes.db.*

// import java.math.BigInteger

class BooksHandler(val bookRepo: BookRepository){

  suspend fun deletebook(bookid: String):Boolean{
    var deletedbook = bookRepo.deletebybookid(bookid)
    return deletedbook;
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

  suspend fun addbooktocartuser(bookuniqueid: String):Boolean{
    var bookupdated = false;
    var milliseconds:Long = System.currentTimeMillis()
    var booknotorderednotcart:List<BookTime> = bookRepo.findBookIdNotOrdered(bookuniqueid)
    if(booknotorderednotcart.size>0){
      for (book in booknotorderednotcart){
        if(
          (book.incartguest == 0.toLong() || milliseconds - book.incartguest > 300000.toLong()) &&
          (book.incartuser == 0.toLong() || milliseconds - book.incartuser > 3600000.toLong())
        ){
          bookupdated = bookRepo.updateBookIdinCartUser(bookuniqueid, milliseconds)
        }
      }
      return bookupdated
    }else{
      return false
    }
  }

  suspend fun addbooktocartguest(bookuniqueid: String):Boolean{
    var bookupdated = false;
    var milliseconds:Long = System.currentTimeMillis()
    var booknotorderednotcart:List<BookTime> = bookRepo.findBookIdNotOrdered(bookuniqueid)
    if(booknotorderednotcart.size>0){
      for (book in booknotorderednotcart){
        if(
          (book.incartguest == 0.toLong() || milliseconds - book.incartguest > 300000.toLong()) &&
          (book.incartuser == 0.toLong() || milliseconds - book.incartuser > 3600000.toLong())
        ){
          println("inside if statement")
          bookupdated = bookRepo.updateBookIdinCartGuest(bookuniqueid, milliseconds)
          println("bookupdated in if and value $bookupdated")
        }
      }
      return bookupdated
    }else{
      return false
    }
  }
} 