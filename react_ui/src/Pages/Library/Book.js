import React, {Component, useState, useEffect} from 'react';
import './library.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"

import { useHistory } from "react-router-dom";
import fetchrequest from '../../api/fetch'
import './book.css'

const Book = () => {
  let history = useHistory();

  const [book, setBook] = useState(null)

  useEffect(()=>{
    console.log('value of book: ', book)
  }, [book])

  useEffect(()=>{
    if(history!=undefined && history.location!=null && history.location.book!=null & history.location.book!=undefined){
      console.log("value of history: ", history)
      setBook(history.location.book)
    }
  }, [])

  return(
    <div>
      <div className="wrapper">
        <div className="titlebox">
          <h2 style={{lineHeight: '1rem'}}>
            {book!=null?book.title:""}
          </h2>
          <p>
            {book!=null?book.author:""}
          </p>
        </div>
        <div className="sidemarginl">
          
        </div>
        <div className="sidemarginr">
          
        </div>
        <div className="erratbox">
          <div 
            style={{
              display: 'flex', 
              flexDirection: 'row', 
              width: '100%', 
              height: '100%',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                flex: 1, 

              }}
            >
              {book!=null?book.publisher:""}
            </div>
            <div
              style={{
                flex: 1
              }}
            >
              {book!=null?book.edition:""}
            </div>
            <div
              style={{
                flex: 1
              }}
            >
              {book!=null?book.currentcopyright:""}
            </div>
            <div
              style={{
                flex: 1
              }}
            >
              {book!=null?book.isbn:""}
            </div>
            <div
              style={{
                flex: 1
              }}
            />
          </div>
        </div>
        <div className="mainpics">
          <div className='roundedcontainer'>
          </div> 
        </div>
        <div className="allpicsb">
          
        </div>
        <div className="artistbox">
          
        </div>
        <div className="synopsisb">
          
        </div>
        <div className="pricesbox">
          
        </div>
        <div className="condition">
          
        </div>
      </div>
    </div>
  )
}

export default Book;