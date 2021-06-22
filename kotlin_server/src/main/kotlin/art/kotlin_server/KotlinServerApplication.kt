package art.kotlin_server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.annotation.Id
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping

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



// @RestController
// @RequestMapping("/home")
// public class IndexController {
//     @RequestMapping("/")
//     String get() {
//         //mapped to hostname:port/home/
//         return "Hello from get";
//     }
//     @RequestMapping("/index")
//     String index() {
//         //mapped to hostname:port/home/index/
//         return "Hello from index";
//     }
// }
// @RequestMapping("/comment2")
// val returnString = ReturnString(string = "hello")
// return returnString


