

package platypus.bookstore.classes.db



import platypus.bookstore.classes.db.RevenueCost
// import art.kotlin_server.model.RevenueCost

data class BookRC(
  var book: Book,
  var revenuecost: List<RevenueCost>
)

data class Book(
  var title: String = "",
  var subtitle: String = "", 
  var publisher: String = "", 
  var currentcopyright: String = "",
  var bookedition: String = "", 
  var uniqueid: String = "",
  var storyinfo: String = "", 
  var condition: String = "", 
  var isbn: String = ""
)

data class BookId(
  var bookid: String = ""
)
