import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import './bookshelf.css'
import { useSelector, useDispatch } from 'react-redux'
import {arraybuffertobase64, sleep} from '../../utility/utility'

import {fetchrequest, handlefetch} from '../../api/fetch'
import { useHistory } from "react-router-dom";

const BookShelf = (props) => {

  const focushandlerref = useRef(null);
  const containerref = useRef(null);

  const [bookshelfbooks, setBookshelfbooks] = useState([])

  const [shippingprice, setShippingprice] = useState([])
  const [bookprice, setBookprice] = useState([])

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [coverlist, setCoverlist] = useState([])
  const [cartbool, setCartbool] = useState(null)

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

  const checkCart = () => {
    var cartholdername = ""

    if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
      cartholdername = localStorage.getItem('guestname')
    }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
      cartholdername = localStorage.getItem('username')
    }

    var payload = {
      body:{
        username: cartholdername
      }
    }
    payload.uri = 'user/checkcartmultiple'
    payload.requestType = "post"

    handlefetch(payload).then(result=>{
      console.log("value of result from checkcart: ", result)
      setCartbool(result)
    })
  }

  const addcartuser = (cartholdername, bookuniqueid) => {
    var payload = {
      body:{
        bookuniqueid: bookuniqueid, 
        username: cartholdername
      }
    }
    payload.requestType="postcookie"
    payload.uri='user/addbooktocartuser'
    handlefetch(payload).then(result=>{
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      console.log('value of result from addcartuser: ', result)
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      checkCart()
      // retrieveCart(localStorage.getItem("username"), 'user')
    })
  }

  const addcartguest = (cartholdername, bookuniqueid) => {

    console.log("***********************************************************")
    console.log("***********************************************************")
    console.log("***********************************************************")

    console.log("inside addcartguest and value cartholdername: ", cartholdername)
    console.log("inside addcartguest and value bookuniqueid: ", bookuniqueid)

    console.log("***********************************************************")
    console.log("***********************************************************")
    console.log("***********************************************************")

    var payload = {
      body: {
        bookuniqueid: bookuniqueid,
        username: cartholdername
      }
    }
    payload.requestType="post"
    payload.uri='user/addbooktocartguest'
    handlefetch(payload).then(result=>{
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      console.log('value of result from addcartguest: ', result)
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      checkCart()
      // retrieveCart(localStorage.getItem("guestname"), 'guest')
    })
  }

  const removecartuser = (cartholder, bookuniqueid) => {
    var payload = {
      body:{
        bookuniqueid: bookuniqueid, 
        username: cartholder
      }
    }
    payload.requestType="postcookie"
    payload.uri='user/removebookcartuser'
    handlefetch(payload).then(result=>{
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      console.log('value of result from addcartuser: ', result)
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      checkCart()
      // retrieveCart(localStorage.getItem("username"), 'user')
    })
  }

  const removecartguest = (cartholder, bookuniqueid) => {
    var payload = {
      body: {
        bookuniqueid: bookuniqueid,
        username: cartholder
      }
    }
    payload.requestType="post"
    payload.uri='user/removebookcartguest'
    handlefetch(payload).then(result=>{
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      console.log('value of result from addcartguest: ', result)
      console.log("*****************")
      console.log("*****************")
      console.log("*****************")
      checkCart()
    })
  }

  const addcart = (bookuniqueid) => { 
    var cartholdername = ''
    if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
      cartholdername = localStorage.getItem('guestname')
      addcartguest(cartholdername, bookuniqueid)
    }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
      cartholdername = localStorage.getItem('username')
      addcartuser(cartholdername, bookuniqueid)
    }
  }

  const removecart = (bookuniqueid) => { 
    var cartholdername = ''
    if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
      cartholdername = localStorage.getItem('guestname')
      removecartguest(cartholdername, bookuniqueid)
    }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
      cartholdername = localStorage.getItem('username')
      removecartuser(cartholdername, bookuniqueid)
    }
  }

  useEffect(()=>{
    findbooks()
    checkCart()
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
          console.log("value of book: ", book)
          if(cartbool != null){
            var cartbookbool = cartbool.find(el=>el.uniqueid==book.uniqueid)
            if(cartbookbool!=undefined){
              var inyourcart = cartbookbool.inyourcart
              var inothercart = cartbookbool.inothercart
            }else{
              var inyourcart = false;
              var inothercart = false;              
            }
          }else{
            var inyourcart = false;
            var inothercart = false;
          }
          console.log("value of bookid: ", book.uniqueid)
          console.log('value of inyourcart: ', inyourcart)
          console.log("value of inothercart: ", inothercart)
          if (book.picnamefront == ""){
            return(
              <div key={book.uniqueid}
                style={{
                  marginBottom: '20px',
                  background: "url('./wood.jpg')"
                }}
              >
                <table style={{width: '100%'}}
                  className='tablebackground'
                >
                  <tbody style={{}}>
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
                          style={{
                            display: 'inline-block'
                          }}
                        >
                          <div
                            className='button'
                            style={{
                              display: 'inline-block', 
                              marginRight: '10px'
                            }}
                            onClick={()=>{
                              var pathname = '/book/'+book.uniqueid
                              console.log("pathname value = ", pathname)
                              history.push({
                                pathname
                              })
                            }}
                          >
                            View Book
                          </div>
                          <div
                            style={{display: 'inline-block'}}
                          >
                            {
                              (inyourcart==false && inothercart==false)?
                                <div
                                  className='button'
                                  style={{
                                    display: 'inline-block'
                                  }}
                                  onClick={()=>{
                                    addcart(book.uniqueid)
                                  }}
                                > 
                                  Add to Cart
                                </div>
                              :<div/>
                            }
                            {
                              (inyourcart==true)?
                                <div
                                  className='button'
                                  style={{
                                    display: 'inline-block', 
                                    background: 'red'
                                  }}
                                  onClick={()=>{
                                    removecart(book.uniqueid)
                                  }}
                                > 
                                  Remove from Cart
                                </div>
                              :<div/>
                            }
                            {
                              (inothercart==true)?
                                <div
                                style={{
                                  display: 'inline-block', 
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold'
                                }}
                                > 
                                  Book currently reserved.
                                </div>
                              :<div/>
                            }
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>  
            )
          }else{
            return(
              <div key={book.uniqueid}
                style={{
                  background: "url('./wood.jpg')",
                  marginBottom: '20px', 
                  border: '10px solid darkred', 
                  borderRadius: '5px'
                }}
              >
                <table style={{width: '100%'}}
                  className='tablebackground tablenoborder'
                >
                  <col style={{width:"20%"}}/>
                  <col style={{width:"80%"}}/>
                  <tbody>
                    <tr
                      className='slightwhite'
                      style={{fontWeight: 'bold', fontSize: '1.25rem', fontStyle: 'italic'}}
                    >
                      <td colSpan='2' className='tdnoborder'>
                        {book.title}
                      </td>
                    </tr>
                    <tr>
                      <td  className='tdnoborder bluefade'>
                        <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top'}}>
                          <img 
                          style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
                          src={`http://localhost:8080/images/${book.picnamefront}`}/>    
                        </div>
                      </td>
                      <td  
                        colSpan='4'
                        className='tdnoborder tdnopadding orangefade' style={{background: '', padding: '0px'}}
                      >
                        <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top', width: "calc(100% - 10px)", background: "rgba(0,0,0,0)", borderRadius: '5px', float: 'left', fontSize: '2rem'}}>
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
                            style={{
                              display: 'inline-block'
                            }}
                          >
                            <div
                              className='button'
                              style={{
                                display: 'inline-block', 
                                marginRight: '10px'
                              }}
                              onClick={()=>{
                                var pathname = '/book/'+book.uniqueid
                                console.log("pathname value = ", pathname)
                                history.push({
                                  pathname
                                })
                              }}
                            >
                              View Book
                            </div>
                            <div
                              style={{display: 'inline-block'}}
                            >
                              {
                                (inyourcart==false && inothercart==false)?
                                  <div
                                    className='button'
                                    style={{
                                      display: 'inline-block'
                                    }}
                                    onClick={()=>{
                                      addcart(book.uniqueid)
                                    }}
                                  > 
                                    Add to Cart
                                  </div>
                                :<div/>
                              }
                              {
                                (inyourcart==true)?
                                  <div
                                    className='button'
                                    style={{
                                      display: 'inline-block', 
                                      background: 'red'
                                    }}
                                    onClick={()=>{
                                      removecart(book.uniqueid)
                                    }}
                                  > 
                                    Remove from Cart
                                  </div>
                                :<div/>
                              }
                              {
                                (inothercart==true)?
                                  <div
                                  style={{
                                    display: 'inline-block', 
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                  }}
                                  > 
                                    Book currently reserved.
                                  </div>
                                :<div/>
                              }
                            </div>
                          </div>
                        </div>
                      </td>
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
          marginBottom: '40px', 
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