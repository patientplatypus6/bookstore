package platypus.bookstore.classes.db

import platypus.bookstore.repos.books.BookRepository
import platypus.bookstore.classes.db.books.Books
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.web.reactive.function.server.*
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Persistable

@Component
@ComponentScan("platypus.bookstore")
class BooksHandler(val bookRepo: BookRepository){
  
  suspend fun findBooks():List<Books>{
    println("findBooks")
    val books:List<Books> = bookRepo.findBooks();
    println("value of books $books")
    return books;
  }

  suspend fun addBook(book: Books):List<Books>{
    println("addBooks")
    bookRepo.save(book);
    var bookList:List<Books> = findBooks()
    return bookList;
  }

  suspend fun addBooks(books: List<Books>):List<Books>{
    println("addBooks")
    for(book in books){
      bookRepo.save(book);
    }
    var bookList:List<Books> = findBooks()
    return bookList;
  }

} 

// val title:String = book.title;
// val subtitle:String = book.subtitle;
// val publisher:String = book.publisher;
// val currentcopyright:String = book.currentcopyright;
// val bookedition:String = book.bookedition;
// val uniqueid:String = book.uniqueid;
// val authorbio:String = book.authorbio;
// val synopsis:String = book.synopsis;
// val isbn:String = book.isbn;

// println("----------")
// println("---BOOK---")
// println("$book")
// println("title $title")
// println("subtitle $subtitle")
// println("publisher $publisher")
// println("currentcopyright $currentcopyright")
// println("bookedition $bookedition")
// println("uniqueid $uniqueid")
// println("authorbio $authorbio")
// println("synopsis $synopsis")
// println("isbn $isbn")
// println("----------")