
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
	suspend fun findcovers(@RequestBody picbookid: PicBookId):List<Pic>{
		println("value of picbookid: $picbookid")
		var picshandler = PicsHandler(picRepo)
		var coverlist = picshandler.findcovers(picbookid)
		return coverlist;
	}

}

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/book")
public class RequestBook(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@GetMapping("/findbooks")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbooks():List<Book>{
		var bookshandler = BooksHandler(bookRepo)
		var totalbooks: List<Book> = bookshandler.findbooks()
		return totalbooks;
	}

	@GetMapping("/findrevenuecosts")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findrevenuecosts(bookuniqueid: String):List<RevenueCost>{
		var revenuecostHandler = RevenueCostsHandler(revenuecostRepo)
		var revenuecostlist: List<RevenueCost> = revenuecostHandler.findrevenuecostsbybook(bookuniqueid)
		return revenuecostlist;
	}

	@PostMapping("/addpics")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addpics(@RequestBody picdata:Picdata):Boolean{
		println("inside addpics")
		println("value of picdata: $picdata")
		val bytearrayhandler = ByteArrayHandler()
		val pics = mutableListOf<Pic>()
	
		for((index, file) in picdata.files.withIndex()){
			val bytefile = bytearrayhandler.converttobytearray(file)
			val newpic = Pic();
			newpic.picbyte = bytefile;
			if(index==picdata.frontcoverindex){
				newpic.frontcover=true
			}else if(index==picdata.frontcoverindex){
				newpic.backcover=true
			}
			newpic.bookuniqueid = picdata.bookuniqueid
			newpic.uniqueid = picdata.bookuniqueid+"pic"+index
			pics.add(newpic)
		}

		var picshandler = PicsHandler(picRepo)
		var picssaved = picshandler.savebookpics(pics)

		return picssaved
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
