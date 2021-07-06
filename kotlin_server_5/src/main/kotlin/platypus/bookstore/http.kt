
package platypus.bookstore

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestBody
import org.json.JSONObject

import platypus.bookstore.classes.general.Comment
import platypus.bookstore.classes.db.books.Book
import platypus.bookstore.classes.db.books.BookRC
import platypus.bookstore.handlers.bookshandler.BooksHandler
import platypus.bookstore.repos.books.BookRepository
import platypus.bookstore.handlers.revenuecostshandler.RevenueCostsHandler
import platypus.bookstore.repos.revenuecost.RevenueCostRepository
import org.springframework.stereotype.Component

import platypus.bookstore.classes.db.revenuecosts.RevenueCost


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
public class RequestBook(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository){
  
  @GetMapping
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun books():Comment{
		val comment = Comment(
			author = "test",
			content = "test",
		)
		return comment
	}

	@GetMapping("/findbooks")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbooks():List<Book>{
		var bookshandler = BooksHandler(bookRepo)
		var totalbooks: List<Book> = bookshandler.findBooks()
		return totalbooks;
	}

  @PostMapping("/addbook")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addbook(@RequestBody bookrc: BookRC): List<Book> {
    println("value of bookrc $bookrc")
		var bookshandler = BooksHandler(bookRepo);
		var revenuecostshandler = RevenueCostsHandler(revenuecostRepo);

		for(revenuecost in bookrc.revenuecost){
			revenuecostshandler.addRevenueCost(revenuecost)
		}
		var booklist = bookshandler.addBook(bookrc.book);


		return booklist
	}

  // @PostMapping("/addbooks")
	// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	// suspend fun addbooks(@RequestBody books:List<Book>):List<Book>{
  //   println("value of book $books")
	// 	var bookshandler = BooksHandler(bookRepo);
	// 	var totalbooks:List<Book> = bookshandler.addBook(bookrc)
	// 	return totalbooks
	// }

}


@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/revenuecost")
public class RequestRevenueCost{

}