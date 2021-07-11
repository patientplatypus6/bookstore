import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle
} from '../../Redux/button.js'
import {arraybuffertobase64, sleep} from '../../utility/utility'

const BookShelf = () => {

  const focushandlerref = useRef(null);
  const containerref = useRef(null);

  const buttons = useSelector((state) => state.button.buttons)
  const booklist = useSelector((state)=>state.booklistdb.booklist)
  const bookshelfbook = useSelector((state)=>state.downloadpicdata.bookshelfbook)
  const bookshelfcovers = useSelector((state)=>state.downloadpicdata.bookshelfcovers)

  const dispatch = useDispatch()
  const [calledBooklist, setCalledBooklist] = useState(false)
  const [updateScroll, setUpdateScroll] = useState(false)

  
  useEffect(()=>{

    window.addEventListener('scroll', handleRef)
    handleRef()

    if(calledBooklist == false){
      setCalledBooklist(true)
      dispatch(toggle({buttonName: 'findbooks', displayName: 'Find Books', buttons}))
    }

    if(updateScroll){
      const timeoutcallback = () => {
        if(focushandlerref.current.getBoundingClientRect().top>=window.innerHeight+100){
          setUpdateScroll(false)
        }else{
          setTimeout(() => {
            timeoutcallback()
          }, 10);
        }
      }
      timeoutcallback()
    }
    
    return function cleanup(){
      window.removeEventListener("scroll", handleRef)
    }

  }, [booklist, updateScroll])

  const handleRef = () => {

    if(
      focushandlerref.current.getBoundingClientRect().top<window.innerHeight+100 &&
      bookshelfbook.length < booklist.length && 
      !updateScroll
    ){
      setUpdateScroll(true)
      dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
    }
  }

  const coverhandler = () => {
    return(
      <>
        {bookshelfcovers.map((cover, key)=>{
          if (cover.picbyte == "MA=="){
            return(
              <div key={key}>
                <img 
                  style={{height: 'auto', width: '40vh', marginBottom: '10px'}}
                  src={process.env.PUBLIC_URL+'/No-Image-Placeholder.svg'}
                />  
              </div>  
            )
          }else{
            let pic64 = arraybuffertobase64(cover.picbyte)
            return(
              <div key={key}>
                <img 
                style={{height: 'auto', width: '40vh', marginBottom: '10px'}}
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
        ref={containerref}
        style={{
          background: 'grey', 
          minHeight: '1px',
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