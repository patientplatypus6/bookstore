

package platypus.bookstore.classes.db

import java.time.LocalDateTime

data class RevenueCost(
  var uniqueid: String = "",
  var bookuniqueid: String = "", 
  var userorderuniqueid: String = "", 
  var rcname: String = "", 
  var rcdescription: String = "", 
  var rcvalue: String = "",
  var rcdate: LocalDateTime = LocalDateTime.now()
)