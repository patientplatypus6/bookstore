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
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
    }
    fetchasync();
  }

  const addbook = () => {
    var inputtitles = ['booktitle']
    var payload = {}
    inputtitles.forEach(inputtitle=>{
      var textindex = titles.findIndex(element=>element==inputtitle)
      if(textindex!=-1){
        payload.inputtitle = texts[textindex]
      }
    })
    handlefetch(payload, {buttonName: 'addbutton'})
  }  

  useEffect(()=>{
    console.log('inside actionhandler useeffect')
    toggles.forEach((toggleTF, index)=>{
      if(toggleTF && buttons[index]=='addbook'){
        addbook()  
        dispatch(toggle({buttonName: 'addbook', buttons }))     
      }
    })
  })
  
  return(
    <div/>
  )
}

export default ActionHandler;