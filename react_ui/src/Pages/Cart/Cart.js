import React, {Component, useState, useEffect} from 'react';
import { handlefetch } from '../../api/fetch';
import './cart.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"

const Cart = (props) => {

  const [cartcover, setCartcover] = useState(null)
  const [cart, setCart] = useState(null)

  const findCovers = () => {
    var bookids = []
    cart.forEach(item=>{
      bookids.push(item.uniqueid)
    })
    var payload = {
      body: {
        bookids: bookids
      }
    }
    payload.requestType = "post"
    payload.uri = 'pic/findcovers'
    handlefetch(payload).then(result=>{
      var tempcart = [...cart]
      tempcart.forEach(item=>{
        var picfind = result.find(el=>(el.bookuniqueid==item.uniqueid&&el.frontcover==true))
        if(picfind!=undefined){
          item.covername = picfind.picname
        }
      })
      console.log("^^^^^^^^^^^^^^^^^^^^^")
      console.log("^^^^^^^^^^^^^^^^^^^^^")
      console.log("^^^^^^^^^^^^^^^^^^^^^")
      console.log("value of tempcart: ", tempcart)
      console.log("^^^^^^^^^^^^^^^^^^^^^")
      console.log("^^^^^^^^^^^^^^^^^^^^^")
      console.log("^^^^^^^^^^^^^^^^^^^^^")
      setCartcover([...tempcart])
    })
  }

  useEffect(()=>{
    if(cart!=null){
      findCovers()
    }
  }, 
  [cart])

  const retrieveCartUser = (cartholdername) => {
    var payload = {
      body: {
        username: cartholdername
      }
    }
    payload.requestType = 'postcookie'
    payload.uri = "user/findbooksincartbyuser"
    handlefetch(payload).then(result=>{
      setCart(result)
    })
  }

  const retrieveCartGuest = (cartholdername) => {
    var payload = {
      body: {
        username: cartholdername
      }
    }
    payload.requestType = 'postcookie'
    payload.uri = "user/findbooksincartbyguest"
    handlefetch(payload).then(result=>{
      setCart(result)
    })
  }

  const retrieveCart = () => {
    var cartholdername = ""

    if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
      cartholdername = localStorage.getItem('guestname')
      retrieveCartGuest(cartholdername)
    }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
      cartholdername = localStorage.getItem('username')
      retrieveCartUser(cartholdername)
    }
  }

  useEffect(()=>{
    var cartholdername = ""
    retrieveCart()
  }, [])
  
  
  return(
    <div>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem', 
          color: 'white', 
          marginTop: '20px', 
          marginBottom: '20px'
        }}
      >
        Cart
      </div>
      <div
        style={{
          width: '80%', 
          marginLeft: '10%', 
          textAlign: 'center'
        }}
      >
        {(cartcover!=null)?
          <table
            style={{
              background: 'grey', 
              border: 'none'
            }}
          >
            <col style={{width: '12.5%'}}/>
            <col style={{width: '35%'}}/>
            <col style={{width: '10%'}}/>
            <col style={{width: '10%'}}/>
            <col style={{width: '10%'}}/>
            <col style={{width: '17.5%'}}/>
            <tr>
              <td>
                {/* image */}
              </td>
              <td>
                Title & Author
              </td>
              <td>
                Shipping Price
              </td>
              <td>
                Order Price
              </td>
              <td>
                Total Price
              </td>
              <td>
                Remove From Cart
              </td>
            </tr>
              {cartcover.map((cartitem)=>{
                return(
                  <tr
                    key={cartitem.uniqueid}
                    className=''
                    style={{}}
                  >
                    <td 
                      style={{
                        textAlign: 'center', 
                        border: 'none'
                      }}
                    >
                      <img src={'http://localhost:8080/images/'+cartitem.covername} 
                          style={{width: '100%', height: 'auto'}}
                        />
                    </td>
                    <td 
                      style={{
                        textAlign: 'center', 
                        border: 'none'
                      }}
                    >
                      {cartitem.title} by {cartitem.author}
                    </td>
                    
                  </tr>
                )
              })}
          </table>
        :<div/>}
      </div>
    </div>
  )
}

export default Cart;

{/* <div
                key={cartitem.uniqueid}
                className='itemholder'
                style={{
                  width: 'calc(100% - 40px)', 
                  display: 'inline-block', 
                  margin: '10px',
                  border: '10px solid blue', 
                  borderRadius: '5px', 
                  padding: '10px'
                }}
              >
                <div
                  style={{
                    padding: '10px', 
                    background: "rgba(250,250,250, 0.7"
                  }}
                >
                  <div 
                    style={{
                      display: 'inline-block', 
                      marginRight: '20px', 
                      width: '20%'
                    }}
                  >
                    <img src={'http://localhost:8080/images/'+cartitem.covername} 
                      style={{width: '100%', height: 'auto'}}
                    />
                  </div>
                  <div 
                    style={{
                      display: 'inline-block', 
                      marginRight: '20px', 
                      width: '20%', 
                      verticalAlign: "top"
                    }}
                  >
                    {cartitem.title} by {cartitem.author}
                  </div>
                  <div 
                    style={{
                      display: 'inline-block', 
                      marginRight: '20px', 
                      width: '20%'
                    }}
                  >
                    <img src={'http://localhost:8080/images/'+cartitem.covername} 
                      style={{width: '100%', height: 'auto'}}
                    />
                  </div>
                  <div 
                    style={{
                      display: 'inline-block', 
                      marginRight: '20px', 
                      width: '20%'
                    }}
                  >
                    <img src={'http://localhost:8080/images/'+cartitem.covername} 
                      style={{width: '100%', height: 'auto'}}
                    />
                  </div>
                </div>
              </div> */}