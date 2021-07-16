package platypus.bookstore.handlers

import platypus.bookstore.repos.UserRepository
import platypus.bookstore.classes.db.*
import platypus.bookstore.classes.*
import kotlin.collections.mutableListOf
import platypus.bookstore.utility.*
import platypus.bookstore.api.*

class UsersHandler(val userRepo: UserRepository){

  suspend fun logoutuser(userlogout: UserLogin):Boolean{
    var usersfound:List<User> = userRepo.finduserbyusername(userlogout.username)
    for(user in usersfound){
      postredis(userlogout.username, "logout")
    }
    return true;
  }

  suspend fun attemptlogin(userlogin: UserLogin):Boolean{
    println("val")
    var usersfound:List<User> = userRepo.finduserbyusername(userlogin.username)
    println("value of usersfound $usersfound")
    for(user in usersfound){
      println("value of user $user")
      var matchencoded = matchencode(userlogin.password, user.hashedpassword);
      return matchencoded
    }
    return false;
  }

  suspend fun loginredis(username: String):String{
    var timehash = encodestring(System.currentTimeMillis().toString())
    postredis(username, timehash)
    return timehash
  }

  suspend fun newuser(userlogin: UserLogin):Boolean{
    var returnbool = false;
    //first check if username already exists
    var usersfound:List<User> = userRepo.finduserbyusername(userlogin.username)
    if (usersfound.size>0){
      returnbool = false;
    }else{
      var hashedpassword = encodestring(userlogin.password)
      returnbool = userRepo.saveusernamehashedpassword(userlogin.username, hashedpassword)
    }
    return returnbool;
  }


}