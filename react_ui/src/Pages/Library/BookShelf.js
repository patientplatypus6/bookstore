import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggle
} from '../../Redux/button.js'
import {arraybuffertobase64, sleep} from '../../utility/utility'
import ActionHandlerFunctions
from '../../Redux/actionhandlerfunctions'

import{
  modifybooklistdb,
  clearbooklistdb
} from '../../Redux/booklistDB'
import {
  setuniquebooks, 
  updatebookshelfcovers,
  cleanbookshelfcovers,
  setupdatednewbooks
} from '../../Redux/downloadpicdata'

import fetchrequest from '../../api/fetch'

const BookShelf = () => {

  const focushandlerref = useRef(null);
  const containerref = useRef(null);

  const buttons = useSelector((state) => state.button.buttons)
  const booklist = useSelector((state)=>state.booklistdb.booklist)
  const booklistupdated = useSelector((state)=>state.booklistdb.booklistupdated)
  const bookshelfbook = useSelector((state)=>state.downloadpicdata.bookshelfbook)
  const bookshelfcovers = useSelector((state)=>state.downloadpicdata.bookshelfcovers)
  const coversupdatedtime = useSelector((state)=>state.downloadpicdata.coversupdatedtime)

  const bookshelfdownloadmax = useSelector((state)=>state.downloadpicdata.bookshelfdownloadmax)

  const newbooks = useSelector((state)=>state.downloadpicdata.newbooks)

  const downloadpicdata = useSelector((state)=>state.downloadpicdata)

  const dispatch = useDispatch()
  const [calledBooklist, setCalledBooklist] = useState(false) 
  const [updateScroll, setUpdateScroll] = useState(false)
  const [updateStatic, setUpdateStatic] = useState(false)

  const [picLength, setPicLength] = useState(0)

  const [dispatched, setDispatched] = useState("")
  const [dispatchTime, setDispatchTime] = useState(false)


  //handle fetch

  const handlefetch = (payload) => {
    console.log('inside handlefetch and value of payload: ', payload)
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }

  //helper functions

  const addtobooklist = (payload) => {
    console.log('inside addtobooklist and value of payload: ', payload)
    dispatch(modifybooklistdb(payload))
  }

  //callable functions

  const findcovers2 = (bookidslice) => {

    console.log("inside findcovers2 and value of bookidslice: ", bookidslice)

    var payload = {}
    payload.uri='pic/findcovers' 
    payload.requestType='post'   
    payload.body = {}
    payload.body.bookids = bookidslice

    console.log("inside findcovers2 and value of payload: ", payload)

    handlefetch(payload).then(result=>{
      console.log('value of result from findcovers2: ', result)
      // console.log('value of bookshelfcovers: ', bookshelfcovers)
      dispatch(updatebookshelfcovers({bookshelfcovers:result}))
    })
  }

  const findbooks = () => {
    var payload = {}
    payload.uri='book/findbooks' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      addtobooklist(result)
    })
  }

  const findcovers = () => {

    var bookid = []
    if(booklist.length > 0){
      console.log('value of booklist: ', booklist)
      var i = 0
      var catlength = 3
      var tempbookid = []
      do{
        tempbookid.push(booklist[i]['uniqueid'])
        if(i % catlength == catlength - 1 || i == booklist.length - 1){
          bookid.push(tempbookid)
          tempbookid = []
        }
        i++
      }while(i < booklist.length)
  
      console.log('bookid: ', bookid)

      // findcovers2(bookid[0])

      bookid.forEach(bi =>{
        findcovers2(bi)
      })

    }

    // findcovers2(bookid)

    // console.log('value of bookid: ', bookid)

    // console.log("value of bookid : ", bookid)

    // var iterateby = 3;

    // const slwhandler = (np, n) => {
    //   // console.log("&&&&&&&&&&&&&&&&&&&&&")
    //   // console.log("n: ", n)
    //   // console.log("np: ", np)
    //   // console.log('value of booklist: ', booklist)
    //   // console.log("bookid.length: ", bookid.length)
    //   // console.log('value of bookid: ', bookid)
    //   // console.log("bookid.slice(np, n): ", bookid.slice(np, n))
    //   // console.log("&&&&&&&&&&&&&&&&&&&&&")

    //   console.log("&&&&&&&&&&&&&&&&&&&&&")
    //   console.log("&&&&value of bookid: ", bookid)
    //   console.log("&&&&value n: ", n)
    //   console.log("&&&&value np: ", np)
    //   console.log("&&&&value of bookid.slice(np, n): ", bookid.splice(np,n))
    //   console.log("&&&&&&&&&&&&&&&&&&&&&")


    //   findcovers2(bookid.slice(np, n))
    //   setTimeout(() => {
    //     np+=iterateby;
    //     n+=iterateby;
    //     // if(n<bookid.length+1){
    //     //   slwhandler(np+iterateby, n+iterateby)
    //     // }
    //     if(n>bookid.length && np<bookid.length){
    //       slwhandler(np, bookid.length)
    //     }
    //     if(n<bookid.length && np<bookid.length){
    //       slwhandler(np, bookid.length+1)
    //     }
    //   }, 10);
    // }
    // slwhandler(0, 1)

  }


  useEffect(()=>{
    findcovers()
  }, [booklist])

  
  useEffect(()=>{
    findbooks()
    return function cleanup(){
      var payload = []
      dispatch(modifybooklistdb(payload))
      dispatch(cleanbookshelfcovers())
    }
  }, [])

  const handleRef = () => {
    if(
      focushandlerref.current.getBoundingClientRect().top<window.innerHeight+100 &&
      booklist.length > 0
    ){
      findcovers()
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

   // window.addEventListener('scroll',()=>{
    //   if(window.scrollY + window.innerHeight >= 
    //   document.documentElement.scrollHeight){
    //     if(
    //       bookshelfbook.length < booklist.length && 
    //       !updateScroll
    //     ){
    //       setUpdateScroll(true)
    //       dispatch(toggle({buttonName: 'findcovers', displayName: 'Find Covers', buttons}))
    //     }
    //   }
    // })

    // if(updateScroll){
    //   const timeoutcallbackScroll = () => {
    //     if(focushandlerref.current.getBoundingClientRect().top>=window.innerHeight+window.scrollY+100){
    //       setUpdateScroll(false)
    //     }else{
    //       setTimeout(() => {
    //         timeoutcallbackScroll()
    //       }, 10);
    //     }
    //   }
    //   timeoutcallbackScroll()
    // }


