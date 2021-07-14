
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
      insert into pic (picname, bookuniqueid, frontcover, backcover, uniqueid) values (:picname, :bookuniqueid, :frontcover, :backcover, :uniqueid)
    """
    )
    suspend fun savebookpic(picname: String, bookuniqueid: String, frontcover: Boolean, backcover: Boolean, uniqueid: String):Boolean

    @Query("""
    select * from pic
    """)
    suspend fun findallpics():List<Pic>

    @Query("""
      select * from pic where frontcover = 1
    """)
    suspend fun findallbookcovers():List<Pic>

    @Query("""
      select * from pic where bookuniqueid = :bookuniqueid
    """)
    suspend fun findpicsbybook(bookuniqueid: String):List<Pic>

    @Query("""
      select * from pic where frontcover = 1 and bookuniqueid in (:bookuniqueidlist)
    """)
    suspend fun findcoversbybookgroup(bookuniqueidlist: List<String>):List<Pic>
    
    @Modifying
    @Query(
      """
        DELETE from pic where bookuniqueid = :bookuniqueid
      """
    )
    suspend fun deletebybookid(bookuniqueid: String):Boolean

}
