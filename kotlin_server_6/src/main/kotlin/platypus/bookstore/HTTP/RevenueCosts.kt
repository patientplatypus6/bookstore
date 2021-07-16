
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
@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
@RequestMapping("/revenuecost")
public class RequestRevenueCost(private val bookRepo: BookRepository, private val revenuecostRepo: RevenueCostRepository, private val picRepo: PicRepository){

	@PostMapping("/allrcbyname")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")
	suspend fun allrcbyname(@RequestBody rcname: RevenueCostBookName):List<RevenueCost>{
		var revenuecostname:String = rcname.rcname;
		var revenuecostHandler = RevenueCostsHandler(revenuecostRepo)

		var revenuecostlist:List<RevenueCost> = revenuecostHandler.allrcbyname(revenuecostname);

		return revenuecostlist;
	}

	@GetMapping("/allrevenuecosts")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")	
	suspend fun allrevenuecosts():List<RevenueCost>{
		var revenuecostshandler = RevenueCostsHandler(revenuecostRepo)
		var revenuecosts:List<RevenueCost> = revenuecostshandler.findrevenuecosts()
		return revenuecosts
	}

	@PostMapping("/addrevenuecosts")
	@CrossOrigin(origins = ["http://localhost:3000"], maxAge=3600, allowCredentials = "true")	
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



		// revenuecostlist: HashMap<String, List<HashMap<String, String>>>
		// var rclist = revenuecostlist.get("revenuecost")
		// println("value of revenuecosts: $rclist")
		// rclist?.map{
		// 	var newrevenuecost = RevenueCost()
		// 	// {revenuecost=[{rcvalue=NONE, rcname=NONE, rcdate=2021-07-16 01:50:24, rcdescription=NONE, uniqueid=1626400224073}]}
		// 	newrevenuecost.rcvalue = it.get("rcvalue")!!
		// 	newrevenuecost.rcname = it.get("rcname")!!
		// 	newrevenuecost.rcdate = it.get("rcdate")!!
		// 	newrevenuecost.rcdescription = it.get("rcdescription")!!

		// 	var rcvalue = it.get("rcvalue")
		// 	println("rcvalue $rcvalue")
		// }
		// var updatedBool = true;
		// var revenuecostshandler = RevenueCostsHandler(revenuecostRepo)

		// for(revenuecost in revenuecostlist){
		// 	updatedBool = revenuecostshandler.addrevenuecost(revenuecost)
		// }
		// var revenuecostiterator:List<HashMap<String, String>> = revenuecostlist.get("revenuecost");
		// for(revenuecost in revenuecostlist.get("revenuecost")){
		// 	var rc = RevenueCost()
		// 	rc.rcvalue = revenuecost.get("rcvalue")
		// 	rc.rcname = revenuecost.get("rcname")
		// 	rc.rcdescription = revenuecost.get("rcdescription")
		// 	rc.uniqueid = revenuecost.get("uniqueid")
		// }