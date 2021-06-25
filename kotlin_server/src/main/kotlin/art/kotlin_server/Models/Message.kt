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
    val messagecontent: String="",
  
    @get: NotBlank
    val messageDate:Long=0,

    @get: NotBlank
    val messageresponseID: Long = -1,

    @get: NotBlank
    val messagefrom: String="",

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "user_id")
	  var user:User? =null
)