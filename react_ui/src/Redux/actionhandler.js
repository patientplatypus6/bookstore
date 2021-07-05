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
import fetchrequest from '../api/fetch'

const ActionHandler = () => {

  //REDUX SELECTORS
  
  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)

  const texts = useSelector((state)=>state.inputtext.texts)
  const titles = useSelector((state)=>state.inputtext.titles)

  const booklist = useSelector((state)=>state.booklistdb.booklist)

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
  
  const deleterevenuecost = () => {
    console.log('inside deleterevenuecost')
    dispatch(removerc())
  }

  //ACTION FUNCTIONS

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
    payload.body = {
      title: "NONE", 
      subtitle: "NONE",
      publisher: "NONE",
      currentcopyright: "NONE",
      bookedition: "NONE", 
      uniqueid: "NONE",  
      authorbio: "NONE", 
      synopsis: "NONE", 
      isbn: "NONE"
    }
    payload.requestType = "post"
    payload.uri = "book/addbook"

    var tempArray = []
    //add book values to payload
    inputtitles.forEach(inputtitle=>{
      var textindex = titles.findIndex(element=>element==inputtitle)
      if(textindex!=-1){
        if(inputtitle=='title'){
          payload.body.title=texts[textindex]
        }
        if(inputtitle=='uniqueid'){
          payload.body.uniqueid=texts[textindex]
        }
        if(inputtitle=='subtitle'){
          payload.body.subtitle=texts[textindex]
        }
        if(inputtitle=='publisher'){
          payload.body.publisher=texts[textindex]
        }
        if(inputtitle=='currentcopyright'){
          payload.body.currentcopyright=texts[textindex]
        }
        if(inputtitle=='bookedition'){
          payload.body.bookedition=texts[textindex]
        }
        if(inputtitle=='authorbio'){
          payload.body.authorbio=texts[textindex]
        }
        if(inputtitle=='synopsis'){
          payload.body.synopsis=texts[textindex]
        }
        if(inputtitle=='isbn'){
          payload.body.isbn=texts[textindex]
          var tempid = texts[textindex]+Date.now().toString();
          var stringtempid = tempid.toString()
          payload.body.uniqueid=stringtempid
        }
      }
    })

    handlefetch(payload).then(result=>{
      console.log('value of result: ', result)
      //clear book values
      inputtitles.forEach(inputtitle=>{
        var textindex = titles.findIndex(element=>element==inputtitle)
        if(textindex!=-1){
          clearText({titleindex: textindex, title: inputtitle})
        }
      })
      //add result to booklistdb
      addtobooklist(result)
    })
  }

  //BUTTON LISTENERS

  useEffect(()=>{
    console.log('inside actionhandler useeffect')
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
      if(toggleTF && buttons[index].includes("deleterevenuecost")){
        console.log('inside deleterevenuecost')
        deleterevenuecost()  
        dispatch(toggle({buttonName: buttons[index], displayName: 'Delete Revenue Cost', buttons }))     
      }
    })
  })
  
  return(
    <div/>
  )
}

export default ActionHandler;