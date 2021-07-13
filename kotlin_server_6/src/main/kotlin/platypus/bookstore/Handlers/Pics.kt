package platypus.bookstore.handlers

import platypus.bookstore.repos.PicRepository
import platypus.bookstore.classes.db.*
import platypus.bookstore.classes.*
import kotlin.collections.mutableListOf
import platypus.bookstore.utility.*

class PicsHandler(val picRepo: PicRepository){

  suspend fun deletebookpics(bookid: String):Boolean{
    //list and delete all files in image directory with bookuniqueid+"pic" and delete -
    var filesubstring =  bookid+"pic" 
    deleteprev(filesubstring)

    var deletedpics = picRepo.deletebybookid(bookid)
    return deletedpics
  }

  suspend fun savebookpics(picdata: Picdata):Boolean{
    println("inside savebookpics in pic handler")

    //list and delete all files in image directory with bookuniqueid+"pic" and delete -
    var filesubstring =  picdata.bookuniqueid+"pic" 
    deleteprev(filesubstring)

    // println("*****************************")
    // println("*****************************")
    // println("*****************************")
    // var filelengthone = picdata.files[0].length 
    // println("value of picdata.files: $filelengthone")
    // println("*****************************")
    // println("*****************************")
    // println("*****************************")


    if(picdata.files[0].length!=1){
      for((index, file) in picdata.files.withIndex()){
        var fileindexstring = filesubstring + index.toString()
        var picextstring = picext(file)
        val newpic = Pic();
        newpic.picname = fileindexstring+picextstring
        newpic.uniqueid = fileindexstring
        newpic.bookuniqueid = picdata.bookuniqueid
        newpic.frontcover = if(picdata.frontcoverindex == index) true else false
        newpic.backcover = if(picdata.backcoverindex == index) true else false
        
        var picsaved:Boolean = picRepo.savebookpic(newpic.picname, newpic.bookuniqueid, newpic.frontcover, newpic.backcover, newpic.uniqueid)
  
        writepic(file, newpic.picname)
      }  
    }else{
      println("NO PICS FOR BOOK!!!")
    }
    return true
  }

  // suspend fun savebookpics(picdata: Picdata):Boolean{

  //   //OLD IMPLEMENTATION
  //     //CALLED LIKE THIS
  //     // var picshandler = PicsHandler(picRepo)
  //     // var picssaved = picshandler.savebookpics(picdata)
  
  //     // return picssaved
  //     //FROM HTTP
  //   //
	// 	val bytearrayhandler = ByteArrayHandler()
	// 	val pics = mutableListOf<Pic>()
	
	// 	for((index, file) in picdata.files.withIndex()){
	// 		val bytefile = bytearrayhandler.converttobytearray(file)
	// 		val newpic = Pic();
	// 		newpic.picbyte = bytefile;
	// 		if(index==picdata.frontcoverindex){
	// 			newpic.frontcover=true
	// 		}else if(index==picdata.frontcoverindex){
	// 			newpic.backcover=true
	// 		}
	// 		newpic.bookuniqueid = picdata.bookuniqueid
	// 		newpic.uniqueid = picdata.bookuniqueid+"pic"+index
	// 		pics.add(newpic)
	// 	}

  //   val bookpicssaved = false;
  //   for(pic in pics){

  //     val bookuniqueid = pic.bookuniqueid;
  //     val frontcover = pic.frontcover;
  //     val backcover = pic.backcover;
  //     val uniqueid = pic.uniqueid;


  //     println("bookuniqueid: $bookuniqueid");
  //     println("frontcover: $frontcover");
  //     println("backcover: $backcover");
  //     println("uniqueid: $uniqueid");
      

  //     var picsaved:Boolean = picRepo.savebookpic(pic.picbyte, pic.bookuniqueid, pic.frontcover, pic. backcover, pic.uniqueid)
  //   }

  //   //always returns true, need to fix this
  //   return true
  // }

  suspend fun findcovers(picbookids: PicBookIds): List<Pic>{
    var coverlist = picRepo.findcoversbybookgroup(picbookids.bookids)
    return coverlist
  }

  suspend fun findimagesbybook(picbookid: PicBookId): List<Pic>{
    var piclist = picRepo.findpicsbybook(picbookid.bookid)
    return piclist
  }

  suspend fun findimagesbybook64(picbookid: PicBookId): List<Pic64>{
    var piclist = picRepo.findpicsbybook(picbookid.bookid)
    var pic64List:List<Pic64> = listOf<Pic64>()
    for(pic in piclist){
      var temp64 = Pic64()
      temp64.picname = pic.picname
      temp64.bookuniqueid = pic.bookuniqueid
      temp64.frontcover = pic.frontcover
      temp64.backcover = pic.backcover
      temp64.uniqueid = pic.uniqueid
      temp64.picbyte = picextrev(pic.picname) + retrievepic(pic.picname)
      pic64List+=temp64
    }
    return pic64List
  }
  
  suspend fun updatepics(picdata: Picdata):Boolean{
    var deletebool = deletebookpics(picdata.bookuniqueid)
    if(deletebool){
      savebookpics(picdata)
    }
    return true;
  }

} 
