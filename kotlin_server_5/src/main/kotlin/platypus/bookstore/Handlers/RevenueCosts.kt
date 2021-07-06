package platypus.bookstore.handlers.revenuecostshandler

import platypus.bookstore.repos.revenuecost.RevenueCostRepository
import platypus.bookstore.classes.db.books.Book
import platypus.bookstore.classes.db.revenuecosts.RevenueCost
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.web.reactive.function.server.*
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan;

@Component
@ComponentScan("platypus.bookstore")
class RevenueCostsHandler(val revenuecostRepo: RevenueCostRepository){

  suspend fun findRevenueCosts():List<RevenueCost>{
    println("findRevenueCosts")
    val revenuecosts:List<RevenueCost> = revenuecostRepo.findRevenueCosts()
    return revenuecosts;
  }

  suspend fun addRevenueCost(revenuecost: RevenueCost){
    revenuecostRepo.save(revenuecost)
    // var revenuecostlist:List<RevenueCost> = findRevenueCosts()
    // return revenuecostlist
  }

} 