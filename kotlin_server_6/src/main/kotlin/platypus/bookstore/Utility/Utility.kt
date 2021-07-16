package platypus.bookstore.utility


import java.io.File
import java.util.Base64
import java.time.format.DateTimeFormatter
import java.time.LocalDateTime

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

// parse datetime

suspend fun convertdatetime(input:String):LocalDateTime{
  println("inside convertdatetime")
  println("value of input $input")
  println("is of pattern ? yyyy-MM-dd HH:mm:ss")
  var returndatetime = LocalDateTime.parse(
    input, 
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
  );
  println("value of returndatetime: $returndatetime")
  return returndatetime
}

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

//--------- picture handler functions ---------

suspend fun encodestring(input: String):String{
  var encoder = BCryptPasswordEncoder()
  return encoder.encode(input)
}

suspend fun matchencode(input: String, hash: String):Boolean{
  var encoder = BCryptPasswordEncoder()
  return encoder.matches(input, hash)
}

//--------- picture handler functions ---------

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



suspend fun deleteall(){
  var pathFile = "src/main/resources/static/images"
  File(pathFile).walk().forEach {
    println(it)
    println(it.toString())
    if(it.toString().contains(".")){
      it.delete()
    }
  }
}

suspend fun picext(picstring: String):String{
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
  return picext
}

suspend fun picextrev(picstring: String):String{
  var picextrev = ""
  if(picstring.contains("jpg")){
    picextrev = "data:image/jpg;base64,"
  }
  if(picstring.contains("jpeg")){
    picextrev = "data:image/jpeg;base64,"
  }
  if(picstring.contains("png")){
    picextrev = "data:image/png;base64,"
  }
  if(picstring.contains("gif")){
    picextrev = "data:image/gif;base64,"
  }
  if(picstring.contains("pdf")){
    picextrev = "data:image/pdf;base64,"
  }
  return picextrev
}

suspend fun writepic(picstring: String, filename: String){
  // println("inside writepic and picstring $picstring and filename $filename")
  val cleaned64 = picstring.split(",")[1]
  val pathFile = "src/main/resources/static/images/"+filename
  val imageByteArray = Base64.getDecoder().decode(cleaned64)
  File(pathFile).writeBytes(imageByteArray)
}

suspend fun retrievepic(filename: String):String{
  val path = "src/main/resources/static/images/"+filename
  val bytes = File(path).readBytes()
  val base64 = Base64.getEncoder().encodeToString(bytes)
  return base64
}