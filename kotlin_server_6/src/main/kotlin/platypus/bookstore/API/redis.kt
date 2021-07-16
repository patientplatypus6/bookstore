package platypus.bookstore.api


suspend fun postredis(key: String, value: String):HashMap<String, String>{
  val posthash:HashMap<String, String> = HashMap<String, String>()
  posthash.put("key", key)
  posthash.put("value", value)
  return postrequest(posthash, "http://localhost:4000/store")
}

suspend fun getkeyredis(key: String):HashMap<String, String>{ 
  val posthash:HashMap<String, String> = HashMap<String, String>()
  posthash.put("key", key)
  println("value of posthash before send in getkeyredis $posthash")
  return postrequest(posthash, "http://localhost:4000/retrieve")
}