import React, {Component, useState, useEffect, useRef} from 'react';
import './library.css'
import { useSelector, useDispatch } from 'react-redux'
import {arraybuffertobase64, sleep} from '../../utility/utility'

import fetchrequest from '../../api/fetch'

const BookShelf = () => {

  const focushandlerref = useRef(null);
  const containerref = useRef(null);

  const [bookshelfcovers, setBookshelfcovers] = useState([])

  const [shippingprice, setShippingprice] = useState([])
  const [bookprice, setBookprice] = useState([])

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handlefetch = (payload) => {
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }

  const findbooks = () => {
    var payload = {}
    payload.uri='book/findbooks' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      console.log("value of result: ", result)
      var uniqueidlist = []
      result.forEach(item=>{
        uniqueidlist.push(item.uniqueid)
      })
      uniqueidlist.forEach(id=>{
        var coverpayload = {}
        coverpayload.uri='pic/findcovers' 
        coverpayload.requestType='post'   
        coverpayload.body = {}
        coverpayload.body.bookids=[id]
        handlefetch(coverpayload).then(coverresult=>{
          console.log("value of bookshelfcovers: ", bookshelfcovers)
          var tempbookshelfcovers = bookshelfcovers
          for(var i = 0; i < coverresult.length; i++){
            tempbookshelfcovers.push(coverresult[i])
            if(i==coverresult.length-1){
              setBookshelfcovers([...tempbookshelfcovers])
            }
          }
        })
      })
    })
  }

  const findshippingprices = () => {
    var payload = {body: {}}
    payload.uri='revenuecost/allrcbyname' 
    payload.requestType='post'
    payload.body.rcname='REVENUE - BOOK SHIPPING (PROJECTED)'
    handlefetch(payload).then(result=>{
      console.log("value of result: ", result)
      setShippingprice(result)
    })
  }

  const findbookprices = () => {
    var payload = {body: {}}
    payload.uri='revenuecost/allrcbyname' 
    payload.requestType='post'
    payload.body.rcname='REVENUE - BOOK PRICE (PROJECTED)'
    handlefetch(payload).then(result=>{
      console.log("value of result: ", result)
      setBookprice(result)
    })
  }

  useEffect(()=>{
    findbooks()
    findshippingprices()
    findbookprices()
  }, [])

  const coverhandler = () => {
    return(
      <>
        {bookshelfcovers.length==0?
          <div>
            <img 
              style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
              src={process.env.PUBLIC_URL+'/loading.gif'}
            />  
          </div>
        :<div/>}
        {bookshelfcovers.map((cover)=>{
          var title = cover.title
          var bookpriceitem = "";
          var shippingpriceitem = "";
          var totalpriceitem = null;
          
          try{
            var bookpriceitem = bookprice.find(element=>element.bookuniqueid==cover.bookuniqueid).rcvalue
          }catch{
            var bookpriceitem = "N/A"
          }

          try{
            var shippingpriceitem = shippingprice.find(element=>element.shippinguniqueid==cover.shippinguniqueid).rcvalue
          }catch{
            var shippingpriceitem = "N/A"
          }

          try{
            var totalpriceitem = parseFloat(bookpriceitem)+parseFloat(shippingpriceitem)
          }catch{
            var totalpriceitem = "N/A"
          }

          if (cover.picbyte == "MA=="){
            return(
              <div key={cover.bookuniqueid}>
                <table style={{width: '100%', background: "lightorange"}}>
                  <tbody style={{background: "lightorange"}}>
                    <br/>
                    <tr
                      style={{fontWeight: 'bold', fontSize: '1.25rem', fontStyle: 'italic'}}
                    >
                      {title}
                    </tr>
                    <tr>
                      {cover.bookuniqueid}
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
                            <span>Book Price</span><span>{bookpriceitem}</span>
                          </div>
                          <div>
                            Shipping Price - {shippingpriceitem}
                          </div>
                          <div>
                            Total Price - {totalpriceitem}
                          </div>
                        </div>
                        <div
                          className='button'
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
            console.log("%%%inside else")
            console.log("%%%bookuniqueid: ", cover)
            return(
              <div key={cover.bookuniqueid}>
                <table style={{width: '100%'}}>
                  <tbody>
                    <br/>
                    <tr
                      style={{fontWeight: 'bold', fontSize: '1.25rem', fontStyle: 'italic'}}
                    >
                      {title}
                    </tr>
                    <tr>
                      {cover.bookuniqueid}
                    </tr>
                    <tr style={{}}>
                      <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top'}}>
                        <img 
                        style={{height: '20vh', width: 'auto', marginBottom: '10px'}}
                        src={arraybuffertobase64(cover.picbyte)}/>    
                      </div>
                      <div style={{padding: '5px', display: 'inline-block', verticalAlign: 'top'}}>
                        <div
                          className='button'
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