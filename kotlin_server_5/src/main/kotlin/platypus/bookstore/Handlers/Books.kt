package platypus.bookstore.classes.db

// import org.springframework.data.r2dbc.repository.Query  
// import platypus.bookstore.repos.books.BookRepository
import platypus.bookstore.repos.books.BookRepository
import platypus.bookstore.services.books.BookService
import platypus.bookstore.classes.db.books.Books
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.web.reactive.function.server.*
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired

@Component
class BooksHandler(private val service: BookService){

  // @Autowired
  // lateinit private var service: BookService

  suspend fun findBooks(){
    println("hello")
    val allBooks = service.findBooks()
    println("value of allBooks: $allBooks")
  }

  // var title: String = book.title
  // var subtitle: String = book.subtitle
  // var publisher: String = book.publisher
  // var currentcopyright: String = book.currentcopyright
  // var authorbio: String = book.currentcopyright
  // var synopsis: String = book.synopsis
  // var isbn: String = book.isbn

  // override suspend fun save( title:String,  subtitle:String,  publisher: String,  currentcopyright:String,  authorbio:String,  synopsis:String,  isbn:String){
  //   return "saved"
  // }
  // @Query("""
  // INSERT INTO BOOKS (title, subtitle, publisher, currentcopyright, authorbio, synopsis, isbn) values (:title, :subtitle, :publisher, :currentcopyright, :authorbio, :synopsis, :isbn);
  // """)
  // override suspend fun save(title: String, subtitle: String, publisher: String, currentcopyright: String, authorbio: String, synopsis: String, isbn: String
  // ):String{
  //   return "string"
  // }
  // override suspend fun save()

  // suspend fun addbook(book: Books){
  //   println("inside addbook")
  //   book.save()
    // save()
    // save(book.title, book.subtitle, book.publisher, book.currentcopyright, book.authorbio, book.synopsis, book.isbn)
  // }
  // override fun save()
}
// abstract class BooksAbstract(book:Books): BookRepository{
//   abstract fun addbook(book:Books)
//   // fun addBook(book:Books){
//   //   println("inside addbook and value of $book");
//   // }
// }

// class BooksHandler: BooksAbstract{
//   override fun addbook(book:Books){
//     println("inside addbook")
//   }
// }

  // suspend fun addBook(book:Books){
  //   bookRepo.save(
  //     book.title, 
  //     book.subtitle, 
  //     book.publisher, 
  //     book.currentcopyright, 
  //     book.authorbio, 
  //     book.synopsis, 
  //     book.isbn)
  // }