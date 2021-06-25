import React, {Component, useState, useEffect} from 'react';
// import './admin.css'
import { observer} from "mobx-react-lite";
import { toJS } from "mobx"
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle
} from './button'
import {
  modify
} from './inputtext'
import fetchrequest from '../api/fetch'


const ActionHandler = () => {

  const dispatch = useDispatch()
  
  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)

  const texts = useSelector((state)=>state.inputtext.texts)
  const titles = useSelector((state)=>state.inputtext.titles)

  const handlefetch = (payload, buttonName) => {
    console.log('inside handlefetch and value of payload: ', payload)
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      dispatch(toggle({buttonName, buttons}))
    }
    fetchasync();
  }

  const addbook = () => {
    var inputtitles = ['booktitle']
    var payload = {}
    inputtitles.forEach(inputtitle=>{
      var textindex = titles.findIndex(element=>element==inputtitle)!=-1
      if(textindex){
        payload.inputtitle = texts[textindex]
      }
    })
    handlefetch(payload, {buttonName: 'addbutton'})
  }  

  useEffect(()=>{
    console.log('inside actionhandler useeffect')
    toggles.forEach((toggleTF, index)=>{
      console.log('value of toggleindex; ', index)
      console.log("value of toggleTF: ", toggleTF)
      if(toggleTF && buttons[index]=='addbook'){
        addbook()        
      }
    })
  })
  
  return(
    <div/>
  )
}

export default ActionHandler;