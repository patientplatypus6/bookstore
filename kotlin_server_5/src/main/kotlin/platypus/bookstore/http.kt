
package platypus.bookstore

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestBody

import platypus.bookstore.classes.general.Comment
import platypus.bookstore.classes.db.books.Books
import platypus.bookstore.classes.db.BooksHandler
import platypus.bookstore.repos.books.BookRepository
import org.springframework.stereotype.Component

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/test")
public class RequestTest{
	
	@GetMapping
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun stringfunc():Comment{
		val comment = Comment(
			author = "test",
			content = "test",
		)
		return comment
	}
}

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/user")
public class RequestUser{
  
}

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/book")
public class RequestBook(private val bookRepo: BookRepository){
  
  @GetMapping
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun books():Comment{
		val comment = Comment(
			author = "test",
			content = "test",
		)
		return comment
	}

  @PostMapping("/addbook")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addbook(@RequestBody book:Books):Comment{
    println("value of book $book")
		val comment = Comment(
			author = "test",
			content = "test",
		)
		var bookshandler = BooksHandler(bookRepo);
		// bookshandler.findBooks();
		// bookRepo.findBooks();
		bookshandler.addBook(book)
		return comment
	}
}


@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/revenuecost")
public class RequestRevenueCost{

}