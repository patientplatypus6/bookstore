package platypus.bookstore.api

suspend fun postredis(key: String, value: String):HashMap<String, String>{
  val posthash:HashMap<String, String> = HashMap<String, String>()
  posthash.put("key", key)
  posthash.put("value", value)
  val requestaddress:String = "http://"+System.getenv("nodeserver_URL") + ":"+ System.getenv("nodeserver_PORT")+"/store"
  // val requestaddress:String="http://localhost:4000/store"
  return postrequest(posthash, requestaddress)
}

suspend fun getkeyredis(key: String):HashMap<String, String>{ 
  val posthash:HashMap<String, String> = HashMap<String, String>()
  posthash.put("key", key)
  println("value of posthash before send in getkeyredis $posthash")
  val requestaddress:String = "http://"+System.getenv("nodeserver_URL") + ":"+ System.getenv("nodeserver_PORT")+"/retrieve"
  // val requestaddress:String="http://localhost:4000/retrieve"
  return postrequest(posthash, requestaddress)
}