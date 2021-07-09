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