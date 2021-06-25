package art.kotlin_server.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
// import javax.persistence.*
// import java.util.List
import kotlin.collections.mutableListOf
import javax.validation.constraints.NotBlank
import org.springframework.web.bind.annotation.RestController

import javax.persistence.OneToMany
import javax.persistence.ManyToOne
import javax.persistence.JoinColumn
import javax.persistence.Table

import java.util.*

// import art.kotlin_server.model.RevenueCost

@RestController 
@Entity
@Table(name="book")
data class Book (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val title: String = "",

    @get: NotBlank
    val authors: MutableList<String> = mutableListOf<String>(),

    @get: NotBlank
    val publish: String = "",

    @get: NotBlank
    val copyrightDateList: MutableList<Long> = mutableListOf<Long>(),

    @get: NotBlank
    val currentCopyright:Long = 0,
    
    @get: NotBlank
    val edition:Long = 1,

    @get: NotBlank
    val subTitle:String="", 

    @get: NotBlank
    val authorBio:String="",

    @get: NotBlank
    val synopsis:String="",

    @get: NotBlank
    val copyNumber:Long=1,

    @get: NotBlank
    val hashtagList: MutableList<String> = mutableListOf<String>(),

    @OneToMany(mappedBy = "book", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val revenueCostList: List<RevenueCost>? = null,
)