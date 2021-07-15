package platypus.bookstore.classes

import org.springframework.web.multipart.MultipartFile


data class Comment(
  val author: String,
  val content: String
)

data class DefaultReturn(
  val message: String = "operation successful"
)

data class ResultString(
  val result: String
)

data class UploadedFile (
  val file: MultipartFile
)

data class Picdata(
  val frontcoverindex: Int,
  val backcoverindex: Int,
  val bookuniqueid: String,
  val files: List<String>
)

data class PicdataByte(
  var frontcoverindex: Int = -1,
  var backcoverindex: Int = -1,
  var files: List<ByteArray> = mutableListOf<ByteArray>()
)