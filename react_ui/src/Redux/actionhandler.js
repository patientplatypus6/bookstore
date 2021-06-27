import React, {Component, useState, useEffect} from 'react';
// import './admin.css'
import { observer} from "mobx-react-lite";
import { toJS } from "mobx"
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
import fetchrequest from '../api/fetch'

const ActionHandler = () => {

  const dispatch = useDispatch()
  
  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)

  const texts = useSelector((state)=>state.inputtext.texts)
  const titles = useSelector((state)=>state.inputtext.titles)

  const handlefetch = (payload) => {
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }

  const clearText = (payload) => {
    dispatch(clear(payload))
  }

  const addbook = () => {
    var inputtitles = ['booktitle']
    var payload = {}
    payload.body = {}
    payload.requestType = "post"
    payload.uri = "addbook"

    //add book values to payload
    inputtitles.forEach(inputtitle=>{
      var textindex = titles.findIndex(element=>element==inputtitle)
      if(textindex!=-1){
        payload.body.title = texts[textindex]
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
    })
  }
  
  const addrevenuecost = () => {
    console.log('inside addrevenuecost')
    dispatch(addrc())
  }

  useEffect(()=>{
    console.log('inside actionhandler useeffect')
    toggles.forEach((toggleTF, index)=>{
      if(toggleTF && buttons[index]=='addbook'){
        addbook()  
        dispatch(toggle({buttonName: 'addbook', displayName:'Add Book', buttons }))     
      }
      if(toggleTF && buttons[index]=='addrevenuecost'){
        addrevenuecost()  
        dispatch(toggle({buttonName: 'addrevenuecost', displayName: 'Add Revenue Cost', buttons }))     
      }
    })
  })
  
  return(
    <div/>
  )
}

export default ActionHandler;