import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {arraybuffertobase64, sleep} from '../../utility/utility'

import{
  clearbooklistdb,
  modifybooklistdb
} from '../../Redux/booklistDB'
import {
  updatebookshelfcovers,
  cleanbookshelfcovers
} from '../../Redux/downloadpicdata'

import Button from '../../Components/SubComponents/Button/Button'

import fetchrequest from '../../api/fetch'

const BookShelf = () => {

  const focushandlerref = useRef(null);
  const containerref = useRef(null);
  const booklistcleared = useSelector((state)=>state.downloadpicdata.booklistcleared)

  const [bookidMain, setBookidMain] = useState([])

  const [booklist, setBookList] = useState([])
  const [bookshelfcovers, setBookshelfcovers] = useState([])

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);



  const dispatch = useDispatch()

  //handle fetch

  const handlefetch = (payload) => {
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }
  

  //helper functions

  const addtobooklist = (payload) => {
    dispatch(modifybooklistdb(payload))
  }

  //callable functions

  const findcovers2 = (bookidslice) => {

    var payload = {}
    payload.uri='pic/findcovers' 
    payload.requestType='post'   
    payload.body = {}
    payload.body.bookids = bookidslice

    console.log('80808080value of bookidslice: ', bookidslice)

    handlefetch(payload).then(result=>{
      setBookidMain(bookidMain.slice(1))
      // dispatch(updatebookshelfcovers({bookshelfcovers:result}))

      var tempbookshelfcovers = bookshelfcovers
      for(var i = 0; i < result.length; i++){
        tempbookshelfcovers.push(result[i])
        if(i==result.length-1){
          console.log('80808080value of result: ', result)
          console.log('80808080value of i: ', i)
          setBookshelfcovers(tempbookshelfcovers)
        }
      }
    })
  }

  const findbooks = () => {
    var payload = {}
    payload.uri='book/findbooks' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      setBookList(result)
    })
  }

  const findcovers = () => {

    var bookid = []
    if(booklist.length > 0){
      var i = 0
      var catlength = 1
      var tempbookid = []
      do{
        tempbookid.push(booklist[i]['uniqueid'])
        if(i % catlength == catlength - 1 || i == booklist.length - 1){
          bookid.push(tempbookid)
          tempbookid = []
        }
        i++
      }while(i < booklist.length)

      console.log("*(*(*((**value of bookid: ", bookid)
  
      setBookidMain(bookid)

    }
  }

  useEffect(()=>{
    if(bookidMain.length>0)
    findcovers2(bookidMain[0])
  }, [bookidMain])

  useEffect(()=>{
    findcovers()
  }, [booklist])

  useEffect(()=>{
    findbooks()
  }, [])

  const coverhandler = () => {
    return(
      <>
        {booklist.length>0?bookshelfcovers.map((cover)=>{
          console.log("%%%bookuniqueid: ", cover)
          console.log(booklist)
          var bookrow = booklist.find(element=>element.uniqueid==cover.bookuniqueid)
          var title = bookrow.title
          if (cover.picbyte == "MA=="){
            return(
              <div key={cover.bookuniqueid}>
                <table style={{width: '100%'}}>
                  <br/>
                  <tr
                    style={{fontWeight: 'bold', fontSize: '1.25rem', fontStyle: 'italic'}}
                  >
                    {title}
                  </tr>
                  <tr>
                    {cover.bookuniqueid}
                  </tr>
                  <br/>
                  <tr>
                    <tc  style={{padding: '5px'}}>
                      <img 
                        style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
                        src={process.env.PUBLIC_URL+'/No-Image-Placeholder.svg'}
                      />  
                    </tc>
                    <tc  style={{padding: '5px'}}>
                      <Button 
                        buttonName='viewbook'
                        displayName="View Book"
                      />
                    </tc>
                  </tr>
                </table>
              </div>  
            )
          }else{
            console.log("%%%inside else")
            console.log("%%%bookuniqueid: ", cover)
            return(
              <div key={cover.bookuniqueid}>
                <table style={{width: '100%'}}>
                  <br/>
                  <tr
                    style={{fontWeight: 'bold', fontSize: '1.25rem', fontStyle: 'italic'}}
                  >
                    {title}
                  </tr>
                  <tr>
                    {cover.bookuniqueid}
                  </tr>
                  <br/>
                  <tr style={{}}>
                    <tc style={{padding: '5px', display: 'inline-block', verticalAlign: 'top'}}>
                      {/* <td> */}
                        <img 
                        style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
                        src={arraybuffertobase64(cover.picbyte)}/>    
                      {/* </td>                   */}
                    </tc>
                    <tc style={{padding: '5px', display: 'inline-block', verticalAlign: 'top'}}>
                      {/* <td> */}
                        <Button 
                          buttonName='viewbook'
                          displayName="View Book"
                        />  
                      {/* </td>                     */}
                    </tc>
                  </tr>
                </table>
              </div>
            )
          }
        }):<div/>}
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