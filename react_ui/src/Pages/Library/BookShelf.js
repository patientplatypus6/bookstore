import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle
} from '../../Redux/button.js'

const BookShelf = () => {

  const focushandlerref = useRef(null);

  const buttons = useSelector((state) => state.button.buttons)
  const booklist = useSelector((state)=>state.booklistdb.booklist)
  const bookshelfbook = useSelector((state)=>state.downloadpicdata.bookshelfbook)
  const dispatch = useDispatch()
  const [calledBooklist, setCalledBooklist] = useState(false)
  
  useEffect(()=>{
    //call button once on page load to populate if booklist is currently empty (and has not been populated by addbook)
    
    console.log('value of booklist: ', booklist)
    
    if(calledBooklist == false){
      setCalledBooklist(true)
      dispatch(toggle({buttonName: 'findbooks', displayName: 'Find Books', buttons}))
    }

    console.log("^^^^^^^^^")
    console.log("^^^^^^^^^")
    console.log("^^^^^^^^^")
    console.log('testing conditions: ')
    console.log("booklist.length>0: ", booklist.length>0)
    console.log("focushandlerref.current.offsetParent.offsetHeight<=window.innerHeight: ", focushandlerref.current.offsetParent.offsetHeight<=window.innerHeight)
    console.log(" bookshelfbook.length < booklist.length: ",  bookshelfbook.length < booklist.length)
    console.log("bookshelfbook.length: ", bookshelfbook.length)
    console.log('booklist.length: ',  booklist.length)
    console.log("^^^^^^^^^")
    console.log("^^^^^^^^^")
    console.log("^^^^^^^^^")

    if(
      booklist.length>0 &&
      focushandlerref.current.offsetParent.offsetHeight<=window.innerHeight &&
      bookshelfbook.length < booklist.length
    ){
      console.log("inside if statement in useEffect for bookshelf")
      dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
    }
  }, [booklist, bookshelfbook])

  return(
    <div>
      BookShelf
      <div ref={focushandlerref}></div>
    </div>
  )
}

export default BookShelf;