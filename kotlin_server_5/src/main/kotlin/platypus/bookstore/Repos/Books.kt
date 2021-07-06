
// import org.springframework.data.r2dbc.repository.Query
// import org.springframework.data.repository.reactive.ReactiveCrudRepository
// import reactor.core.publisher.Flux

// interface UserRepository : ReactiveCrudRepository<Books, Long> {

//     @Query("SELECT u.* FROM users u WHERE u.email = :email")
//     fun findByEmail(email: String): Flux<User>
// }
package platypus.bookstore.repos.books

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param //is this right? may be necessary to use r2dbc
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.books.Books
import platypus.bookstore.classes.general.ResultString
import org.springframework.stereotype.Repository
// import org.springframework.data.domain.Persistable

@Repository
interface BookRepository : CoroutineCrudRepository<Books, Long> {
    

    // The result of a modifying query can be:
    // Void (or Kotlin Unit) to discard update count and await completion.
    // Integer or another numeric type emitting the affected rows count.
    // Boolean to emit whether at least one row was updated.

    @Modifying
    @Query(
    """
      insert into books (title, subtitle, publisher, currentcopyright, bookedition, uniqueid, authorbio, synopsis, isbn) values (:title, :subtitle, :publisher, :currentcopyright, :bookedition, :uniqueid, :authorbio, :synopsis, :isbn)
    """)
    suspend fun saveabook(title:String, subtitle:String, publisher:String, currentcopyright:String, bookedition:String, uniqueid:String, authorbio:String, synopsis:String, isbn:String):Void

    @Query("""
      select * from books
    """)
    suspend fun findBooks():List<Books>
}
