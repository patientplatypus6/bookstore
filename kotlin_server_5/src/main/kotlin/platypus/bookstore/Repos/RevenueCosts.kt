package platypus.bookstore.repos.revenuecost

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.revenuecosts.RevenueCost
import platypus.bookstore.classes.general.ResultString
import org.springframework.stereotype.Repository

@Repository
interface RevenueCostRepository : CoroutineCrudRepository<RevenueCost, Long> {
    
    @Query("""
      select * from revenuecost
    """)
    suspend fun findRevenueCosts():List<RevenueCost>
}
