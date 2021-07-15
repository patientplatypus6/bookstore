package platypus.bookstore.api


suspend fun postredis(key: String, value: String):HashMap<String, String>{
  val posthash:HashMap<String, String> = HashMap<String, String>()
  posthash.put("key", key)
  posthash.put("value", value)

  return postrequest(posthash, "http://localhost:4000/store")
}

suspend fun getredis():HashMap<String, String>{ 
  return getrequest("http://localhost:4000/retrieve")
}