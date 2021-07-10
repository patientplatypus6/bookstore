package platypus.bookstore.classes

import org.springframework.web.multipart.MultipartFile


data class Comment(
  val author: String,
  val content: String
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

//u
// data class Student(val id: Int,
//                    val firstName: String,
//                    val lastName: String,
//                    val hobbyId: Int,
//                    val address1: String,
//                    val address2: String,
//                    val created: String,
//                    val updated: String) {
//     constructor(firstName: String, lastName: String) :
//             this(Int.MIN_VALUE, firstName, lastName, Int.MIN_VALUE, "", "", "", "")
// }