package platypus.bookstore.classes.db.books

data class Books(
  var title: String,
  var uniqueid: String,
  var subtitle: String, 
  var publisher: String, 
  var currentcopyright: String,
  var edition: String, 
  var authorbio: String, 
  var synopsis: String, 
  var isbn: String
)
