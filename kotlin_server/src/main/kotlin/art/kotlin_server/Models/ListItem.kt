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
@Table(name="listitem")
data class ListItem (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val stringitem: String = "",

    @get: NotBlank
    val longitem: Long = 0,

    @get: NotBlank
    val dateitem: Long = 0,

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "book_id")
	  var book:Book? = null,

)