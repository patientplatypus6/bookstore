
package platypus.bookstore.repos

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.Book
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
      insert into books 
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
    suspend fun saveabook(title:String, subtitle:String, author: String, publisher:String, currentcopyright:String, bookedition:String, uniqueid:String, storyinfo:String, condition:String, isbn:String, timeordered:String, timeshipped:String, incartguest:String, incartuser:String):Boolean

    @Query(
    """
      select * from books
    """
    )
    suspend fun findBooks():List<Book>

    @Query(
      """
        select * from books 
        where 
        timeordered = 0 and
        uniqueid = :uniqueid and 
        (
          (
            incartguest=0 or
            (:currentmilliseconds - incartguest > 300000)
          ) or 
          (
            incartuser=0 or
            (:currentmilliseconds - incartuser > 3600000)
          ) 
        )
      """    
    )
    suspend fun findBookIdNotOrderedNotCart(uniqueid: String, currentmilliseconds: Long):List<Book>

    @Query(
    """
      select * from books where dateordered=''
    """
    )
    suspend fun findBooksforsale():List<Book>

    @Modifying
    @Query(
    """
      update books set
      incartguest=:currentmilliseconds
      where
      uniqueid=:bookuniqueid
      and
      (
        (
          incartguest=0 or
          (:currentmilliseconds - incartguest > 300000)
        ) or 
        (
          incartuser=0 or
          (:currentmilliseconds - incartuser > 3600000)
        )   
      )
    """
    )
    suspend fun updateBookIdinCartGuest(bookuniqueid: String, currentmilliseconds: Long):Boolean

    @Modifying
    @Query(
    """
      update books set
      incartguest=:currentmilliseconds
      where
      uniqueid=:bookuniqueid
      and
      (
        (
          incartguest=0 or
          (:currentmilliseconds - incartguest > 300000)
        ) or 
        (
          incartuser=0 or
          (:currentmilliseconds - incartuser > 3600000)
        ) 
      )
    """
    )
    suspend fun updateBookIdinCartUser(bookuniqueid: String, currentmilliseconds: Long):Boolean

    @Modifying
    @Query(
    """
      update books set 
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
      DELETE from books where uniqueid = :bookuniqueid
    """
    )
    suspend fun deletebybookid(uniqueid: String):Boolean

}
