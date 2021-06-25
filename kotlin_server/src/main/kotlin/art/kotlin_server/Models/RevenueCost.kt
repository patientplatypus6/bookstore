package art.kotlin_server.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import org.springframework.web.bind.annotation.RestController
import art.kotlin_server.utility.ModelUtility

import art.kotlin_server.model.Book

import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@RestController 
@Entity
@Table(name="revenuecost")
data class RevenueCost (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val rcname: String = "",

    @get: NotBlank
    val rcdescription: String = "",

    @get: NotBlank
    val rcvalue: Long = 0,

    @get: NotBlank
    val rcdate:Long=ModelUtility().CurrentMilliseconds(),

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "book_id")
	  var book:Book? = null,

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "order_id")
	  var order:Order? = null

)