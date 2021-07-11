import React, {Component, useState, useEffect} from 'react';
// import './admin.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle
} from './button'
import {
  modify, 
  clear
} from './inputtext'
import{
  addrc,
  removerc,
  modifyrc
} from './revenuecost'
import{
  modifybooklistdb,
  clearbooklistdb
} from './booklistDB'
import{
  clearuploadpicdata
} from './uploadpicdata'
import {
  setuniquebooks, 
  updatebookshelfcovers,
  setupdatednewbooks
} from './downloadpicdata'

import fetchrequest from '../api/fetch'
import {arraybuffertobase64} from '../utility/utility'

const ActionHandler = () => {

  //REDUX SELECTORS
  
  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)

  const texts = useSelector((state)=>state.inputtext.texts)
  const titles = useSelector((state)=>state.inputtext.titles)

  const booklist = useSelector((state)=>state.booklistdb.booklist)
  const uploadpicdata = useSelector((state)=>state.uploadpicdata)

  const downloadpicdata = useSelector((state)=>state.downloadpicdata)
  const bookshelfbook = useSelector((state)=>state.downloadpicdata.bookshelfbook)

  //pulling all value of revenuecost
  const revenuecost = useSelector((state)=>state.revenuecost)

  const bookshelfcovers = useSelector((state)=>state.downloadpicdata.bookshelfcovers)

  //HANDLEFETCH

  const handlefetch = (payload) => {
    console.log('inside handlefetch and value of payload: ', payload)
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }

  //DISPATCHES

  const dispatch = useDispatch()

  const clearText = (payload) => {
    dispatch(clear(payload))
  }

  const addtobooklist = (payload) => {
    console.log('inside addtobooklist and value of payload: ', payload)
    dispatch(modifybooklistdb(payload))
  }

  const addrevenuecost = () => {
    console.log('inside addrevenuecost')
    dispatch(addrc())
  }
  
  const deleterevenuecost = (rcbuttonname) => {
    let indexval = parseInt(rcbuttonname.replace('deleterevenuecost', ''))
    let revenuecostcopy = {...revenuecost}
    let newrevenuecost = {
      rcnames: [], 
      rcdescriptions: [], 
      rcvalues: [], 
      rcdates: [], 
      indexvals: []
    }
    let deleteindex = revenuecostcopy.indexvals.findIndex(element=>element==indexval)
    revenuecost.indexvals.map((rc,index)=>{
      if(index!=deleteindex){
        newrevenuecost.rcnames.push(revenuecost.rcnames[index])
        newrevenuecost.rcdescriptions.push(revenuecost.rcdescriptions[index])
        newrevenuecost.rcvalues.push(revenuecost.rcvalues[index])
        newrevenuecost.rcdates.push(revenuecost.rcdates[index])
        newrevenuecost.indexvals.push(revenuecost.indexvals[index])
      }
    })
    dispatch(removerc(newrevenuecost))
  }

  //ACTION FUNCTIONS

  const findcovers2 = () => {
    var payload = {}
    payload.uri='pic/findcovers' 
    payload.requestType='post'   
    payload.body = {}
    payload.body.bookids = downloadpicdata.newbooks 

    console.log("inside findcovers2 and value of payload: ", payload)

    handlefetch(payload).then(result=>{
      console.log('value of result from findcovers2: ', result)
      // console.log('value of bookshelfcovers: ', bookshelfcovers)
      dispatch(updatebookshelfcovers({bookshelfcovers:result}))
    })
  }

  const findcovers = () => {

    var newbooks = []

    for(var i = 0; i < downloadpicdata.bookshelfdownloadmax; i++){
      var modindex = i + downloadpicdata.bookshelfbook.length
      if(booklist[modindex]!=undefined){
        newbooks.push(booklist[modindex]['uniqueid'])
      }else{
        i = downloadpicdata.bookshelfdownloadmax
      }
    }

    var bookshelfbook = downloadpicdata.bookshelfbook.concat(newbooks)

    var payload = {
      bookshelfbook,
      newbooks
    }

    // console.log("^^^^^^^^^^^^^^")
    // console.log("^^^^^^^^^^^^^^")
    // console.log("^^^^^^^^^^^^^^")

    // console.log('value of payload in findcovers: ', payload)

    // console.log("^^^^^^^^^^^^^^")
    // console.log("^^^^^^^^^^^^^^")
    // console.log("^^^^^^^^^^^^^^")

    dispatch(setuniquebooks(payload))

  }

  const findbooks = () => {
    var payload = {}
    payload.uri='book/findbooks' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      addtobooklist(result)
    })
  }

  const addbook = () => {
    var inputtitles = ['title', 'uniqueid', 'subtitle', 'publisher', 'currentcopyright', 'bookedition', 'authorbio', 'synopsis', 'isbn']
    var payload = {}
    var picturepayload = {
      body: {}
    }
    payload.body = {
      book: {
        title: "NONE", 
        subtitle: "NONE",
        publisher: "NONE",
        currentcopyright: "NONE",
        bookedition: "NONE", 
        uniqueid: "NONE",  
        authorbio: "NONE", 
        synopsis: "NONE", 
        isbn: "NONE",
      },
      revenuecost: []
    }

    payload.body.book.uniqueid="DEFAULT" + Date.now()
    picturepayload.body.bookuniqueid = "DEFAULT" + Date.now()

    payload.requestType = "post"
    payload.uri = "book/addbook"
  
    // var tempArray = []
    //add book values to payload
    inputtitles.forEach(inputtitle=>{
      var textindex = titles.findIndex(element=>element==inputtitle)
      if(textindex!=-1){
        if(inputtitle=='title'){
          payload.body.book.title=texts[textindex]
        }
        if(inputtitle=='subtitle'){
          payload.body.book.subtitle=texts[textindex]
        }
        if(inputtitle=='publisher'){
          payload.body.book.publisher=texts[textindex]
        }
        if(inputtitle=='currentcopyright'){
          payload.body.book.currentcopyright=texts[textindex]
        }
        if(inputtitle=='bookedition'){
          payload.body.book.bookedition=texts[textindex]
        }
        if(inputtitle=='authorbio'){
          payload.body.book.authorbio=texts[textindex]
        }
        if(inputtitle=='synopsis'){
          payload.body.book.synopsis=texts[textindex]
        }
        if(inputtitle=='isbn'){
          payload.body.book.isbn=texts[textindex]
          var tempid = texts[textindex]+Date.now().toString();
          var stringtempid = tempid.toString()
          payload.body.book.uniqueid=stringtempid
          picturepayload.body.bookuniqueid = stringtempid
          console.log("%%%%%%%%%%%%%%%%%%")
          console.log("%%%%%%%%%%%%%%%%%%")
          console.log("%%%%%%%%%%%%%%%%%%")

          console.log("payload.body.book.uniqueid: ", payload.body.book.uniqueid)
          console.log("picturepayload.body.bookuniqueid: ", picturepayload.body.bookuniqueid)

          console.log("%%%%%%%%%%%%%%%%%%")
          console.log("%%%%%%%%%%%%%%%%%%")
          console.log("%%%%%%%%%%%%%%%%%%")
        }
      }
    })

    var revenuecostpayload = [];
    revenuecost.indexvals.forEach((indexval, index)=>{
      revenuecostpayload.push({
        rcname: revenuecost['rcnames'][index], 
        rcdescription: revenuecost['rcdescriptions'][index],
        rcvalue: revenuecost['rcvalues'][index],
        rcdate: revenuecost['rcdates'][index], 
        bookuniqueid: payload.body.book.uniqueid,
        uniqueid: revenuecost['rcnames'][index]+indexval.toString()
      })
    })

    payload.body.revenuecost = revenuecostpayload

    handlefetch(payload).then(result=>{
      console.log('value of result: ', result)
      //clear book values
      inputtitles.forEach(inputtitle=>{
        var textindex = titles.findIndex(element=>element==inputtitle)
        if(textindex!=-1){
          clearText({titleindex: textindex, title: inputtitle})
        }
      })

      let newrevenuecost = {
        rcnames: [], 
        rcdescriptions: [], 
        rcvalues: [], 
        rcdates: [], 
        indexvals: []
      }
      dispatch(removerc(newrevenuecost))

      //upload pictures

      picturepayload.body.frontcoverindex = uploadpicdata.frontcoverindex

      picturepayload.body.backcoverindex = uploadpicdata.backcoverindex

      picturepayload.requestType = "post"
      picturepayload.uri = "book/addpics"

      picturepayload.body.files = uploadpicdata.files

      console.log('value of picturepayload: ', picturepayload)

      handlefetch(picturepayload).then(result=>{
        console.log('result from imagepost in actionhandler: ', result)
        dispatch(clearuploadpicdata())
        // result.files.forEach(file=>{
        //   console.log('value of file in forEach: ', file)
        //   let arraybuf = arraybuffertobase64(file)
        //   console.log('value of arraybuf: ', arraybuf)
        // })
      })


    })


  }


  useEffect(()=>{
    console.log('inside actionhandler useeffect')

    //BUTTON LISTENERS

    toggles.forEach((toggleTF, index)=>{
      if(toggleTF && buttons[index]=='addbook'){
        addbook()  
        dispatch(toggle({buttonName: 'addbook', displayName:'Add Book', buttons }))     
      }
      if(toggleTF && buttons[index]=='findbooks'){
        findbooks()  
        dispatch(toggle({buttonName: 'findbooks', displayName:'Find Books', buttons }))     
      }
      if(toggleTF && buttons[index]=='addrevenuecost'){
        addrevenuecost()  
        dispatch(toggle({buttonName: 'addrevenuecost', displayName: 'Add Revenue Cost', buttons }))     
      }
      if(toggleTF && buttons[index]=='findcovers'){
        findcovers()
        dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
      }
      if(toggleTF && buttons[index].includes("deleterevenuecost")){
        console.log('inside deleterevenuecost')
        deleterevenuecost(buttons[index])  
        dispatch(toggle({buttonName: buttons[index], displayName: 'Delete Revenue Cost', buttons }))     
      }
    })

    // if (downloadpicdata.updatednewbooks == true){
    //   var payload = {
    //     updatednewbooks: false
    //   }
    //   findcovers2()
    //   dispatch(setupdatednewbooks(payload))
    // }
  }, [toggles])
  
  return(
    <div/>
  )
}

export default ActionHandler;