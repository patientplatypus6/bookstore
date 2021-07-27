package platypus.bookstore.api

suspend fun postredis(key: String, value: String):HashMap<String, String>{
  val posthash:HashMap<String, String> = HashMap<String, String>()
  posthash.put("key", key)
  posthash.put("value", value)
  val requestaddress:String = System.getenv("NODE_SERVER_URL") + ":"+ System.getenv("NODE_SERVER_PORT")+"/store"
  return postrequest(posthash, requestaddress)
}

suspend fun getkeyredis(key: String):HashMap<String, String>{ 
  val posthash:HashMap<String, String> = HashMap<String, String>()
  posthash.put("key", key)
  println("value of posthash before send in getkeyredis $posthash")
  val requestaddress:String = System.getenv("NODE_SERVER_URL") + ":"+ System.getenv("NODE_SERVER_PORT")+"/retrieve"
  return postrequest(posthash, requestaddress)
}