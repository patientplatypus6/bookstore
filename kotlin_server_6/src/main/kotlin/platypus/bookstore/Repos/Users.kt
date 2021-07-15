
package platypus.bookstore.repos

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.kotlin.CoroutineCrudRepository;
import org.springframework.data.r2dbc.repository.Query  
import org.springframework.data.repository.query.Param 
import org.springframework.data.r2dbc.repository.Modifying
import platypus.bookstore.classes.db.UserLogin
import platypus.bookstore.classes.ResultString
import org.springframework.stereotype.Repository
import platypus.bookstore.classes.db.User

@Repository
interface UserRepository : CoroutineCrudRepository<User, Long> {


  
    @Query(
    """
      select * from user where username = :username
    """
    )
    suspend fun finduserbyusername(username: String):List<User>

    @Query(
    """
      select * from user where hashedpassword = :hashedpassword
    """
    )
    suspend fun finduserbyhashedpassword(hashedpassword: String):List<User>

    @Modifying
    @Query(
    """
      insert into user (username, hashedpassword) values (:username, :hashedpassword)
    """
    )
    suspend fun saveusernamehashedpassword(username: String, hashedpassword: String):Boolean

    @Modifying
    @Query(
    """
      update user set
      phone=:phone, 
      email=:email,
      firstname=:firstname,
      lastname=:lastname
      where
      username=:username
    """
    )
    suspend fun saveuserinfo(phone: String, email: String, firstname: String, lastname: String, username:String):Boolean

    @Modifying
    @Query(
    """
      update user set
      hashedpassword=:hashedpassword
      where
      username=:username
    """
    )
    suspend fun updatepassword(hashedpassword: String, username: String)
}
