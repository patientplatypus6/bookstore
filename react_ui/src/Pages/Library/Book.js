import React, {Component, useState, useEffect} from 'react';
import './library.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"

import { useHistory, useLocation, useParams } from "react-router-dom";
import {fetchrequest, handlefetch} from '../../api/fetch'
import './book.css'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Book = (props) => {
  let history = useHistory();
  let params = useParams();

  const [book, setBook] = useState(null)
  const [bookuniqueid, setBookuniqueid] = useState(0)
  const [cartbooks, setCartbooks] = useState([])
  const [translate, setTranslate] = useState(0)
  const [totalprice, setTotalprice] = useState(null)

  useEffect(()=>{
    if(book!=null){
      console.log('value of book: ', book)
      if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
        checkcartguest()
      }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
        checkcartuser()
      }
      setTotalprice(book.userprice+book.usershipping)
    }
  }, [book])

  const findbook = () => {
    var payload = {
      body:{
        bookuniqueid
      }
    } 
    payload.requestType = "post"
    payload.uri = 'book/findbookshelfbookbyuniqueid'
    handlefetch(payload).then(result=>{
      console.log('value of result from book/findbookbyuniqueid', result)
      setBook(result)
    })
  }

  useEffect(()=>{
    if(bookuniqueid!=0){
      findbook()
    }
  }, [bookuniqueid])

  useEffect(()=>{
    setBookuniqueid(params.id)
  }, [])


  const checkcartguest = () => {
    var payload = {
      body:{
        username: localStorage.getItem('guestname')
      }
    }    
    payload.requestType="post"
    payload.uri = 'user/findbooksincartbyguest'
    handlefetch(payload).then(result=>{
      console.log("value of result from checkcartguest: ", result)
      setCartbooks(result)
    })
  }

  const checkcartuser = () => {
    var payload = {
      body:{
        username: localStorage.getItem('username')
      }
    }  
    payload.requestType="postcookie"
    payload.uri = 'user/findbooksincartbyuser'
    handlefetch(payload).then(result=>{
      console.log("&&&&&&&&&&&&&&&&&&&&&")
      console.log("&&&&&&&&&&&&&&&&&&&&&")
      console.log("&&&&&&&&&&&&&&&&&&&&&")
      console.log("value of result from checkcartuser: ", result)
      console.log("&&&&&&&&&&&&&&&&&&&&&")
      console.log("&&&&&&&&&&&&&&&&&&&&&")
      console.log("&&&&&&&&&&&&&&&&&&&&&")  
      setCartbooks(result)
    })
  }

  const addcartuser = () => {
    var payload = {
      body:{
        bookuniqueid: book.uniqueid, 
        username: localStorage.getItem('username')
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
      checkcartuser()
    })
  }

  const addcartguest = () => {
    var payload = {
      body: {
        bookuniqueid: book.uniqueid,
        username: localStorage.getItem('guestname')
      }
    }
    payload.requestType="post"
    payload.uri='user/addbooktocartguest'
    handlefetch(payload).then(result=>{
      console.log('value of result from addcartguest: ', result)
      history.push({
        pathname: "/cart"
      })
    })
  }

  return(
    <div className=''>
      <div className="wrapper">
        <div className="titlebox">
          <h2 style={{lineHeight: '0'}}>
            {book!=null?book.title:""}
          </h2>
          <h4 style={{lineHeight: '0'}} >
            {book!=null?book.subtitle:""}
          </h4>
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
          <div className='fixedcontainer'>
            <div className='roundedcontainer leafpattern'>
              {book!=null?
              <>
              <div style={{
                width: "45%", 
                maxHeight: "90%",
                margin: "calc(2.5% - 14px)",
                display:'inline-block', 
                padding: '5px',
                border: '2px solid black'
              }}>
                <img src={`http://localhost:8080/images/`+book.picnamefront} 
                  style={{height: 'auto', width: '100%', display: 'inline-block'}}
                />
                <div 
                  style={{ display: 'inline-block', fontWeight: 'bold', marginTop: '5px'}}
                >
                  Front Cover
                </div>
              </div>
              <div style={{
                width: "45%", 
                maxHeight: "90%",
                margin: "calc(2.5% - 14px)",
                display:'inline-block', 
                padding: '5px',
                border: '2px solid black'
              }}>
                <img src={`http://localhost:8080/images/`+book.picnamefront} 
                  style={{height: 'auto', width: '100%'}}
                />
                <div 
                  style={{ display: 'inline-block', fontWeight: 'bold', marginTop: '5px'}}
                >
                  Back Cover
                </div>
              </div>
              </>:<div/>}
            </div> 
          </div>
        </div>
        <div className="allpicsb">
          <div className='fixedcontainer'>
            <div className='roundedcontainer leafpattern'
              style={{
                textAlign: 'left',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              {book!=null?
                <div
                  style={{
                    display: 'inline-block',
                    height: '100%',
                    height: '100%'
                  }}
                >
                  {book.allpics.map((pic,index)=>{
                    return(
                      <div style={{height: '60%', display: 'inline-block', margin: '5px'}}>
                        <img src={`http://localhost:8080/images/`+pic} 
                          style={{height: '100%', width: 'auto'}}
                        />
                      </div>
                    )
                  })}
                </div>  
              :<div/>}
            </div> 
          </div>
        </div>
        <div className="storyinfob">
          <div className='fixedcontainer'>
            <div className='roundedcontainer flowerpattern'>
              <h3 style={{lineHeight: '0'}}>
                Story Information
              </h3>
              {book!=null?book.storyinfo:""}
            </div> 
          </div>
        </div>  
        <div className="pricesbox">
          <div className='fixedcontainer'>
            <div className='roundedcontainer wavespattern'>
              <div 
                style={{float: 'left', width: '60%', marginTop: '5px', textAlign: 'left'}}
              >
                <div style={{background: 'darkgrey', color: 'black', padding: '5px'}}>
                  <div style={{fontWeight: 'bold'}}>My Guarantee to You</div>
                  <div>
                    All books are currently in stock in the condition reported. They will be shipped in a timely manner to the address provided. All sales final.
                  </div>
                </div>
              </div>
              
              <div style={{float: 'right', width: '35%'}}>
                <div
                  style={{
                    display: 'inline-block', 
                    textAlign: 'left', 
                    width: '100%',
                    margin: '5px', 
                    padding: '5px',
                    float: 'right',
                    background: 'rgb(220,220,220)'
                  }}
                >
                  <div>
                    <hr/>
                  </div>
                  <div>
                    Shipping Price - <span style={{float:'right'}}>${book!=null?book.usershipping:""}</span>
                  </div>
                  <div>
                    Book Price - <span style={{float:'right'}}>${book!=null?book.userprice:""}</span>
                  </div>
                  <div>
                    <hr/>
                  </div>
                  <div>
                    Total Price - <span style={{float:'right'}}>${totalprice!=null?totalprice:""}</span>
                  </div>
                </div>
                <br/>
                <div className='button'
                style={{
                  display: 'inline-block',
                  marginRight: '5px', 
                  float: 'right',
                  background: localStorage.getItem('username')==null && cartbooks.length != 0?'red':''
                }}
                onClick={()=>{
                  if(localStorage.getItem('username')==null){
                    addcartguest()
                  }else{
                    addcartuser()
                  }
                }}
                >
                  {localStorage.getItem('username')!=null && cartbooks.length == 0? 
                  'Add to Cart':null}
                  {localStorage.getItem('username')==null && cartbooks.length == 0?
                    'Buy Now':  null}
                  {localStorage.getItem('username')==null && cartbooks.length != 0?
                    'Only 1 Item Allowed for Guest': null}
                </div>
              </div>
            </div> 
          </div>
        </div>
        <div className="condition">
          <div className='fixedcontainer'>
            <div className='roundedcontainer flowerpattern'>
              <h3 style={{lineHeight: '0'}}>
                Book Condition
              </h3> 
              {book!=null?book.condition:""}
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book;