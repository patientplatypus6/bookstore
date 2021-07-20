
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
import org.springframework.web.bind.annotation.SessionAttributes
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

import org.springframework.web.bind.annotation.CookieValue

import org.json.JSONObject
import java.io.*  
import java.util.Base64

import platypus.bookstore.api.*
import platypus.bookstore.classes.*
import platypus.bookstore.classes.db.*
import platypus.bookstore.handlers.*
import platypus.bookstore.repos.*
import platypus.bookstore.utility.*

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/user")
@SessionAttributes("userlogin")
public class RequestUser(private val userRepo: UserRepository, private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository){

	@PostMapping("/logout")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun userlogout(@RequestBody userlogout: UserLogin):Loggedin{
		val usershandler = UsersHandler(userRepo)
		usershandler.logoutuser(userlogout)
		var loggedin = Loggedin()
		loggedin.success = false;
		loggedin.cookie = "loggedout";
		return loggedin		
	}	
  
	@PostMapping("/login")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun userlogin(@RequestBody userlogin: UserLogin):Loggedin{
		println("value of userlogin; $userlogin")
		val usershandler = UsersHandler(userRepo)	
		var loggedin = Loggedin()
		loggedin.success = usershandler.attemptlogin(userlogin)	
		if(loggedin.success){
			loggedin.cookie = usershandler.loginredis(userlogin.username)
			return loggedin
		}else{
			return loggedin
		}
	}

	@PostMapping("/register")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun userregister(@RequestBody userlogin: UserLogin):Loggedin{
		val usershandler = UsersHandler(userRepo)
		var loggedin = Loggedin()
		loggedin.success = usershandler.newuser(userlogin)
		if(loggedin.success){
			loggedin.cookie = usershandler.loginredis(userlogin.username)
			return loggedin
		}else{
			return loggedin
		}	
	}

	@PostMapping("/addbooktocartguest")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addbooktocartguest(@RequestBody userbookid: UserBookID):SuccessReturn{
		var bookhandler = BooksHandler(bookRepo)
		var successreturn = SuccessReturn()
		var bookuniqueid = userbookid.bookuniqueid;
		var username = userbookid.username;
		successreturn.result = bookhandler.addbooktocartguest(bookuniqueid, username)
		return successreturn
	}

	@PostMapping("/addbooktocartuser")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addbooktocartuser(@RequestBody userbookid: UserBookID, @CookieValue(name = "usercookie") usercookie: String):SuccessReturn{
		println("value of cookie: $usercookie")
		var bookhandler = BooksHandler(bookRepo)
		var usershandler = UsersHandler(userRepo)
		var successreturn = SuccessReturn()
		if(usershandler.checkloginredis(userbookid.username, usercookie)){
			println("successfully passed cookie inspection")
			successreturn.result = bookhandler.addbooktocartuser(userbookid.bookuniqueid, userbookid.username)
		}else{
			successreturn.result = false
		}
		return successreturn
	}

	@PostMapping("/findbooksincartbyuser")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbooksincartbyuser(@RequestBody username: Username, @CookieValue(name = "usercookie") usercookie: String):List<Book>{
		var bookhandler = BooksHandler(bookRepo)
		var usershandler = UsersHandler(userRepo)
		if(usershandler.checkloginredis(username.username, usercookie)){
			var booksincartbyuser =  bookhandler.findbooksincartbynameuser(username.username)
			println("booksincartbyuser $booksincartbyuser")
			return booksincartbyuser
		}else{
			return listOf<Book>()
		}
	}

	@PostMapping("/findbooksincartbyguest")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbooksincartbyguest(@RequestBody username: Username):List<Book>{
		var bookhandler = BooksHandler(bookRepo)
		var revenuecostshandler = RevenueCostsHandler(revenuecostRepo)
		println("inside findbookincartbyguest and value of username $username")
		var returnbooklist = bookhandler.findbooksincartbynameguest(username.username)
		println("value of returnbooklist: $returnbooklist")
		var uniqueidlist = listOf<String>()
		for(rbook in returnbooklist){	
			uniqueidlist+=rbook.uniqueid
		}
		println("value of uniqueidlist: $uniqueidlist")
		var shippingprices = revenuecostshandler.findshippingpriceprojinlist(uniqueidlist)
		var salesprices = revenuecostshandler.findsalespriceprojinlist(uniqueidlist)
		println("value of shippingprices $shippingprices")
		println("value of sales prices $salesprices")

		return returnbooklist
	}


	@PostMapping("/removebookcartuser")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun removebookcartuser(@RequestBody userbookid: UserBookID, @CookieValue(name = "usercookie") usercookie: String):SuccessReturn{
		var bookhandler = BooksHandler(bookRepo)
		var usershandler = UsersHandler(userRepo)
		var successreturn = SuccessReturn()
		successreturn.result = false
		if(usershandler.checkloginredis(userbookid.username, usercookie)){
			successreturn.result = bookhandler.removebookcart(userbookid.bookuniqueid)
			return successreturn
		}else{
			return successreturn
		}
	}

	@PostMapping("/removebookcartguest")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun findbooksincartbyuser(@RequestBody userbookid: UserBookID):SuccessReturn{
		var bookhandler = BooksHandler(bookRepo)
		var successreturn = SuccessReturn()
		successreturn.result = bookhandler.removebookcart(userbookid.bookuniqueid)
		return successreturn
	}

	@PostMapping("/checkcart")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun checkcart(@RequestBody bookuser: HashMap<String, String>):InCart{

		var username = bookuser.get("username")!!
		var bookuniqueid = bookuser.get("bookuniqueid")!!

		var bookhandler = BooksHandler(bookRepo)

		var incart = InCart();

		var bookcheckslist:List<BookIDSbyCartholdername> = bookhandler.checkcart(bookuniqueid)

		if(bookcheckslist.size==1){
			for(bookcheck in bookcheckslist){
				if(bookcheck.cartholdername == username){
					incart.inyourcart = true;
					incart.inothercart = false;
				}else if (bookcheck.cartholdername != username){
					incart.inyourcart = false;
					incart.inothercart = true;
				}
			}
			return incart
		}else{
			incart.inyourcart = false;
			incart.inothercart = false;
			return incart
		}
	}


	@PostMapping("/checkcartmultiple")	
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun checkcartmultiple(@RequestBody user: HashMap<String, String>):List<InCart>{

		var username = user.get("username")!!
		var bookhandler = BooksHandler(bookRepo)

		var incart:List<InCart> = listOf<InCart>()
		var bookcheckslist:List<BookIDSbyCartholdername> = bookhandler.checkcartmultiple()

		for (bookcheck in bookcheckslist){
			var tempincart = InCart();
			tempincart.uniqueid = bookcheck.uniqueid
			if(bookcheck.cartholdername == username){
				tempincart.inyourcart = true;
				tempincart.inothercart = false;
			}else if (bookcheck.cartholdername != username){
				tempincart.inyourcart = false;
				tempincart.inothercart = true;
			}
			incart += tempincart
		}

		return incart;

	}


}