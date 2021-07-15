package platypus.bookstore.api


import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

suspend fun getrequest(uristring: String):String{
  val client = HttpClient.newBuilder().build();
  val request = HttpRequest.newBuilder()
      .uri(URI.create(uristring))
      .build();
      
  val response = client.send(request, HttpResponse.BodyHandlers.ofString());
  println(response.body())
  return response.body()
}

// suspend fun postrequest() {

//   val values = mapOf("name" to "John Doe", "occupation" to "gardener")

//   val objectMapper = ObjectMapper()
//   val requestBody: String = objectMapper
//       .writeValueAsString(values)

//   val client = HttpClient.newBuilder().build();
//   val request = HttpRequest.newBuilder()
//       .uri(URI.create("https://httpbin.org/post"))
//       .POST(HttpRequest.BodyPublishers.ofString(requestBody))
//       .build()
//   val response = client.send(request, HttpResponse.BodyHandlers.ofString());
//   println(response.body())
// }