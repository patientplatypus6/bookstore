package platypus.bookstore.handlers

import platypus.bookstore.repos.PicRepository
import platypus.bookstore.classes.db.Pic
import platypus.bookstore.classes.db.PicBookId
import platypus.bookstore.classes.db.PicBookIds
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
    for((index, file) in picdata.files.withIndex()){
      var fileindexstring = filesubstring + index.toString()
      val newpic = Pic();

      newpic.picname = fileindexstring
      newpic.uniqueid = fileindexstring
      newpic.bookuniqueid = picdata.bookuniqueid
      newpic.frontcover = if(picdata.frontcoverindex == index) true else false
      newpic.backcover = if(picdata.backcoverindex == index) true else false

      var picsaved:Boolean = picRepo.savebookpic(newpic.picname, newpic.bookuniqueid, newpic.frontcover, newpic.backcover, newpic.uniqueid)

      writepic(file, fileindexstring)
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
  
  suspend fun updatepics(picdata: Picdata):Boolean{
    var deletebool = deletebookpics(picdata.bookuniqueid)
    if(deletebool){
      savebookpics(picdata)
    }
    return true;
  }

} 
