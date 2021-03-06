
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
  

@RestController
@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/pic")
public class RequestPic(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@PostMapping("/uploadtest")
	@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")
	suspend fun uploadtest(@RequestBody pictest: PicTest):Boolean{

		val cleaned64 = pictest.pic64.split(",")[1]
		val pathFile = "src/main/resources/static/images/imagetest2.jpg"
		val imageByteArray = Base64.getDecoder().decode(cleaned64)
		File(pathFile).writeBytes(imageByteArray)
		return true;
	}

	@PostMapping("/findcovers")
	@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")
	suspend fun findcovers(@RequestBody picbookids: PicBookIds):List<Pic>{
		println("value of picbookid: $picbookids")
		var picshandler = PicsHandler(picRepo)
		var coverlist = picshandler.findcovers(picbookids)
		return coverlist;
	}


	@PostMapping("/findpicsbybook")
	@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")
	suspend fun findpicsbybook(@RequestBody picbookid: PicBookId):List<Pic>{
		println("value of picbookid: $picbookid")
		var picshandler = PicsHandler(picRepo)
		var coverlist = picshandler.findpicsbybook(picbookid.bookid)
		return coverlist;
	}


	@PostMapping("/findpicsbybook64")
	@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")
	suspend fun findpicsbybook64(@RequestBody picbookid: PicBookId):List<Pic64>{
		println("value of picbookid: $picbookid")
		var picshandler = PicsHandler(picRepo)
		var coverlist = picshandler.findpicsbybook64(picbookid)
		return coverlist;
	}

}