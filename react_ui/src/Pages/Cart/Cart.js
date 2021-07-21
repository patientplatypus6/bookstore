import React, {Component, useState, useEffect} from 'react';
import { handlefetch } from '../../api/fetch';
import './cart.css'
import usstates from '../../utility/states';

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import {loadStripe} from '@stripe/stripe-js';



const CheckoutForm = (props) => {

  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [street1, setStreet1] = useState("")
  const [street2, setStreet2] = useState("")

  const [cityshipping, setCityshipping] = useState("")
  const [stateshipping, setStateshipping] = useState("")
  const [street1shipping, setStreet1shipping] = useState("")
  const [street2shipping, setStreet2shipping] = useState("")

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")

  const stripe = useStripe();
  const elements = useElements();


  const submitStripeUser = (paymentMethod, cartholder) => {
    var payload = {
      paymentMethod: paymentMethod, 
      cartholder: cartholder
    }
    payload.requestType = "postcookie"
    payload.uri = "user/userstripepayment"
    handlefetch(payload).then(result=>{

    })
  }

  const submitStripeGuest = (paymentMethod, cartholder) => {
    var payload = {
      paymentMethod: paymentMethod, 
      cartholder: cartholder
    }
    payload.requestType = "post"
    payload.uri = "user/gueststripepayment"
    handlefetch(payload).then(result=>{
      
    })
  }

  const submitStripe = (paymentMethod) => {
    var cartholdername = ""

    if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
      cartholdername = localStorage.getItem('guestname')
      submitStripeGuest(paymentMethod, cartholdername)
    }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
      cartholdername = localStorage.getItem('username')
      submitStripeUser(paymentMethod, cartholdername)
    }

  }

  const asyncpay = async (client_secret) => {
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card:  elements.getElement(CardElement), 
        billing_details: {
          address:{
            city: city, 
            state: state,
            line1: street1, 
            line2: street2,
          },
          name: firstname + " " + lastname,
          email: email,
          phone: phone
        }
      }
    });
    if (result.error) {
      console.log('error!: ', result.error.message)
    } else {
      console.log("success!")
    }
  }

  const paymentIntent = () => {
    console.log('value of props: ', props.amount)
    var payload = {
      body:{
        amount: props.amount
      }
    }
    payload.uri = "/create-payment-intent"
    payload.url = "http://localhost:4000"
    payload.requestType = "post"
    handlefetch(payload).then(result=>{
      console.log("value of result: ", result)
      asyncpay(result.client_secret)
    }).catch(e=>{
      console.log('there was an error in paymentIntent: ', e)
    })
  }

  const handleSubmit = async (event) => {

    let getcard = elements.getElement(CardElement)
    console.log('value of getcard: ', getcard)

    // const {stripe, elements} = this.props;

    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable
    //   // form submission until Stripe.js has loaded.
    //   return;
    // }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if((error==undefined||error==null)&&(paymentMethod!=undefined||paymentMethod!=null)){
      paymentIntent()
    }

  };

  return (
    <div
      style={{
        display: 'inline-block', 
        textAlign: 'center', 
        width: '50vw'        
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem', 
          color: 'white', 
          marginTop: '20px', 
          marginBottom: '20px'
        }}
      >
        <div style={{display: 'inline-block'}}>
          Contact Information
        </div>
      </div>
      <div
        style={{
          background: 'darkgrey', 
          padding: '10px', 
          textAlign: 'left', 
          width: 'calc(100% - 7px)',
          borderRadius: '5px',
          border: '2px solid black'
        }}
      >
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >          
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={firstname}
              className='cartinput'
              onChange={(e)=>{
                setFirstname(e.target.value)
              }}
              placeholder='First Name'
            />
          </div>
        </div>
        <br/>
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >          
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={lastname}
              className='cartinput'
              onChange={(e)=>{
                setLastname(e.target.value)
              }}
              placeholder='Last Name'
            />
          </div>
        </div>
        <br/>
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >          
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={email}
              className='cartinput'
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              placeholder='Email'
            />
          </div>
        </div>
        <br/>
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >          
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={phone}
              className='cartinput'
              onChange={(e)=>{
                // if(e.target.value)
                //courtesy of https://www.w3resource.com/javascript/form/phone-no-validation.php  
                // if(e.length<=3){
                //   var phoneno =  /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/  
                // }
                var value = e.target.value;
                var index = e.target.value.length;

                if(
                  (
                    (index % 4 != 0) &&
                    (index % 8 != 0)
                  )
                  && index<=12
                  && !isNaN(parseInt(value.slice(index -1))))
                {
                  setPhone(value) 
                }else if(
                  (
                    (index % 4 == 0) ||
                    (index % 8 == 0)
                  )
                  && index<=12 
                  && index % 12 != 0
                  && value.slice(index-1)=="-")
                {
                  setPhone(value)
                }else if(
                  (index % 12 == 0)
                  && !isNaN(parseInt(value.slice(index -1))))
                {
                  setPhone(value)
                }else if(value==""){
                  setPhone(value)
                }else{
                  console.log("cannot parse non conforming value")
                }
              }}
              placeholder='Phone (###-###-####) US ONLY'
            />
          </div>
        </div>
        <br/>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem', 
          color: 'white', 
          marginTop: '20px', 
          marginBottom: '20px'
        }}
      >
        Shipping Address
      </div>
      <div
        style={{
          background: 'darkgrey', 
          padding: '10px', 
          textAlign: 'left', 
          width: 'calc(100% - 7px)',
          borderRadius: '5px',
          border: '2px solid black'
        }}
      >
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >          
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={cityshipping}
              className='cartinput'
              onChange={(e)=>{
                setCityshipping(e.target.value)
              }}
              placeholder='City'
            />
          </div>
        </div>
        <br/>
        <select
          value={stateshipping}
          style={{
            fontSize: '20px', 
            cursor: 'pointer',
            border: 'none', 
            outline: 'none',
            marginLeft: '40px', 
            width: '25vw', 
            borderBottom: '4px solid black',
            background: 'darkgrey'
          }}
          onChange={(e)=>{
            setStateshipping(e.target.value)
          }}
        >
          <option
            selected="48 contiguous US states only."
          >
            Select Contiguous US State.
          </option>
          {usstates.map(state=>{
            return(
              <option
                key={state}
                value={state}      
              >
                {state}
              </option>
            )
          })}
        </select>
        <br/>
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >
          <div style={{display: 'inline-block', width: "100%"}}>
            <input
              style={{width: "100%"}}
              value={street1shipping}
              className='cartinput'
              onChange={(e)=>{
                setStreet1shipping(e.target.value)
              }}
              placeholder='Street'
            />
          </div>
        </div>
        <br/>
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={street2shipping}
              className='cartinput'
              onChange={(e)=>{
                setStreet2shipping(e.target.value)
              }}
              placeholder='Street (apt, house #)'
            />
          </div>
        </div>
      </div>

      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem', 
          color: 'white', 
          marginTop: '20px', 
          marginBottom: '20px'
        }}
      >
        <div style={{display: 'inline-block'}}>
          Billing Address
        </div>
      </div>
      <div
        style={{
          fontWeight: 'bold', 
          color: 'black', 
          display: 'inline-block', 
          fontSize: '0.75rem', 
          marginTop: '5px', 
          background: 'darkgrey', 
          padding: '10px', 
          textAlign: 'left', 
          width: 'calc(100% - 7px)',
          borderRadius: '5px',
          border: '2px solid black',
          textAlign: 'center'
        }}
      >
        Please note that this information is not stored in our database.
        <br/> 
        We use <a href='https://www.stripe.com'>stripe</a> as a verified third party parment processor and follow all data integrity protocols.
      </div>
      <br/><br/>
      <div
        style={{
          background: 'darkgrey', 
          padding: '10px', 
          textAlign: 'left', 
          width: 'calc(100% - 7px)',
          borderRadius: '5px',
          border: '2px solid black',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >          
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={city}
              className='cartinput'
              onChange={(e)=>{
                setCity(e.target.value)
              }}
              placeholder='City'
            />
          </div>
        </div>
        <br/>
        <select
          value={state}
          style={{
            fontSize: '20px', 
            border: 'none', 
            outline: 'none',
            marginLeft: '40px', 
            width: '25vw', 
            borderBottom: '4px solid black',
            background: 'darkgrey'
          }}
          onChange={(e)=>{
            setState(e.target.value)
          }}
        >
          <option
            selected="48 contiguous US states only."
          >
            Select Contiguous US State.
          </option>
          {usstates.map(state=>{
            return(
              <option
                key={state}
                value={state}      
              >
                {state}
              </option>
            )
          })}
        </select>
        <br/>
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >
          <div style={{display: 'inline-block', width: "100%"}}>
            <input
              style={{width: "100%"}}
              value={street1}
              className='cartinput'
              onChange={(e)=>{
                setStreet1(e.target.value)
              }}
              placeholder='Street'
            />
          </div>
        </div>
        <br/>
        <div
          style={{
            display: 'inline-block', 
            marginLeft: '40px', 
            width: '25vw', 
            background: 'darkgrey', 
            borderBottom: '4px solid black'
          }}
        >
          <div style={{display: 'inline-block', width: '100%'}}>
            <input
              style={{width: '100%'}}
              value={street2}
              className='cartinput'
              onChange={(e)=>{
                setStreet2(e.target.value)
              }}
              placeholder='Street (apt, house #)'
            />
          </div>
        </div>
        <br/><br/>
        <div
          style={{
            borderBottom: '4px solid black', 
            width: '60%', 
            marginLeft: '40px'
          }}
        >
          <CardElement 
            options={{
              style:{
                base:{
                  backgroundColor: 'darkgrey',
                  color: 'black', '::placeholder': {
                    color: 'black',
                  },
                  fontSize: '20px', 
                }
              }
            }}
          />
        </div>
        <div
          style={{width: '100%', textAlign: "right"}}
        >
          <div className='button'
            style={{
              background: 'red', display: 'inline-block', marginRight: '40px', 
              fontSize: '20px'
            }}
            onClick={(e)=>{handleSubmit(e)}}
          >
            Pay Now
          </div>
        </div>
      </div>
    </div>
  );
}

