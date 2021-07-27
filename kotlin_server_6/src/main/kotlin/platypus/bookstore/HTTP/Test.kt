
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
import platypus.bookstore.classes.db.BookUniqueID

import org.springframework.stereotype.Component
import platypus.bookstore.utility.*

import org.springframework.web.multipart.MultipartFile

import java.io.*  
import java.util.Base64

@RestController
@CrossOrigin(maxAge=3600, allowCredentials = "true", originPatterns = ["*"])
@RequestMapping("/test")
public class RequestTest(){

	@GetMapping("/gettest")
	@CrossOrigin(maxAge=3600, allowCredentials = "true", originPatterns=["*"])
	suspend fun gettest():SuccessReturn{
    println("inside gettest")
    var success = SuccessReturn();
    success.result = true;
    return success;
  }
}
