package art.kotlin_server

import art.kotlin_server.model.*

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.annotation.Id
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestBody
// import org.json.JSONObject
import javax.validation.Valid	

@SpringBootApplication
class KotlinServerApplication

fun main(args: Array<String>) {
	runApplication<KotlinServerApplication>(*args)
}

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

	@RequestMapping("/comment")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	fun getComment() : Comment {
		val comment = Comment(
			author = "test",
			content = "test",
		)
		return comment
	}

	@PostMapping("/post")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	fun postCustomer(@Valid @RequestBody comment: Comment): String{
		println("value of customer $comment")
		val author = comment.author;
		println("value of author $author")
		return "dfs"
	}
}





// @Configuration
// @Profile("development")
// public class DevCorsConfiguration:WebMvcConfigurer {
//     override fun addCorsMappings(registry: CorsRegistry) {
// 			registry.addMapping("/**")
// 				.allowedOrigins("*") // any host or put domain(s) here
// 				.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") 
// 				// put the http verbs you want allow
// 				.allowedHeaders("Authorization") // put the http headers you want allow
//     }
// }

// @Configuration
// @EnableWebFlux
// class WebConfig: WebFluxConfigurer
// {
//     override fun addCorsMappings(registry: CorsRegistry)
//     {
//         registry.addMapping("/**")
//             .allowedOrigins("*") // any host or put domain(s) here
//             .allowedMethods("GET, POST") // put the http verbs you want allow
//             .allowedHeaders("Authorization") // put the http headers you want allow
//     }
// }

// @Component
// class CorsFilter : WebFilter {
// 	override fun filter(ctx: ServerWebExchange, chain: WebFilterChain): Mono<Void> {
// 		ctx.response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
// 		ctx.response.headers.add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
// 		ctx.response.headers.add("Access-Control-Allow-Credentials", "true")
// 		ctx.response.headers.add("Access-Control-Allow-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range")
// 		return when {
// 				ctx.request.method == HttpMethod.OPTIONS -> {
// 						ctx.response.headers.add("Access-Control-Max-Age", "1728000")
// 						ctx.response.statusCode = HttpStatus.NO_CONTENT
// 						Mono.empty()
// 				}
// 				else -> {
// 						ctx.response.headers.add("Access-Control-Expose-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range")
// 						chain.filter(ctx)
// 				}
// 		}
// 	}
// }

// import org.springframework.http.HttpMethod
// import org.springframework.http.HttpStatus
// import org.springframework.stereotype.Component

// import org.springframework.web.server.ServerWebExchange
// import org.springframework.web.server.WebFilter
// import org.springframework.web.server.WebFilterChain
// import org.springframework.context.annotation.Configuration

// import org.springframework.context.annotation.Profile;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



// @RestController
// class MessageResource {
// 	@GetMapping
// 	fun index(): List<Message> = listOf(
// 		Message("1", "Hello!"),
// 		Message("2", "There!"),
// 		Message("3", "Sailor!"),
// 	)
// }


