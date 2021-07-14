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
          <div 
            style={{
              marginTop: '20px',
              fontWeight: 'bold',

            }}
          >
            {book!=null?book.title:""}
          </div>
        </div>
        <div className="sidemarginl">
          k
        </div>
        <div className="sidemarginr">
          k
        </div>
        <div className="erratbox">
          k
        </div>
        <div className="mainpics">
          k
        </div>
        <div className="blurbsbox">
          k
        </div>

        <div className="pricesbox">
          k
        </div>
      </div>
    </div>
  )
}

export default Book;