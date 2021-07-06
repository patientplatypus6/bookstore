package platypus.bookstore.classes.db.books

// import art.kotlin_server.model.RevenueCost

data class BookRC(
  var book: Book,
  var revenuecost: List<RevenueCost>
)

data class RevenueCost(
  var uniqueid: String = "",
  var bookuniqueid: String = "", 
  var userorderuniqueid: String = "", 
  var rcname: String = "", 
  var rcdescription: String = "", 
  var rcvalue: String = "",
  var rcdate: String = ""
)

data class Book(
  var title: String = "",
  var subtitle: String = "", 
  var publisher: String = "", 
  var currentcopyright: String = "",
  var bookedition: String = "", 
  var uniqueid: String = "",
  var authorbio: String = "", 
  var synopsis: String = "", 
  var isbn: String = ""
)
