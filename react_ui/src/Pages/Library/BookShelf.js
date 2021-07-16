import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {arraybuffertobase64, sleep} from '../../utility/utility'

import {fetchrequest, handlefetch} from '../../api/fetch'
import { useHistory } from "react-router-dom";

const BookShelf = () => {

  const focushandlerref = useRef(null);
  const containerref = useRef(null);

  const [bookshelfbooks, setBookshelfbooks] = useState([])

  const [shippingprice, setShippingprice] = useState([])
  const [bookprice, setBookprice] = useState([])

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [coverlist, setCoverlist] = useState([])

  let history = useHistory();

  const findbooks = () => {
    var payload = {}
    payload.uri='book/findbookshelfbooks' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      console.log("value of result: ", result)
      setBookshelfbooks(result)
    })
  }

  useEffect(()=>{
    findbooks()
  }, [])

  const coverhandler = () => {
    return(
      <>
        {bookshelfbooks.length==0?
          <div>
            <img 
              style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
              src={process.env.PUBLIC_URL+'/loading.gif'}
            />  
          </div>
        :<div/>}
        {bookshelfbooks.map((book)=>{
          if (book.picnamefront == ""){
            return(
              <div key={book.bookuniqueid}>
                <table style={{width: '100%', background: "lightorange"}}>
                  <tbody style={{background: "lightorange"}}>
                    <br/>
                    <tr
                      style={{fontWeight: 'bold', fontSize: '1.25rem', fontStyle: 'italic'}}
                    >
                      {book.title}
                    </tr>
                    <tr style={{background: 'lightorange'}}>
                      <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top'}}>
                        <img 
                          style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
                          src={process.env.PUBLIC_URL+'/No-Image-Placeholder.svg'}
                        />  
                      </div>
                      <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top', width: "25vw", background: "lightblue", borderRadius: '5px'}}>
                        <div>
                          <div>
                            Book Price  -  {book.userprice}
                          </div>
                          <div>
                            Shipping Price - {book.usershipping}
                          </div>
                          <div>
                            Total Price - {parseFloat(book.userprice)+parseFloat(book.usershipping)}
                          </div>
                        </div>
                        <div
                          className='button'
                          onClick={()=>{
                            history.push({
                              pathname: '/book',
                              book
                            })
                          }}
                        >
                          View Book
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>  
            )
          }else{
            return(
              <div key={book.bookuniqueid}>
                <table style={{width: '100%'}}>
                  <tbody>
                    <br/>
                    <tr
                      style={{fontWeight: 'bold', fontSize: '1.25rem', fontStyle: 'italic'}}
                    >
                      {book.title}
                    </tr>
                    <tr style={{}}>
                      <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top'}}>
                        <img 
                        style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
                        src={`http://localhost:8080/images/${book.picnamefront}`}/>    
                      </div>
                      <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top', width: "25vw", background: "lightblue", borderRadius: '5px'}}>
                        <div>
                          <div>
                            Book Price  -  {book.userprice}
                          </div>
                          <div>
                            Shipping Price  -  {book.usershipping}
                          </div>
                          <div>
                            Total Price - {parseFloat(book.userprice)+parseFloat(book.usershipping)}
                          </div>
                        </div>
                        <div
                          className='button'
                          onClick={()=>{
                            history.push({
                              pathname: '/book',
                              book
                            })
                          }}
                        >
                          View Book
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
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