const Cart = (props) => {

  const [cartcover, setCartcover] = useState(null)
  const [cart, setCart] = useState(null)
  const [shippingsum, setShippingsum] = useState(0)
  const [pricesum, setPricesum] = useState(0)

  const stripePromise = loadStripe('pk_test_51JFN40GiGVLhVoutsxeWSbq2uvly5CkxsJjI8xDuyHYdWwyfen9wAgfdcnU8j5VEzwXIkMUpUIuM3KFwjRv3yiq900fwWuF1lW');


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
      let tempshippingsum = shippingsum;
      let temppricesum = pricesum;
      cart.forEach(item=>{
        temppricesum += parseFloat(item.userprice)
        tempshippingsum += parseFloat(item.usershipping)
      })
      setPricesum(temppricesum)
      setShippingsum(tempshippingsum)
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
    setPricesum(0)
    setShippingsum(0)
    if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
      cartholdername = localStorage.getItem('guestname')
      retrieveCartGuest(cartholdername)
    }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
      cartholdername = localStorage.getItem('username')
      retrieveCartUser(cartholdername)
    }
  }

  const removecartuser = (uniqueid) => {
    var payload = {
      body:{
        bookuniqueid: uniqueid, 
        username: localStorage.getItem('username')
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
      retrieveCart()
      // retrieveCart(localStorage.getItem("username"), 'user')
    })
  }

  const removecartguest = (uniqueid) => {
    var payload = {
      body: {
        bookuniqueid: uniqueid,
        username: localStorage.getItem('guestname')
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
      retrieveCart()
    })
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
        }}
      >
        {(cartcover!=null && cartcover.length>0)?
          <div>
            <table
              style={{
                background: 'grey', 
                width: '80%', 
                marginLeft: '10%', 
                textAlign: 'center',
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
                  Order Price
                </td>
                <td>
                  Shipping Price
                </td>
                <td>
                  Total Price
                </td>
                <td>
                  Remove From Cart
                </td>
              </tr>
                {cartcover.map((cartitem, index)=>{
                  return(
                    <tr
                      key={cartitem.uniqueid}
                      className=''
                      style={{
                        borderBottom: '4px solid black'
                      }}
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
                      <td 
                        style={{
                          textAlign: 'center', 
                          border: 'none'
                        }}
                      >
                        ${cartitem.userprice}
                      </td>
                      <td 
                        style={{
                          textAlign: 'center', 
                          border: 'none'
                        }}
                      >
                        ${cartitem.usershipping}
                      </td>
                      <td 
                        style={{
                          textAlign: 'center', 
                          border: 'none'
                        }}
                      >
                        ${parseFloat(cartitem.userprice)+parseFloat(cartitem.usershipping)}
                      </td>
                      <td 
                        style={{
                          textAlign: 'center', 
                          border: 'none'
                        }}
                      >
                        <div
                          className='button'
                          style={{
                            background: 'red'
                          }}
                          onClick={()=>{
                            if(localStorage.getItem("username")!=null){
                              removecartuser(cartitem.uniqueid)
                            }
                            if(localStorage.getItem('guestname')!=null){
                              removecartguest(cartitem.uniqueid)
                            }
                          }}
                        >
                          Remove from Cart
                        </div>
                      </td>
                    </tr>
                  )
                })}
                <tr style={{background: 'lightgrey', fontWeight: 'bold'}}>
                  <td>
                    {/* image */}
                  </td>
                  <td>
                    Cart Total
                  </td>
                  <td>
                    ${pricesum}
                  </td>
                  <td>
                    ${shippingsum}
                  </td>
                  <td>
                    ${parseFloat(shippingsum) + parseFloat(pricesum)}
                  </td>
                  <td>
                    {/* remove button */}
                  </td>
                </tr>
            </table>
            <div>
              <Elements stripe={stripePromise}>
                <CheckoutForm amount={parseFloat(shippingsum) + parseFloat(pricesum)}/>
              </Elements>
            </div>
          </div>
        :<div/>}
        {(cartcover!=null&&cartcover.length == 0)?
        <div
          style={{
            background: 'grey',
            padding: '10px', 
            border: '10px solid black', 
            width: '50vw', 
            textAlign: 'center',
            marginLeft: 'calc(25vw - 20px)'
          }}
        >
          There are currently no items in your cart.
        </div>
        :<div/>}
      </div>
    </div>
  )
}

export default Cart;