
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

		var allpics:List<Pic> = picshandler.findallpics()
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

			var frontpicname = ""
			var backpicname = ""
			var piclist:List<String> = listOf<String>()

			for(pic in allpics){
				if(pic.bookuniqueid==book.uniqueid && pic.frontcover){
					frontpicname = pic.picname
				}
				if(pic.bookuniqueid==book.uniqueid && pic.backcover){
					backpicname = pic.picname
				}
				if(pic.bookuniqueid==book.uniqueid){
					piclist+=pic.picname
				}
			}

			tempbookshelfbook.picnamefront = frontpicname
			tempbookshelfbook.picnameback = backpicname
			tempbookshelfbook.allpics = piclist

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


