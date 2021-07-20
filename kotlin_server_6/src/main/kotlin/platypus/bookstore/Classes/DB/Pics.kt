

package platypus.bookstore.classes.db


import org.springframework.web.multipart.MultipartFile


data class Pic(
  var picname:String = "",
  var bookuniqueid: String = "", 
  var frontcover: Boolean = false, 
  var backcover: Boolean = false, 
  var uniqueid: String = ""
)

data class Pic64(
  var picname:String = "",
  var picbyte:String = "",
  var bookuniqueid: String = "", 
  var frontcover: Boolean = false, 
  var backcover: Boolean = false, 
  var uniqueid: String = ""
)

data class PicBookIds(
  var bookids: List<String> = listOf<String>()
)

data class PicBookId(
  var bookid: String = ""
)

data class PicTest(
  var pic64: String
)