package platypus.bookstore

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

import platypus.bookstore.utility.*

@SpringBootApplication
class BookstoreApplication


suspend fun main(args: Array<String>) {
	//clear picture files on startup
	//remove in production!!!
	deleteall()
	//
	runApplication<BookstoreApplication>(*args)
}