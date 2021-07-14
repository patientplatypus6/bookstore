package platypus.bookstore

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

import platypus.bookstore.utility.*

@SpringBootApplication
class BookstoreApplication


suspend fun main(args: Array<String>) {
	//clear picture files on startup
	//remove in production!!!
	deleteall()
	//
	//test crypto bcrypt
	// var encoder = BCryptPasswordEncoder()
	// var passcrypt = encoder.encode("somepassword")

	// println("$passcrypt")

	// if(encoder.matches("somepassword", passcrypt)){
	// 	println("match!")
	// }
	// if(encoder.matches("somepasword", passcrypt)){
	// 	println("fail!")
	// }

	runApplication<BookstoreApplication>(*args)
}