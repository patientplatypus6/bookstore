
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

import platypus.bookstore.api.*

// @ModelAttribute("userlogin")
// public suspend fun userlogin():UserLogin{
//     return UserLogin();
// }


@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/user")
@SessionAttributes("userlogin")
public class RequestUser{
  
	@PostMapping("/login")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun userlogin(@RequestBody userlogin: UserLogin):Boolean{
		println("value of userlogin; $userlogin")
		val gettest = getrequest("http://localhost:4000/test")
		println("value of gettest $gettest")
		return true
	}

	// @GetMapping("/checksession")
	// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	// suspend fun checksession(@ModelAttribute("userlogin") userlogin:UserLogin):Boolean{
	// 	println("value of userlogin: $userlogin")
	// 	return true
	// }

}
  
