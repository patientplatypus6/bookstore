package platypus.bookstore.handlers

import platypus.bookstore.repos.RevenueCostRepository
import platypus.bookstore.classes.db.Book
import platypus.bookstore.classes.db.RevenueCost

class RevenueCostsHandler(val revenuecostRepo: RevenueCostRepository){

  suspend fun findrevenuecosts():List<RevenueCost>{
    println("findRevenueCosts")
    val revenuecosts:List<RevenueCost> = revenuecostRepo.findrevenuecosts()
    return revenuecosts;
  }

  suspend fun addrevenuecost(revenuecost: RevenueCost):Boolean{
    println("value of revenuecost: $revenuecost")
    var revenueCostUpdated: Boolean = revenuecostRepo.savearevenuecost(revenuecost.uniqueid, revenuecost.bookuniqueid, revenuecost.userorderuniqueid, revenuecost.rcname, revenuecost.rcdescription, revenuecost.rcvalue, revenuecost.rcdate)
    return revenueCostUpdated;
  }

  suspend fun findrevenuecostsbybook(bookuniqueid: String): List<RevenueCost>{
    val revenuecostlist = revenuecostRepo.findrevenuecostsbybookuniqueid(bookuniqueid)
    return revenuecostlist
  } 


} 