package platypus.bookstore.classes.db


data class UserLogin(
  var username: String = "",
  var password: String = "", 
)

data class UserLogout(
  var username: String = "" 
)

data class User(
  val phone: String = "", 
  val email: String = "",
  val firstname: String = "",
  val lastname: String = "",
  val username: String = "", 
  val hashedpassword: String = ""  
)

data class Loggedin(
  var success: Boolean = false, 
  var cookie: String = ""
)

data class UserBookID(
  var bookuniqueid: String = "",
  var username: String = ""
)

data class BookUniqueID(
  var bookuniqueid: String = "",
)