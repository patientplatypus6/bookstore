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
    var revenueCostAdded: Boolean = revenuecostRepo.savearevenuecost(revenuecost.uniqueid, revenuecost.bookuniqueid, revenuecost.userorderuniqueid, revenuecost.rcname, revenuecost.rcdescription, revenuecost.rcvalue, revenuecost.rcdate)
    return revenueCostAdded;
  }

  suspend fun findrevenuecostsbybook(bookuniqueid: String): List<RevenueCost>{
    val revenuecostlist = revenuecostRepo.findrevenuecostsbybookuniqueid(bookuniqueid)
    return revenuecostlist
  } 

  suspend fun updaterevenuecosts(revenuecostlist: List<RevenueCost>, bookuniqueid: String):Boolean{
    println("inside updaterevenuecosts and revenuecostlist: $revenuecostlist")
    var deletebool = revenuecostRepo.deletebybookid(bookuniqueid)
    for(revenuecost in revenuecostlist){
      println("inside for loop and value of revenuecost: $revenuecost")
      addrevenuecost(revenuecost)
    }
    return true;
  }

  suspend fun allrcbyname(rcname: String):List<RevenueCost>{
    var namelist: List<RevenueCost> = 
    revenuecostRepo.allrcbyname(rcname);
    return namelist;
  }

} 