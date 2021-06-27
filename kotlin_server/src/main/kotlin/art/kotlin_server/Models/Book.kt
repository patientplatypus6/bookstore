package art.kotlin_server.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
// import javax.persistence.*
// import java.util.List
// import javax.persistence.Access;
// import javax.persistence.AccessType;
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
// @Access(AccessType.FIELD)
// @Access(AccessType.FIELD)
data class Book (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val title: String = "",

    @get: NotBlank
    val subtitle:String="", 

    @get: NotBlank
    val publisher: String = "",

    @get: NotBlank
    val currentcopyright:Long = 0,
    
    @get: NotBlank
    val edition:Long = 1,

    @get: NotBlank
    val authorbio:String="",

    @get: NotBlank
    val synopsis:String="",

    @get: NotBlank
    val copynumber:Long=1,

    @OneToMany(mappedBy = "book", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val revenuecostlist: List<RevenueCost>? = null,

    @OneToMany(mappedBy = "book", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val authors: List<ListItem>? = null,

    @OneToMany(mappedBy = "book", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val copyrights: List<ListItem>? = null,

    @OneToMany(mappedBy = "book", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
    val hashtags: List<ListItem>? = null,
)
