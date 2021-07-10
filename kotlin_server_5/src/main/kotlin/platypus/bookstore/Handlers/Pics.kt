package platypus.bookstore.handlers

import platypus.bookstore.repos.PicRepository
import platypus.bookstore.classes.db.Pic
import platypus.bookstore.classes.*
import kotlin.collections.mutableListOf

class PicsHandler(val picRepo: PicRepository){

  suspend fun savebookpics(pics: MutableList<Pic>):Boolean{

    val bookpicssaved = false;
    for(pic in pics){
      var picsaved:Boolean = picRepo.savebookpic(pic.picbyte, pic.bookuniqueid, pic.frontcover, pic. backcover, pic.uniqueid)
    }

    //always returns true, need to fix this
    return true
  }
  
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