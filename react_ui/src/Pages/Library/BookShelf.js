import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle
} from '../../Redux/button.js'
import {arraybuffertobase64} from '../../utility/utility'

const BookShelf = () => {

  const focushandlerref = useRef(null);
  const containerref = useRef(null);

  const buttons = useSelector((state) => state.button.buttons)
  const booklist = useSelector((state)=>state.booklistdb.booklist)
  const bookshelfbook = useSelector((state)=>state.downloadpicdata.bookshelfbook)
  const bookshelfcovers = useSelector((state)=>state.downloadpicdata.bookshelfcovers)

  const dispatch = useDispatch()
  const [calledBooklist, setCalledBooklist] = useState(false)
  const [calledFindcovers, setcalledFindcovers] = useState(false)
  const [updateScroll, setUpdateScroll] = useState(false)
  
  useEffect(()=>{

    window.addEventListener('scroll', handleRef)
    
    if(calledBooklist == false){
      setCalledBooklist(true)
      dispatch(toggle({buttonName: 'findbooks', displayName: 'Find Books', buttons}))
    }

    // if(
    //   booklist.length > 0 &&
    //   !calledFindcovers &&
    //   bookshelfbook.length < booklist.length
    // ){
    //   console.log("inside if statement in useEffect for bookshelf")
      
    //   dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
    // }

    // console.log(" containerref.innerHeight<window.innerHeight: ",  containerref.innerHeight<window.innerHeight)
    
    // console.log("containerref.current.clientHeight: " ,containerref.current.clientHeight)

    // console.log("window.innerHeight: " ,window.innerHeight)

    

    // console.log("booklist.length > 0: ",  booklist.length > 0)
    // console.log(" bookshelfbook.length < booklist.length: ",  bookshelfbook.length < booklist.length)

    console.log("document.documentElement.scrollHeight: ", document.documentElement.scrollHeight)
    console.log("window.innerHeight: ", window.innerHeight)

    if(
      (containerref.current.clientHeight<window.innerHeight) &&
      booklist.length > 0 &&
      bookshelfbook.length < booklist.length
    ){
      console.log('inside containerref if statement: ')
      dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
    }

    // do{
    //   if(
    //     containerref.innerHeight<window.innerHeight &&
    //     booklist.length > 0 &&
    //     bookshelfbook.length < booklist.length
    //   ){
    //     dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
    //   }else{
    //     setcalledFindcovers(true)
    //   }
    // }while(!calledFindcovers)

    return function cleanup(){
      window.removeEventListener("scroll", handleRef)
    }

  }, [booklist, bookshelfbook])


  const handleRef = () => {
    if(
      focushandlerref.current.offsetParent.offsetHeight
      <=(window.innerHeight+window.scrollY+100)
      &&
      bookshelfbook.length < booklist.length
    ){
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