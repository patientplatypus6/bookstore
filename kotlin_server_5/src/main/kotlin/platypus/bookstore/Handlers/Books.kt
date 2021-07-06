package platypus.bookstore.classes.db

import platypus.bookstore.repos.books.BookRepository
import platypus.bookstore.classes.db.books.Books
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.web.reactive.function.server.*
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan;

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
    // bookRepo.save(book);
    bookRepo.saveabook(
      book.title, book.subtitle, book.publisher, 
      book.currentcopyright, book.bookedition, 
      book.uniqueid, book.authorbio, book.synopsis, book.isbn
    )
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