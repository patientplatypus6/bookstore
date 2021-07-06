package platypus.bookstore.classes.db.revenuecosts

data class RevenueCost(
  var uniqueid: String = "",
  var bookuniqueid: String = "", 
  var userorderuniqueid: String = "", 
  var rcname: String = "", 
  var rcdescription: String = "", 
  var rcvalue: String = "",
  var rcdate: String = ""
)