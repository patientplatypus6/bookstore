package platypus.bookstore.handlers

import platypus.bookstore.repos.PicRepository
import platypus.bookstore.classes.db.Pic
import platypus.bookstore.classes.db.PicBookId
import platypus.bookstore.classes.*
import kotlin.collections.mutableListOf

class PicsHandler(val picRepo: PicRepository){

  suspend fun savebookpics(pics: MutableList<Pic>):Boolean{


    val bookpicssaved = false;
    for(pic in pics){

      val bookuniqueid = pic.bookuniqueid;
      val frontcover = pic.frontcover;
      val backcover = pic.backcover;
      val uniqueid = pic.uniqueid;


      println("bookuniqueid: $bookuniqueid");
      println("frontcover: $frontcover");
      println("backcover: $backcover");
      println("uniqueid: $uniqueid");
      

      var picsaved:Boolean = picRepo.savebookpic(pic.picbyte, pic.bookuniqueid, pic.frontcover, pic. backcover, pic.uniqueid)
    }

    //always returns true, need to fix this
    return true
  }

  suspend fun findcovers(picbookid: PicBookId): List<Pic>{
    var coverlist = picRepo.findcoversbybookgroup(picbookid.bookids)
    return coverlist
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
