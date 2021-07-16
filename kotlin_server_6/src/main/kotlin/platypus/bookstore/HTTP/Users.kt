
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
public class RequestUser(private val userRepo: UserRepository, private val bookRepo: BookRepository){

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
	suspend fun addbooktocartguest(@RequestBody bookuniqueid: BookUniqueID):SuccessReturn{
		var bookhandler = BooksHandler(bookRepo)
		var successreturn = SuccessReturn()
		successreturn.result = bookhandler.addbooktocartguest(bookuniqueid.bookuniqueid)
		return successreturn
	}

	// 

	@PostMapping("/addbooktocartuser")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun addbooktocartuser(@RequestBody bookuniqueid: BookUniqueID, @CookieValue(name = "usercookie") usercookie: String):SuccessReturn{
		println("value of cookie: $usercookie")
		var bookhandler = BooksHandler(bookRepo)
		var successreturn = SuccessReturn()
		successreturn.result = bookhandler.addbooktocartuser(bookuniqueid.bookuniqueid)
		return successreturn
	}


}
  
