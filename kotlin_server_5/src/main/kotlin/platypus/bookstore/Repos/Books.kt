
package platypus.bookstore.repos

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.Book
import platypus.bookstore.classes.ResultString
import org.springframework.stereotype.Repository

@Repository
interface BookRepository : CoroutineCrudRepository<Book, Long> {
    
    // The result of a modifying query can be:
    // Void (or Kotlin Unit) to discard update count and await completion.
    // Integer or another numeric type emitting the affected rows count.
    // Boolean to emit whether at least one row was updated.

    @Modifying
    @Query(
    """
      insert into book (title, subtitle, publisher, currentcopyright, bookedition, uniqueid, storyinfo, condition, isbn) values (:title, :subtitle, :publisher, :currentcopyright, :bookedition, :uniqueid, :storyinfo, :condition, :isbn)
    """
    )
    suspend fun saveabook(title:String, subtitle:String, publisher:String, currentcopyright:String, bookedition:String, uniqueid:String, storyinfo:String, condition:String, isbn:String):Boolean

    @Query("""
      select * from book
    """)
    suspend fun findBooks():List<Book>

    @Modifying
    @Query(
      """
        update book set 
        title=:title,
        subtitle=:subtitle,
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
    suspend fun updateabook(title:String, subtitle:String, publisher:String, currentcopyright:String, bookedition:String, storyinfo:String, condition:String, isbn:String,uniqueid:String):Boolean

    @Modifying
    @Query(
      """
        DELETE from book where uniqueid = :bookuniqueid
      """
    )
    suspend fun deletebybookid(uniqueid: String):Boolean

}
