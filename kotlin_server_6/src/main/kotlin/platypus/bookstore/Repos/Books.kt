
package platypus.bookstore.repos

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.*
import platypus.bookstore.classes.ResultString
import org.springframework.stereotype.Repository
import java.math.BigInteger

@Repository
interface BookRepository : CoroutineCrudRepository<Book, Long> {
    
    // The result of a modifying query can be:
    // Void (or Kotlin Unit) to discard update count and await completion.
    // Integer or another numeric type emitting the affected rows count.
    // Boolean to emit whether at least one row was updated.

    @Modifying
    @Query(
    """
      insert into bookz
      (
        title,
        subtitle, 
        author,
        publisher, 
        currentcopyright,
        bookedition, 
        uniqueid,
        storyinfo, 
        condition, 
        isbn,
        timeordered,
        timeshipped,
        incartguest,
        incartuser
      ) 
      values 
      (
        :title,
        :subtitle, 
        :author,
        :publisher, 
        :currentcopyright,
        :bookedition, 
        :uniqueid,
        :storyinfo, 
        :condition, 
        :isbn,
        :timeordered,
        :timeshipped,
        :incartguest,
        :incartuser
      )
    """
    )
    suspend fun saveabook(        
      title: String,
      subtitle: String, 
      author: String,
      publisher: String, 
      currentcopyright: String,
      bookedition: String, 
      uniqueid: String,
      storyinfo: String, 
      condition: String, 
      isbn: String,
      timeordered: Long,
      timeshipped: Long,
      incartguest: Long,
      incartuser: Long
    ):Boolean

    @Query(
    """
      select * from bookz
    """
    )
    suspend fun findBooks():List<BookTime>

    @Query(
    """
      select * from bookz 
      where 
      timeordered = 0 
      and
      uniqueid = :uniqueid
    """    
    )
    suspend fun findBookIdNotOrdered(uniqueid: String):List<BookTime>

    @Query(
      """
      select * from bookz
      where
      uniqueid = :uniqueid
      and 
      LENGTH(cartholdername) > 0
      and 
      (
        (:currentmilliseconds - incartguest < 600000)
        OR
        (:currentmilliseconds - incartuser < 3600000)
      ) 
      """
    )
    suspend fun findbooksincarts(uniqueid: String, currentmilliseconds: Long):List<BookIDSbyCartholdername>

    @Query(
      """
      select * from bookz
      where
      LENGTH(cartholdername) > 0
      and 
      (
        (:currentmilliseconds - incartguest < 600000)
        OR
        (:currentmilliseconds - incartuser < 3600000)
      ) 
      """
    )
    suspend fun findbooksincartsmultiple(currentmilliseconds: Long):List<BookIDSbyCartholdername>


    @Query(
    """
      select * from bookz 
      where
      uniqueid = :uniqueid
    """    
    )
    suspend fun findbookbyuniqueid(uniqueid: String):List<Book>

    @Query(
    """
      select * from bookz 
      where 
      timeordered = 0 
      and
      uniqueid = :uniqueid 
      and
      (
        (
          incartguest = 0 or
          (:currentmilliseconds - incartguest > 600000) 
        ) and
        (
          incartuser = 0 or
          (:currentmilliseconds - incartuser > 3600000)
        )
      ) 
    """    
    )
    suspend fun findBookIdNotOrderedNotInCart(uniqueid: String, currentmilliseconds: Long):List<BookTime>

    @Query(
    """
      select * from bookz where dateordered='' and 
      (
        (
          incartguest = 0 or
          (:currentmilliseconds - incartguest > 600000)
        ) and
        (
          incartuser = 0 or
          (:currentmilliseconds - incartuser > 3600000)
        ) 
      )
    """
    )
    suspend fun findBooksforsale():List<Book>

    @Query(
    """
      select * from bookz
      where
      (
        (
          incartguest = 0 or
          (:currentmilliseconds - incartguest > 600000)
        ) and
        (
          incartuser = 0 or
          (:currentmilliseconds - incartuser > 3600000)
        ) 
      )
    """
    )
    suspend fun findbookidsbycartholdername(milliseconds: Long):List<BookIDSbyCartholdername>


    @Query(
    """
      select * from bookz
      where
      uniqueid = :uniqueid
      and
      (
        (
          incartguest = 0 or
          (:currentmilliseconds - incartguest > 600000)
        ) and
        (
          incartuser = 0 or
          (:currentmilliseconds - incartuser > 3600000)
        ) 
      )
    """
    )
    suspend fun findcartholderbybookid(uniqueid: String, currentmilliseconds: Long):List<CartholdernameByUID>

    @Modifying
    @Query(
    """
      update bookz set
      timeordered = 0, 
      timeshipped = 0, 
      incartguest = 0, 
      incartuser = 0
      where
      uniqueid = :uniqueid
    """
    ) 
    suspend fun removebookcart(uniqueid: String):Boolean

    @Query(
    """
      select * from bookz
      where
      cartholdername = :cartholdername
      and 
      (:currentmilliseconds - incartuser < 3600000)
    """
    )
    suspend fun findbooksincartbynameuser(cartholdername: String, currentmilliseconds: Long):List<Book>

    @Query(
      """
        select * from bookz
        where
        cartholdername = :cartholdername
        and 
        (:currentmilliseconds - incartguest < 600000)
      """
      )
      suspend fun findbooksincartbynameguest(cartholdername: String, currentmilliseconds: Long):List<Book>

    @Modifying
    @Query(
    """
      update bookz set
      incartuser = 0,
      incartguest = :currentmilliseconds,
      cartholdername = :cartholdername
      where
      uniqueid = :bookuniqueid
    """
    )
    suspend fun updateBookinCartGuest(bookuniqueid: String, currentmilliseconds: Long, cartholdername: String):Boolean

    @Modifying
    @Query(
    """
      update bookz set
      incartuser = :currentmilliseconds,
      incartguest = 0,
      cartholdername = :cartholdername
      where
      uniqueid = :bookuniqueid
    """
    )
    suspend fun updateBookinCartUser(bookuniqueid: String, currentmilliseconds: Long, cartholdername: String):Boolean

    @Modifying
    @Query(
    """
      update bookz set 
      title=:title,
      subtitle=:subtitle,
      author=:author,
      publisher=:publisher,
      currentcopyright=:currentcopyright,
      bookedition=:bookedition,
      storyinfo=:storyinfo,
      condition=:condition,
      isbn=:isbn
      where
      uniqueid=:uniqueid
    """
    )
    suspend fun updateabook(title:String, subtitle:String, author:String, publisher:String, currentcopyright:String, bookedition:String, storyinfo:String, condition:String, isbn:String,uniqueid:String):Boolean

    @Modifying
    @Query(
    """
      DELETE from bookz where uniqueid = :bookuniqueid
    """
    )
    suspend fun deletebybookid(uniqueid: String):Boolean

}
