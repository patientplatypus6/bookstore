
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
import platypus.bookstore.classes.db.BookUniqueID

import org.springframework.stereotype.Component
import platypus.bookstore.utility.*

import org.springframework.web.multipart.MultipartFile

import java.io.*  
import java.util.Base64
  

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/book")
public class RequestBook(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@PostMapping("/findbookbyuniqueid")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbookbyuniqueid(@RequestBody bookuniqueid: BookUniqueID):Book{
		var bookshandler = BooksHandler(bookRepo)
		return bookshandler.findbookbyuniqueid(bookuniqueid.bookuniqueid)
	}


	@PostMapping("/findbookshelfbookbyuniqueid")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbookshelfbookbyuniqueid(@RequestBody bookuniqueid: BookUniqueID):BookshelfBook{

		println("inside findbookshelfbookbyuniqueid")

		var bookshelfbook:BookshelfBook = BookshelfBook();
		var picshandler = PicsHandler(picRepo)
		var bookshandler = BooksHandler(bookRepo)
		var revenuecosthandler = RevenueCostsHandler(revenuecostRepo)
		
		var milliseconds = System.currentTimeMillis()

		var booktimelist:List<BookTime> = bookshandler.findBookIdNotOrdered(bookuniqueid.bookuniqueid)

		var allpicsbybook = picshandler.findpicsbybook(bookuniqueid.bookuniqueid)


		println("milliseconds: $milliseconds")
		println("booktimelist: $booktimelist")
		println("allpicsbybook: $allpicsbybook")
		
		var picnamefront = ""
		var picnameback = ""
		var picnamelist: List<String> = listOf<String>()

		for(bookpic in allpicsbybook){
			if(bookpic.frontcover){
				picnamefront = bookpic.picname
			}
			if(bookpic.backcover){
				picnameback = bookpic.picname
			}
			picnamelist+=bookpic.picname
		}

		var shippingstring = "REVENUE - BOOK SHIPPING (PROJECTED)"
		var pricestring = "REVENUE - BOOK PRICE (PROJECTED)"

		var bookrevenuecosts:List<RevenueCost> = revenuecosthandler.findrevenuecostsbybook(bookuniqueid.bookuniqueid)

		println("bookrevenuecosts: $bookrevenuecosts")

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

		var booktimelistsize = booktimelist.size

		println("if statement if booktimelist size is == 1 $booktimelist")

		if(booktimelistsize==1){
			for(booktime in booktimelist){
				bookshelfbook = BookshelfBook(
					title = booktime.title,
					subtitle = booktime.subtitle,
					author = booktime.author,
					publisher = booktime.publisher,
					currentcopyright = booktime.currentcopyright,
					bookedition = booktime.bookedition,
					uniqueid = booktime.uniqueid, 
					storyinfo = booktime.storyinfo, 
					condition = booktime.condition, 
					isbn = booktime.isbn, 
					userprice = userprice,
					usershipping = usershipping,
					allpics = picnamelist,
					picnamefront = picnamefront,
					picnameback = picnameback
				)
			}
			println("returnvalue of bookshelfbook $bookshelfbook")
			return bookshelfbook
		}else{
			println("returnvalue of bookshelfbook $bookshelfbook")
			return bookshelfbook
		}

	}


	@GetMapping("/findbookshelfbooks")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbookshelfbooks():List<BookshelfBook>{
		var bookshelfbooks:List<BookshelfBook> = listOf<BookshelfBook>()
		var picshandler = PicsHandler(picRepo)
		var bookshandler = BooksHandler(bookRepo)
		var revenuecosthandler = RevenueCostsHandler(revenuecostRepo)

		var booklist:List<BookTime> = bookshandler.findbooks()
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
		var revenuecosthandler = RevenueCostsHandler(revenuecostRepo)

		var bool1 = bookshandler.deletebook(bookuniqueid.bookid)
		var bool2 = picshandler.deletebookpics(bookuniqueid.bookid)
		var bool3 = revenuecosthandler.deleterevenuecostsbybookid(bookuniqueid.bookid)

		return bool1&&bool2&&bool3;
	}	

	@GetMapping("/findbooks")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbooks():List<Book>{
		var bookshandler = BooksHandler(bookRepo)
		var totalbooks: List<BookTime> = bookshandler.findbooks()
		var returnbooks: List<Book> = listOf<Book>()
		for(booktime in totalbooks){
			var booktemp = Book()
			booktemp.title = booktime.title
			booktemp.subtitle = booktime.subtitle
			booktemp.author = booktime.author
			booktemp.publisher = booktime.publisher
			booktemp.currentcopyright = booktime.currentcopyright
			booktemp.bookedition = booktime.bookedition
			booktemp.uniqueid = booktime.uniqueid
			booktemp.storyinfo = booktime.storyinfo
			booktemp.condition = booktime.condition
			booktemp.isbn = booktime.isbn
			returnbooks+=booktemp
		}
		return returnbooks;
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


