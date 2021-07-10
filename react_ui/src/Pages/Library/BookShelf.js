import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle
} from '../../Redux/button.js'
import {arraybuffertobase64} from '../../utility/utility'

const BookShelf = () => {

  const focushandlerref = useRef(null);

  const buttons = useSelector((state) => state.button.buttons)
  const booklist = useSelector((state)=>state.booklistdb.booklist)
  const bookshelfbook = useSelector((state)=>state.downloadpicdata.bookshelfbook)
  const bookshelfcovers = useSelector((state)=>state.downloadpicdata.bookshelfcovers)

  const dispatch = useDispatch()
  const [calledBooklist, setCalledBooklist] = useState(false)
  
  useEffect(()=>{
    //call button once on page load to populate if booklist is currently empty (and has not been populated by addbook)

    var updateref = handleRef()
    
    console.log('value of booklist: ', booklist)
    // console.log('value of bookshelfcovers: ', bookshelfcovers)
    
    if(calledBooklist == false){
      setCalledBooklist(true)
      dispatch(toggle({buttonName: 'findbooks', displayName: 'Find Books', buttons}))
    }

    if(
      booklist.length>0 &&
      updateref &&
      bookshelfbook.length < booklist.length
    ){
      console.log("inside if statement in useEffect for bookshelf")
      dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
    }

    console.log('value of updateref: ', updateref)
    console.log('value of bookshelfbook: ', bookshelfbook)
    console.log('value of booklist: ', booklist)
  }, [booklist, bookshelfbook])


  const handleRef = () => {
    if(focushandlerref.current.offsetParent.offsetHeight<=window.innerHeight){
      return true
    }else{
      return false
    }
  }

  const coverhandler = () => {
    return(
      <>
        {bookshelfcovers.map((cover, key)=>{
          if (cover.picbyte == "MA=="){
            return(
              <div key={key}>
                <br/>
                {key}
                <br/>
                <br/>
                {cover.uniqueid}
                <br/>
                <img 
                  style={{height: 'auto', width: '10vw'}}
                  src={process.env.PUBLIC_URL+'/No-Image-Placeholder.svg'}
                />  
              </div>  
            )
          }else{
            let pic64 = arraybuffertobase64(cover.picbyte)
            return(
              <div key={key}>
                <br/>
                {key}
                <br/>
                <br/>
                {cover.uniqueid}
                <br/>
                <img 
                style={{height: 'auto', width: '10vw'}}
                src={pic64}/>
              </div>
            )
          }
        })}
      </>
    )
  }

  return(
    <div>
      <div
        style={{
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          textDecoration: 'underline'
        }}
      >
        BookShelf
      </div>
      <div
        style={{
          background: 'grey', 
          marginTop: '20px',
          width: '60%', 
          display: "inline-block",
          textAlign: 'center'
        }}
      >
        {coverhandler()}
      </div>
      <div ref={focushandlerref}></div>
      <div style={{marginTop: '20px', height: '1px'}}/>
    </div>
  )
}

export default BookShelf;