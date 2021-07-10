// CREATE TABLE pics(  
//     picbyte VARBINARY(MAX) NOT NULL,
//     bookuniqueid VARCHAR(255),
//     frontcover Boolean, 
//     backcover Boolean,
//     -- could be non-book pic data???
//     uniqueid VARCHAR(255) NOT NULL
// );

package platypus.bookstore.classes.db

data class Pic(
  var picbyte: ByteArray = <ByteArray>(),
  var bookuniqueid: String = "", 
  var frontcover: Boolean = false, 
  var backcover: Boolean = false, 
  var uniqueid: String = ""
)
