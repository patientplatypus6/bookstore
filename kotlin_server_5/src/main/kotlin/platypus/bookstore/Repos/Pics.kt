
package platypus.bookstore.repos

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.Pic
import platypus.bookstore.classes.ResultString
import org.springframework.stereotype.Repository

@Repository
interface PicRepository : CoroutineCrudRepository<Pic, Long> {
    
    // The result of a modifying query can be:
    // Void (or Kotlin Unit) to discard update count and await completion.
    // Integer or another numeric type emitting the affected rows count.
    // Boolean to emit whether at least one row was updated.

    @Modifying
    @Query(
    """
      insert into pic (picbyte, bookuniqueid, frontcover, backcover, uniqueid) values (:picbyte, :bookuniqueid, :frontcover, :backcover, :uniqueid)
    """
    )
    suspend fun savebookpic(picbyte: ByteArray, bookuniqueid: String, frontcover: Boolean, backcover: Boolean, uniqueid: String):Boolean

    @Query("""
      select * from pic where frontcover = 1
    """)
    suspend fun findallbookcovers():List<Pic>

    @Query("""
      select * from pic where bookuniqueid = :bookuniqueid
    """)
    suspend fun findallbookcovers(bookuniqueid: String):List<Pic>
}
