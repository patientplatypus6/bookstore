
package platypus.bookstore

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ModelAttribute
import org.json.JSONObject

import platypus.bookstore.classes.*
import platypus.bookstore.classes.db.BookRC
import platypus.bookstore.classes.db.Book
import platypus.bookstore.classes.db.BookId

import platypus.bookstore.handlers.BooksHandler
import platypus.bookstore.handlers.RevenueCostsHandler
import platypus.bookstore.handlers.PicsHandler

import platypus.bookstore.repos.BookRepository
import platypus.bookstore.repos.RevenueCostRepository
import platypus.bookstore.repos.PicRepository

import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RequestParam;
import platypus.bookstore.utility.*

import platypus.bookstore.classes.db.RevenueCost
import org.springframework.web.multipart.MultipartFile

import platypus.bookstore.classes.db.Pic
import platypus.bookstore.classes.db.PicBookId
import platypus.bookstore.classes.db.PicBookIds

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
@RequestMapping("/pic")
public class RequestPic(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@PostMapping("/findcovers")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findcovers(@RequestBody picbookids: PicBookIds):List<Pic>{
		println("value of picbookid: $picbookids")
		var picshandler = PicsHandler(picRepo)
		var coverlist = picshandler.findcovers(picbookids)
		return coverlist;
	}

	@PostMapping("/findimagesbybook")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findimagesbybook(@RequestBody picbookid: PicBookId):List<Pic>{
		println("value of picbookid: $picbookid")
		var picshandler = PicsHandler(picRepo)
		var coverlist = picshandler.findimagesbybook(picbookid)
		return coverlist;
	}

}

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/book")
public class RequestBook(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	// @GetMapping("/findbook")
	// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	// suspend fun findbook():Book{
	// 	foundbook
	// 	return foundbook
	// }	

	@PostMapping("/deletebook")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun deletebook(@RequestBody bookuniqueid: BookId):Boolean{
		var bookshandler = BooksHandler(bookRepo)
		var picshandler = PicsHandler(picRepo)

		bookshandler.deletebook(bookuniqueid.bookid)
		picshandler.deletebookpics(bookuniqueid.bookid)

		return true;
	}	

	@GetMapping("/findbooks")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbooks():List<Book>{
		var bookshandler = BooksHandler(bookRepo)
		var totalbooks: List<Book> = bookshandler.findbooks()
		return totalbooks;
	}

	@PostMapping("/findrevenuecosts")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findrevenuecosts(@RequestBody bookuniqueid: BookId):List<RevenueCost>{
		println("value of bookuniqueid in 					findrevenuecosts: $bookuniqueid")
		var revenuecostHandler = RevenueCostsHandler(revenuecostRepo)
		var revenuecostlist: List<RevenueCost> = revenuecostHandler.findrevenuecostsbybook(bookuniqueid.bookid)
		return revenuecostlist;
	}

	@PostMapping("/updatepics")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun updatepics(@RequestBody picdata:Picdata):Boolean{

		var picshandler = PicsHandler(picRepo)
		var picssaved = picshandler.updatepics(picdata)

		return picssaved
	}


	@PostMapping("/addpics")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addpics(@RequestBody picdata:Picdata):Boolean{

		var picshandler = PicsHandler(picRepo)
		var picssaved = picshandler.savebookpics(picdata)

		return picssaved
	}

	@PostMapping("/updatebook")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun updatebook(@RequestBody bookrc: BookRC): Boolean {
		var bookshandler = BooksHandler(bookRepo);
		var revenuecostshandler = RevenueCostsHandler(revenuecostRepo);
		var updatedBool:Boolean;

		var revenuecost = bookrc.revenuecost

		println("Value of bookrc.revenuecost: $revenuecost")

		updatedBool = revenuecostshandler.updaterevenuecosts(bookrc.revenuecost, bookrc.book.uniqueid)

		when(updatedBool){
			true->{
				updatedBool = bookshandler.updatebook(bookrc.book);
			}
			false->{return false}
		}

		return updatedBool
	}

  @PostMapping("/addbook")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addbook(@RequestBody bookrc: BookRC): Boolean {
    println("value of bookrc $bookrc")
		println("test reload second")
		var bookshandler = BooksHandler(bookRepo);
		var revenuecostshandler = RevenueCostsHandler(revenuecostRepo);

		var updatedBool:Boolean = true;

		for(revenuecost in bookrc.revenuecost){
			when(updatedBool){
				true->{
					updatedBool = revenuecostshandler.addrevenuecost(revenuecost)
				}
				false->{return false}
			}
		}
		when(updatedBool){
			true->{
				updatedBool = bookshandler.addbook(bookrc.book);
			}
			false->{return false}
		}
	
		return updatedBool
	}

}

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/revenuecost")
public class RequestRevenueCost{

}













	// @PostMapping("/addpics")
	// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	// suspend fun addpics(@RequestParam(value = "file",required = false) file: MultipartFile):Comment{
	// 	println("inside book/addpics")
	// 	println("value of file $file")
	// 	// val filestring: String = String(file.getBytes());
	// 	// println("value of file $file")
	// 	val comment = Comment(
	// 		author = "test",
	// 		content = "test",
	// 	)
	// 	return comment
	// }
