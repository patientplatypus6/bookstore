package platypus.bookstore.classes.db

import platypus.bookstore.repos.books.BookRepository

data class Books(
  var title: String,
  var uniqueid: String,
  var subtitle: String, 
  var publisher: String, 
  var currentcopyright: String,
  var edition: String, 
  var authorbio: String, 
  var synopsis: String, 
  var isbn: String
)


// class BooksHandler(val bookRepository: BookRepository)(

// abstract class BooksHandler : BookRepository{
//   fun addBook(){

//   }
// )

class BooksHandler(val bookRepo: BookRepository){
  suspend fun addBook(book:Books){
    bookRepo.save(
      book.title, 
      book.subtitle, 
      book.publisher, 
      book.currentcopyright, 
      book.authorbio, 
      book.synopsis, 
      book.isbn)
  }
  // suspend fun getBooks(book:Books){
  //   bookRepo.findAll()
  // }
)
