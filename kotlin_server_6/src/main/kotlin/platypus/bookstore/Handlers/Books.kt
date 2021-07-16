package platypus.bookstore.handlers

import platypus.bookstore.repos.BookRepository
import platypus.bookstore.classes.db.Book
import platypus.bookstore.classes.db.RevenueCost
import platypus.bookstore.classes.db.BookRC

class BooksHandler(val bookRepo: BookRepository){

  suspend fun deletebook(bookid: String):Boolean{
    var deletedbook = bookRepo.deletebybookid(bookid)
    return deletedbook;
  }
  
  suspend fun findbooks():List<Book>{
    println("findBooks")
    val books:List<Book> = bookRepo.findBooks();
    println("value of books $books")
    return books;
  }


  suspend fun findbooksforsale():List<Book>{
    println("findBooks")
    val books:List<Book> = bookRepo.findBooksforsale();
    println("value of books $books")
    return books;
  }

  suspend fun addbook(book: Book):Boolean{
    var bookAdded:Boolean = bookRepo.saveabook(
      book.title, book.subtitle, book.author, book.publisher, 
      book.currentcopyright, book.bookedition, 
      book.uniqueid, book.storyinfo, book.condition, book.isbn
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
    var booknotorderednotcart:List<Book> = bookRepo.findBookIdNotOrderedNotCart(bookuniqueid, System.currentTimeMillis())
    for (book in booknotorderednotcart){
      println("value of book $book")
      bookupdated = bookRepo.updateBookIdNotOrderedNotCartUser(System.currentTimeMillis())
    }
    return bookupdated
  }

  suspend fun addbooktocartguest(bookuniqueid: String):Boolean{
    var bookupdated = false;
    var booknotorderednotcart = bookRepo.findBookIdNotOrderedNotCart(bookuniqueid, System.currentTimeMillis())
    for (book in booknotorderednotcart){
      println("value of book $book")
      bookupdated = bookRepo.updateBookIdNotOrderedNotCartGuest(System.currentTimeMillis())
    }
    return bookupdated
  }
} 
