
import React, {Component, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import fetchrequest from '../api/fetch'

import{
  modifybooklistdb,
  clearbooklistdb
} from './booklistDB'

const ActionHandlerFunctions = (props) => {
  //HANDLEFETCH

  const handlefetch = (payload) => {
    console.log('inside handlefetch and value of payload: ', payload)
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }

  //helper functions

  const Addtobooklist = (payload) => {
    console.log('inside addtobooklist and value of payload: ', payload)
    return useDispatch(modifybooklistdb(payload))
  }

  //callable functions

  const Findbooks = () => {
    var payload = {}
    payload.uri='book/findbooks' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      return Addtobooklist(result)
    })
  }

  const findcovers = () => {
    
  }

  const findcovers2 = () => {
    
  }

  return <div/>

}



export default ActionHandlerFunctions