package net.razvan.poc.springboot.webfluxr2dbckotlin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping

@SpringBootApplication
class WebfluxR2dbcKotlinApplication

fun main(args: Array<String>) {
	runApplication<WebfluxR2dbcKotlinApplication>(*args)
}

data class Comment(
  val author: String,
  val content: String
)

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/test")
public class RequestTest{
	
	@GetMapping
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	fun stringfunc():Comment{
		val comment = Comment(
			author = "test",
			content = "test",
		)
		return comment
	}
}

	// @RequestMapping("/comment")
	// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	// fun getComment() : Comment {
	// 	val comment = Comment(
	// 		author = "test",
	// 		content = "test",
	// 	)
	// 	return comment
	// }

	// @PostMapping("/post")
	// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	// fun postCustomer(@RequestBody comment: Comment): Comment{
	// 	println("value of customer $comment")
	// 	val author = comment.author;
	// 	println("value of author $author")
	// 	val returncomment = Comment(
	// 		author = comment.author,
	// 		content = comment.content
	// 	)
	// 	return returncomment
	// }


	// @PostMapping("/addbook")
	// @CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	// fun addBook(@Valid @RequestBody book: Book): Comment{
	// 	println("value of book: ${book}")
	// 	val comment = Comment(
	// 		author = "test",
	// 		content = "test",
	// 	)
	// 	return comment
	// }
// }

