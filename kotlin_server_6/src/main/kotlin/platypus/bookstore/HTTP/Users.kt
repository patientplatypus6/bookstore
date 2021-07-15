
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
public class RequestUser(private val userRepo: UserRepository){

	@PostMapping("/logout")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun userlogout(@RequestBody userlogout: UserLogin):Loggedin{
		val userRepo = UsersHandler(userRepo)
		userRepo.logoutuser(userlogout)
		var loggedin = Loggedin()
		loggedin.success = false;
		loggedin.cookie = "loggedout";
		return loggedin		
	}	
  
	@PostMapping("/login")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun userlogin(@RequestBody userlogin: UserLogin):Loggedin{
		println("value of userlogin; $userlogin")
		val userRepo = UsersHandler(userRepo)	
		var loggedin = Loggedin()
		loggedin.success = userRepo.attemptlogin(userlogin)	
		if(loggedin.success){
			loggedin.cookie = userRepo.loginredis(userlogin.username)
			return loggedin
		}else{
			return loggedin
		}
	}

	@PostMapping("/register")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun userregister(@RequestBody userlogin: UserLogin):Loggedin{
		val userRepo = UsersHandler(userRepo)
		var loggedin = Loggedin()
		loggedin.success = userRepo.newuser(userlogin)
		if(loggedin.success){
			loggedin.cookie = userRepo.loginredis(userlogin.username)
			return loggedin
		}else{
			return loggedin
		}	
	}


}
  
