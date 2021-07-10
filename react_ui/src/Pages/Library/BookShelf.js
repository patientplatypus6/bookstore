import React, {Component, useState, useEffect} from 'react';
import './library.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"

const BookShelf = () => {
  useEffect(()=>{
    console.log('window.location: ', window.location)
    console.log('window.location.pathname: ', window.location.pathname)
    console.log(window.location.pathname=="/")
  })
  return(
    <div>
      BookShelf
    </div>
  )
}

export default BookShelf;