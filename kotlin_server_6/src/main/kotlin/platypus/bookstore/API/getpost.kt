package platypus.bookstore.api


import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.*  

suspend fun hashmapbuilder(response: String):HashMap<String, String>{
  val JSON = jacksonObjectMapper()
  val reply:HashMap<String, String> = JSON.readValue(response)
  return reply
}

suspend fun getrequest(uristring: String):HashMap<String, String>{


  val client = HttpClient.newBuilder().build();
  val request = HttpRequest.newBuilder()
      .uri(URI.create(uristring))
      .build();
       
  val response = client.send(request, HttpResponse.BodyHandlers.ofString());

  return hashmapbuilder(response.body())
}

suspend fun postrequest(map: HashMap<String, String>, uristring: String):HashMap<String, String>{

  val objectMapper = ObjectMapper()
  var requestBody:String = objectMapper
    .writerWithDefaultPrettyPrinter()
    .writeValueAsString(map);

  val client = HttpClient.newBuilder().build();
  val request = HttpRequest.newBuilder()
      .uri(URI.create(uristring))
      .header("Content-Type", "application/json")
      .POST(HttpRequest.BodyPublishers.ofString(requestBody))
      .build()

  val response = client.send(request, HttpResponse.BodyHandlers.ofString());
  
  return hashmapbuilder(response.body())
}