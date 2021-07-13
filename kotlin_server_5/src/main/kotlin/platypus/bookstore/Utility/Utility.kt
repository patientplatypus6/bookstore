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

suspend fun deleteprev(filesubstring: String){
  var pathFile = "src/main/resources/static/images"
  File(pathFile).walk().forEach {
    println(it)
    if(it.toString().contains(filesubstring)){  
      var pathstring: String = it.toString();
      File(pathstring).delete()
    }
  }
}

suspend fun writepic(picstring: String, filename: String){
  val cleaned64 = picstring.split(",")[1]
  var picext = ""
  if(picstring.split(",")[0].contains("jpg")){
    picext = ".jpg"
  }
  if(picstring.split(",")[0].contains("jpeg")){
    picext = ".jpeg"
  }
  if(picstring.split(",")[0].contains("png")){
    picext = ".png"
  }
  if(picstring.split(",")[0].contains("gif")){
    picext = ".gif"
  }
  if(picstring.split(",")[0].contains("pdf")){
    picext = ".pdf"
  }
  val pathFile = "src/main/resources/static/images/"+filename+picext
  val imageByteArray = Base64.getDecoder().decode(cleaned64)
  File(pathFile).writeBytes(imageByteArray)
}


// https://grokonez.com/kotlin/kotlin-encode-decode-fileimage-base64

// suspend fun decoder(base64Str: String, pathFile: String): Unit{
// 	val imageByteArray = Base64.getDecoder().decode(base64Str)
// 	File(pathFile).writeBytes(imageByteArray)
// }

// fun encoder(filePath: String): String{
//   val bytes = File(filePath).readBytes()
//   val base64 = Base64.getEncoder().encodeToString(bytes)
//   return base64
// }
