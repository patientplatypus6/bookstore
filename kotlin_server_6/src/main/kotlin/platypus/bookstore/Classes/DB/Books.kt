package platypus.bookstore.classes.db

import platypus.bookstore.classes.db.RevenueCost

data class BookRC(
  var book: Book,
  var revenuecost: List<RevenueCost>
)

data class Book(
  var title: String = "",
  var subtitle: String = "", 
  var author: String = "",
  var publisher: String = "", 
  var currentcopyright: String = "",
  var bookedition: String = "", 
  var uniqueid: String = "",
  var storyinfo: String = "", 
  var condition: String = "", 
  var isbn: String = ""
)

data class BookWCover(
  var title: String = "",
  var subtitle: String = "", 
  var author: String = "",
  var publisher: String = "", 
  var currentcopyright: String = "",
  var bookedition: String = "", 
  var uniqueid: String = "",
  var storyinfo: String = "", 
  var condition: String = "", 
  var isbn: String = "",
  var coverpicname: String = ""
)

data class BookWPrices(
  var title: String = "",
  var subtitle: String = "", 
  var author: String = "",
  var publisher: String = "", 
  var currentcopyright: String = "",
  var bookedition: String = "", 
  var uniqueid: String = "",
  var storyinfo: String = "", 
  var condition: String = "", 
  var isbn: String = "", 
  var usershipping: String = "", 
  var userprice: String = ""
)

data class InCart(
  var inyourcart: Boolean = false, 
  var inothercart: Boolean = false, 
  var uniqueid: String = ""
)

data class BookTime(
  var title: String = "",
  var subtitle: String = "", 
  var author: String = "",
  var publisher: String = "", 
  var currentcopyright: String = "",
  var bookedition: String = "", 
  var uniqueid: String = "",
  var storyinfo: String = "", 
  var condition: String = "", 
  var isbn: String = "",
  var timeordered: Long = 0,
  var timeshipped: Long = 0,
  var incartguest: Long = 0,
  var incartuser: Long = 0
)

data class BookIDSbyCartholdername(
  var uniqueid: String = "",
  var cartholdername: String = ""
)

data class CartholdernameByUID(
  var cartholdername: String = ""
)

data class BookshelfBook(
  var title: String = "",
  var subtitle: String = "",
  var author: String = "",
  var publisher: String = "", 
  var currentcopyright: String = "",
  var bookedition: String = "", 
  var uniqueid: String = "",
  var storyinfo: String = "", 
  var condition: String = "", 
  var isbn: String = "",
  var usershipping: String = "", 
  var userprice: String = "",
  var picnamefront: String = "",
  var picnameback: String = "",
  var inyourcart: Boolean = false,
  var inothercart: Boolean = false,
  var allpics: List<String> = listOf<String>()
)

data class ShelfBook(
  var title: String = "",
  var author: String = "", 
  var projectedshippingprice:String = "",
  var projectedbookprice:String = ""
)

data class BookId(
  var bookid: String = ""
)

data class BookUniqueID(
  var bookuniqueid: String = "",
)

data class CartNameandBookID(
  var cartholdername: String = "",
  var uniqueid: String = ""
)