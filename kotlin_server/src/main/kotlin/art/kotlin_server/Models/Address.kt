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
@Table(name="address")
data class Address (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val addressType: String = "Shipping",

    @get: NotBlank
    val street: String = "Default",

    @get: NotBlank
    val state: String = "Default",

    @get: NotBlank
    val city: String = "Default",

    @get: NotBlank
    val zip: String = "Default",

    @get: NotBlank
    val apt: String = "Default",

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "userorder_id")
	var userorder:UserOrder? =null,

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "user_id")
	var user:User? =null
)