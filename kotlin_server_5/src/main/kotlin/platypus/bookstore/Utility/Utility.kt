package platypus.bookstore.utility

import java.io.File
import java.util.Base64


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

// https://grokonez.com/kotlin/kotlin-encode-decode-fileimage-base64

suspend fun decoder(base64Str: String, pathFile: String): Unit{
	val imageByteArray = Base64.getDecoder().decode(base64Str)
	File(pathFile).writeBytes(imageByteArray)
}

fun encoder(filePath: String): String{
  val bytes = File(filePath).readBytes()
  val base64 = Base64.getEncoder().encodeToString(bytes)
  return base64
}
