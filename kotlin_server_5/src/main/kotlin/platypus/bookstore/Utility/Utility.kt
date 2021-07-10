package platypus.bookstore.utility

// https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/to-byte-array.html

class ByteArrayHandler(){
  val charset = Charsets.UTF_8
  suspend fun converttobytearray(inputstring: String):ByteArray{
    val byteArray = inputstring.toByteArray(charset)
    return byteArray;
  }
  suspend fun convertfrombytearray(byteArray: ByteArray):String{
    return byteArray.toString(charset)
  }
}