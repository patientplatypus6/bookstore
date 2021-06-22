package art.kotlin_server

data class Message(val id: String?, val text: String)

data class Comment(
  val author: String,
  val content: String
)

data class ReturnString(
  val string: String
)