
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
@RequestMapping("/revenuecost")
public class RequestRevenueCost(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@PostMapping("/allrcbyname")
	@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")
	suspend fun allrcbyname(@RequestBody rcname: RevenueCostBookName):List<RevenueCost>{
		var revenuecostname:String = rcname.rcname;
		var revenuecostHandler = RevenueCostsHandler(revenuecostRepo)

		var revenuecostlist:List<RevenueCost> = revenuecostHandler.allrcbyname(revenuecostname);

		return revenuecostlist;
	}

	@GetMapping("/allrevenuecosts")
	@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")	
	suspend fun allrevenuecosts():List<RevenueCost>{
		var revenuecostshandler = RevenueCostsHandler(revenuecostRepo)
		var revenuecosts:List<RevenueCost> = revenuecostshandler.findrevenuecosts()
		return revenuecosts
	}

	@PostMapping("/addrevenuecosts")
	@CrossOrigin(originPatterns = ["*"], maxAge=3600, allowCredentials = "true")	
	suspend fun addrevenuecosts(@RequestBody revenuecostlist: RevenueCostList):DefaultReturn{
		println("value of revenuecosts: $revenuecostlist")
		var updatedBool = false;
		var revenuecostshandler = RevenueCostsHandler(revenuecostRepo)
		for(revenuecost in revenuecostlist.revenuecost){
			updatedBool = revenuecostshandler.addrevenuecost(revenuecost)
		}
		var default = DefaultReturn()
		return default
	}

}