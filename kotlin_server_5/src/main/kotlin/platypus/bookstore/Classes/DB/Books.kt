package platypus.bookstore.classes.db.books

data class Books(
  var title: String,
  var subtitle: String, 
  var publisher: String, 
  var currentcopyright: String,
  var bookedition: String, 
  var uniqueid: String,
  var authorbio: String, 
  var synopsis: String, 
  var isbn: String
)
