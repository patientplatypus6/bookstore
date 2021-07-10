package platypus.bookstore.handlers

import platypus.bookstore.repos.PicRepository
import platypus.bookstore.classes.db.Pic

class PicsHandler(val picRepo: PicRepository){
  
  // suspend fun findbooks():List<Book>{
  //   println("findBooks")
  //   val books:List<Book> = bookRepo.findBooks();
  //   println("value of books $books")
  //   return books;
  // }

  // suspend fun addbook(book: Book):Boolean{
  //   var bookUpdated:Boolean = bookRepo.saveabook(
  //     book.title, book.subtitle, book.publisher, 
  //     book.currentcopyright, book.bookedition, 
  //     book.uniqueid, book.authorbio, book.synopsis, book.isbn
  //   )
  //   return bookUpdated
  // }
} 
