package platypus.bookstore.repos

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.RevenueCost
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface RevenueCostRepository : CoroutineCrudRepository<RevenueCost, Long> {
    
    @Modifying
    @Query(
    """
      insert into revenuecost (uniqueid, bookuniqueid, userorderuniqueid, rcname, rcdescription, rcvalue, rcdate) values (:uniqueid, :bookuniqueid, :userorderuniqueid, :rcname, :rcdescription, :rcvalue, :rcdate)
    """
    )
    suspend fun savearevenuecost(uniqueid:String, bookuniqueid:String, userorderuniqueid:String, rcname:String, rcdescription:String, rcvalue:String, rcdate:Long):Boolean

    @Query(
    """
      select * from revenuecost
    """
    )
    suspend fun findrevenuecosts():List<RevenueCost>

    @Query(
    """
      select * from revenuecost
      where
      rcname = 'REVENUE - BOOK SHIPPING (PROJECTED)'
    """
    )
    suspend fun findallshippingpriceproj():List<RevenueCost>

    @Query(
    """
      select * from revenuecost
      where
      rcname = 'REVENUE - BOOK PRICE (PROJECTED)'
    """
    )
    suspend fun findallsalespriceproj():List<RevenueCost>

    @Query(
      """
        select * from revenuecost
        where
        rcname = 'REVENUE - BOOK SHIPPING (PROJECTED)'
        and
        bookuniqueid = :uniqueid
      """
      )
      suspend fun findshippingpriceprojbyid(uniqueid: String):List<RevenueCost>
  
      @Query(
      """
        select * from revenuecost
        where
        rcname = 'REVENUE - BOOK PRICE (PROJECTED)'
        and
        bookuniqueid = :uniqueid
      """
      )
      suspend fun findsalespriceprojbyid(uniqueid: String):List<RevenueCost>

    @Query(
    """
      select * from revenuecost
      where
      rcname = 'REVENUE - BOOK SHIPPING (PROJECTED)'
      and
      bookuniqueid in (:uniqueidlist)
    """
    )
    suspend fun findshippingpriceprojinlist(uniqueidlist: List<String>):List<RevenueCost>

    @Query(
    """
      select * from revenuecost
      where
      rcname = 'REVENUE - BOOK PRICE (PROJECTED)'
      and
      bookuniqueid in (:uniqueidlist)
    """
    )
    suspend fun findsalespriceprojinlist(uniqueidlist: List<String>):List<RevenueCost>

    @Query(
    """
      select * from revenuecost where bookuniqueid = :bookuniqueid 
    """
    )
    suspend fun  findrevenuecostsbybookuniqueid(bookuniqueid: String):List<RevenueCost>

    @Modifying
    @Query(
    """
      DELETE from revenuecost where bookuniqueid = :bookuniqueid
    """
    )
    suspend fun deletebybookid(bookuniqueid: String):Boolean

    @Query(
    """
      SELECT * from revenuecost where rcname = :rcname
    """
    )
    suspend fun allrcbyname(bookuniqueid: String):List<RevenueCost>
}
