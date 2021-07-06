
package platypus.bookstore.repos.books

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.books.Book
import platypus.bookstore.classes.general.ResultString
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
      insert into book (title, subtitle, publisher, currentcopyright, bookedition, uniqueid, authorbio, synopsis, isbn) values (:title, :subtitle, :publisher, :currentcopyright, :bookedition, :uniqueid, :authorbio, :synopsis, :isbn)
    """
    )
    suspend fun saveabook(title:String, subtitle:String, publisher:String, currentcopyright:String, bookedition:String, uniqueid:String, authorbio:String, synopsis:String, isbn:String):Void

    @Query("""
      select * from book
    """)
    suspend fun findBooks():List<Book>
}
