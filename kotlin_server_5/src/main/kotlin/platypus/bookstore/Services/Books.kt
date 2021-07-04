package platypus.bookstore.services.books

import platypus.bookstore.repos.books.BookRepository
import org.springframework.stereotype.Service


@Service
class BookService(private val repo: BookRepository){
  // suspend fun findBooks() = println("inside findbooks")
  // suspend fun findBooks() = repo.findBooks()
  suspend fun findBooks() = repo.findBooks()
}