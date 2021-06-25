package art.kotlin_server.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import org.springframework.web.bind.annotation.RestController
import art.kotlin_server.utility.ModelUtility


import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@RestController
@Entity
@Table(name="message")
data class Message (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val message: String="",
  
    @get: NotBlank
    val messageDate:Long=ModelUtility().CurrentMilliseconds(),

    @get: NotBlank
    val responseID: Long = -1,

    @get: NotBlank
    val from: String="ADMIN",

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "user_id")
	  var user:User? =null
)