package platypus.bookstore.repos

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.RevenueCost
import org.springframework.stereotype.Repository

@Repository
interface RevenueCostRepository : CoroutineCrudRepository<RevenueCost, Long> {
    
    @Modifying
    @Query(
    """
      insert into revenuecost (uniqueid, bookuniqueid, userorderuniqueid, rcname, rcdescription, rcvalue, rcdate) values (:uniqueid, :bookuniqueid, :userorderuniqueid, :rcname, :rcdescription, :rcvalue, :rcdate)
    """
    )
    suspend fun savearevenuecost(uniqueid:String, bookuniqueid:String, userorderuniqueid:String, rcname:String, rcdescription:String, rcvalue:String, rcdate:String):Boolean

    @Query("""
      select * from revenuecost
    """)
    suspend fun findrevenuecosts():List<RevenueCost>

    @Query("""
      select * from revenuecost where bookuniqueid = :bookuniqueid 
    """)
    suspend fun  findrevenuecostsbybookuniqueid(bookuniqueid: String):List<RevenueCost>
}
