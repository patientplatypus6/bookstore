package art.kotlin_server.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import org.springframework.web.bind.annotation.RestController
import art.kotlin_server.utility.ModelUtility

import javax.persistence.OneToMany
import javax.persistence.ManyToOne
import javax.persistence.JoinColumn
import javax.persistence.Table


@RestController
@Entity 
@Table(name = "order")
data class Order (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val message: String="",

    @OneToMany(mappedBy = "order", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val addressList: List<Address>? = null,

    @OneToMany(mappedBy = "order", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val revenueCostList: List<RevenueCost>? = null,

    @ManyToOne(cascade = arrayOf(CascadeType.ALL))
    @JoinColumn(name = "user_id")
  	var user:User? =null,

    @get: NotBlank
    val orderDate:Long=ModelUtility().CurrentMilliseconds(),
  
    @get: NotBlank
    val shipDate:Long=ModelUtility().CurrentMilliseconds(),

    @get: NotBlank
    val messageDate:Long=ModelUtility().CurrentMilliseconds(),

    @get: NotBlank
    val orderNumber:Long=-1
)