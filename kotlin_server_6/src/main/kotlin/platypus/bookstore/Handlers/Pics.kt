package platypus.bookstore.handlers

import platypus.bookstore.repos.PicRepository
import platypus.bookstore.classes.db.*
import platypus.bookstore.classes.*
import kotlin.collections.mutableListOf
import platypus.bookstore.utility.*

class PicsHandler(val picRepo: PicRepository){

  suspend fun findallpics():List<Pic>
  {
    var allpics = picRepo.findallpics()
    return allpics
  }

  suspend fun deletebookpics(bookid: String):Boolean{
    var filesubstring =  bookid+"pic" 
    deleteprev(filesubstring)

    var deletedpics = picRepo.deletebybookid(bookid)
    return deletedpics
  }

  suspend fun savebookpics(picdata: Picdata):Boolean{
    println("inside savebookpics in pic handler")

    var filesubstring =  picdata.bookuniqueid+"pic" 
    deleteprev(filesubstring)

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
