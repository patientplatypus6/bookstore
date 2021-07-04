
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
import platypus.bookstore.classes.db.books.Books
import org.springframework.stereotype.Repository

@Repository
interface BookRepository : CoroutineCrudRepository<Books, Long> {
    // @Query("""
    // INSERT INTO BOOKS (title, subtitle, publisher, currentcopyright, authorbio, synopsis, isbn) values (:title, :subtitle, :publisher, :currentcopyright, :authorbio, :synopsis, :isbn);
    // """)
    // suspend fun save(title: String, subtitle: String, publisher: String, currentcopyright: String, authorbio: String, synopsis: String, isbn: String
    // ):String

    @Query("""
      select * from books
    """)
    suspend fun findBooks():List<Books>

    // @Query("""
    // SELECT * FROM BOOKS;
    // """)
    // suspend fun findAll():<List>Books

  // fun findBySlug(slug: String): Article?
  // fun findAllByOrderByAddedAtDesc(): Iterable<Article>
}
