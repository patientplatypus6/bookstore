
package platypus.bookstore

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.json.JSONObject

import platypus.bookstore.classes.*
import platypus.bookstore.classes.db.*
import platypus.bookstore.handlers.*
import platypus.bookstore.repos.*

import org.springframework.stereotype.Component
import platypus.bookstore.utility.*

import org.springframework.web.multipart.MultipartFile

import java.io.*  
import java.util.Base64
  

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

	@PostMapping("/uploadtest")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun uploadtest(@RequestBody pictest: PicTest):Boolean{

		val cleaned64 = pictest.pic64.split(",")[1]
		val pathFile = "src/main/resources/static/images/imagetest2.jpg"
		val imageByteArray = Base64.getDecoder().decode(cleaned64)
		File(pathFile).writeBytes(imageByteArray)
		return true;
	}

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


	@PostMapping("/findimagesbybook64")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findimagesbybook64(@RequestBody picbookid: PicBookId):List<Pic64>{
		println("value of picbookid: $picbookid")
		var picshandler = PicsHandler(picRepo)
		var coverlist = picshandler.findimagesbybook64(picbookid)
		return coverlist;
	}

}

// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
// @RequestMapping("/images")
// public Object rooms() {

// }

// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
// @GetMapping("/images")
// public Object images() 

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/images")
public class ImagesHolder(){

}

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/book")
public class RequestBook(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@GetMapping("/findbookshelfbooks")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbookshelfbooks():List<BookshelfBook>{
		var bookshelfbooks:List<BookshelfBook> = listOf<BookshelfBook>()
		var picshandler = PicsHandler(picRepo)
		var bookshandler = BooksHandler(bookRepo)
		var revenuecosthandler = RevenueCostsHandler(revenuecostRepo)

		var booklist:List<Book> = bookshandler.findbooks()
		var picbookids = PicBookIds()

		for(book in booklist){
			picbookids.bookids+=book.uniqueid
		}

		var coverpiclist:List<Pic> = picshandler.findcovers(picbookids)
		var shippingstring = "REVENUE - BOOK SHIPPING (PROJECTED)"
		var pricestring = "REVENUE - BOOK PRICE (PROJECTED)"
		
		for(book in booklist){
			var tempbookshelfbook = BookshelfBook()

			tempbookshelfbook.title = book.title
			tempbookshelfbook.subtitle = book.subtitle
			tempbookshelfbook.author = book.author
			tempbookshelfbook.publisher = book.publisher
			tempbookshelfbook.currentcopyright = book.currentcopyright
			tempbookshelfbook.bookedition = book.bookedition
			tempbookshelfbook.uniqueid = book.uniqueid
			tempbookshelfbook.storyinfo = book.storyinfo
			tempbookshelfbook.condition = book.condition
			tempbookshelfbook.isbn = book.isbn

			var coverpicname = ""

			for(coverpic in coverpiclist){
				if(coverpic.bookuniqueid==book.uniqueid){
					coverpicname = coverpic.picname
				}
			}

			tempbookshelfbook.picname = coverpicname

			var bookrevenuecosts:List<RevenueCost> = revenuecosthandler.findrevenuecostsbybook(book.uniqueid)

			var usershipping = ""
			var userprice = ""

			for(bookrevenuecost in bookrevenuecosts){
				if(bookrevenuecost.rcname==shippingstring){
					usershipping = bookrevenuecost.rcvalue
				}
				if(bookrevenuecost.rcname==pricestring){
					userprice = bookrevenuecost.rcvalue
				}
			}

			tempbookshelfbook.usershipping = usershipping
			tempbookshelfbook.userprice = userprice
			
			bookshelfbooks+=tempbookshelfbook

		}

		return bookshelfbooks
	}

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


		return true;
		// return picssaved
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
public class RequestRevenueCost(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@PostMapping("/allrcbyname")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun allrcbyname(@RequestBody rcname: RevenueCostBookName):List<RevenueCost>{
		var revenuecostname:String = rcname.rcname;
		var revenuecostHandler = RevenueCostsHandler(revenuecostRepo)

		var revenuecostlist:List<RevenueCost> = revenuecostHandler.allrcbyname(revenuecostname);

		return revenuecostlist;
	}

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
