package art.kotlin_server.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import org.springframework.web.bind.annotation.RestController
import art.kotlin_server.utility.ModelUtility

import javax.persistence.JoinColumn
import javax.persistence.OneToMany
import javax.persistence.Table

@RestController 
@Entity
@Table(name="user")
data class User (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val phone:Long=0,

    @get: NotBlank
    val email:String="",

    @get: NotBlank
    val name:String="",

    @OneToMany(mappedBy = "user", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val Addresses: List<Address>? = null,

    @OneToMany(mappedBy = "user", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val Orders: List<Order>? = null,

    @OneToMany(mappedBy = "user", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val Messages: List<Message>? = null,
    
)