package art.kotlin_server

import art.kotlin_server.model.*

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.annotation.Id
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestBody
import javax.validation.Valid

@SpringBootApplication
class KotlinServerApplication

fun main(args: Array<String>) {
	runApplication<KotlinServerApplication>(*args)
}

@RestController
@RequestMapping("/test")
public class RequestTest{
	@GetMapping
	fun stringfunc():String{
		println("inside the index of requesttest")
		return "some string"
	}

	@RequestMapping("/comment")
	fun getComment() : Comment {
		val comment = Comment(
			author = "test",
			content = "test",
		)
		return comment
	}
	
	@PostMapping("/post")
	fun postCustomer(@Valid @RequestBody comment: Comment): String{
		println("value of customer $comment")
		val author = comment.author;
		println("value of author $author")
		return "dfs"
	}
}



@RestController
class MessageResource {
	@GetMapping
	fun index(): List<Message> = listOf(
		Message("1", "Hello!"),
		Message("2", "There!"),
		Message("3", "Sailor!"),
	)
}


