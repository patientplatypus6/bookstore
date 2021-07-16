

package platypus.bookstore.classes.db



import platypus.bookstore.classes.db.RevenueCost
// import art.kotlin_server.model.RevenueCost

data class BookRC(
  var book: Book,
  var revenuecost: List<RevenueCost>
)

data class BookTime(
  var book: Book = Book(),
  var timeordered: String = "0",
  var timeshipped: String = "0",
  var incartguest: String = "0",
  var incartuser: String = "0"
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
