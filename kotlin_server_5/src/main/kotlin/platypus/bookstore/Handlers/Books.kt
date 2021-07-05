package platypus.bookstore.classes.db

// import org.springframework.data.r2dbc.repository.Query  
// import platypus.bookstore.repos.books.BookRepository
import platypus.bookstore.repos.books.BookRepository
// import platypus.bookstore.services.books.BookService
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
  
  suspend fun findBooks(){
    println("findBooks")
    val books = bookRepo.findBooks();
    println("value of books $books")
  }

  suspend fun addBook(book: Books){
    println("addBooks")
    val title:String = book.title;
    val subtitle:String = book.subtitle;
    val publisher:String = book.publisher;
    val currentcopyright:String = book.currentcopyright;
    val bookedition:String = book.bookedition;
    val uniqueid:String = book.uniqueid;
    val authorbio:String = book.authorbio;
    val synopsis:String = book.synopsis;
    val isbn:String = book.isbn;

    println("----------")
    println("---BOOK---")
    println("$book")
    println("title $title")
    println("subtitle $subtitle")
    println("publisher $publisher")
    println("currentcopyright $currentcopyright")
    println("bookedition $bookedition")
    println("uniqueid $uniqueid")
    println("authorbio $authorbio")
    println("synopsis $synopsis")
    println("isbn $isbn")
    println("----------")

    // val bookAdded:Unit = bookRepo.addBook(title, subtitle, publisher, currentcopyright, authorbio, synopsis, isbn);
    bookRepo.save(book);
    // println("value of bookAdded: $bookAdded")
    findBooks()
  }

} 