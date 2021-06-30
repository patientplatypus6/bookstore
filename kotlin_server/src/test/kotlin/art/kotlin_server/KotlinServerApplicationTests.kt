package art.kotlin_server

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = [
            "spring.r2dbc.url=r2dbc:h2:mem:///testdb;USER=sa;PASSWORD=password"
        ]
)
class KotlinServerApplicationTests {

	@Test
	fun contextLoads() {
		runBlocking{
			
		}
	}

}
