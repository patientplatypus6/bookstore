import React, {Component, useState, useEffect} from 'react';
import { handlefetch } from '../../api/fetch';
import './cart.css'
import usstates from '../../utility/states';

import { cartholdername, cartholderloggedin } from '../../utility/localstorage';

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

  const [modalstatus, setModalstatus] = useState("closed")
  const [modalmessage, setModalmessage] = useState("Now double checking cart status...")

  const stripe = useStripe();
  const elements = useElements();

  useEffect(()=>{
    console.log('props.checkcartstatus: ', props.checkcartstatus)
    if(props.checkcartstatus=='passed'){
      setTimeout(() => {
        setModalstatus('attemptpayment')        
      }, 1000);
    }else if(props.checkcartstatus=='failed'){
      setTimeout(() => {
        setModalstatus('cartfail')  
      }, 1000);
    }
  }, [props.checkcartstatus])

  useEffect(()=>{

    //set overflow of body

    if(modalstatus=='closed'){
      document.getElementById("body").style.overflow  = "visible" 
    }else{
      document.getElementById("body").style.overflow = "hidden"
    }

    //http call by status

    if(modalstatus=='checkcart'){
      setModalmessage("Now double checking cart status...")
      props.checkCartCallback()
    }else if(modalstatus=='attemptpayment'){
      setModalmessage("Now submitting payment details...")
      handleSubmitPayment()
    }else if(modalstatus=='paymentsuccess'){
      var amount = props.amount
      setModalmessage(`Your payment of $${amount} was successful!
        You will receive an email notification with the details of your purchase shortly.
      `)
    }else if(modalstatus=='cartfail'){
      setModalmessage("Cart not up to date. Please refresh the page to update your cart.")
    }else if(modalstatus=='paymentfail'){
      //errors handled in callbacks
    }else if(modalstatus=='requiresaction'){
      setModalmessage("Cart requires 3-D authentication, please follow prompts...")
    }

  }, [modalstatus])

  const clearData = () => {
    setCity("")
    setState("")
    setStreet1("")
    setStreet2("")
    setCityshipping("")
    setStateshipping("")
    setStreet1shipping("")
    setStreet2shipping("")
    setEmail("")
    setPhone("")
    setFirstname("")
    setLastname("")
    setModalstatus("closed")
    setModalmessage("Now double checking cart status...")
    props.clearDataCallback()
  }

  const renderPaymentModal = () => {

    if(modalstatus!='closed'){
      return(
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, bottom: 0, right: 0, 
            zIndex: '999',
            background: 'rgba(0,0,0,0.6)'
          }}
        >
          <div
            style={{
              width: '100%', 
              height: '100%', 
              position: 'relative'
            }}
          >
            <div
              style={{
                width: 'calc(50vw - 8px)', 
                marginLeft: '25vw', 
                marginRight: '25vw', 
                background: 'grey',
                color: 'black',
                borderRadius: '5px', 
                border: '2px solid blue', 
                marginTop: '20vh', 
                padding: '10px', 
                textAlign: 'center', 
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute', 
                  top: '0px', 
                  right: '5px', 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  cursor: 'pointer'
                }}
                onClick={()=>{
                  setModalstatus('closed')
                  props.resetCartStatus()
                }}
              >
                x
              </div>
              <div
                style={{
                  padding: '10px'
                }}
              >
                <div
                  style={{
                    height: '40px', 
                    width: '40px', 
                    marginRight: '20px',
                    display: 'inline-block'
                  }}
                >
                  {!(modalstatus.includes('fail')||modalstatus.includes('success'))?
                    <img 
                    src={process.env.PUBLIC_URL+"/loading.gif"}
                    style={{width: '100%', height: '100%'}}
                    />  
                  :<div/>}
                  {modalstatus.includes('fail')?
                    <img 
                    src={process.env.PUBLIC_URL+"/exclamation.png"}
                    style={{width: '100%', height: '100%'}}
                    />   
                  :<div/>}
                  {modalstatus.includes('paymentsuccess')?
                    <img 
                    src={process.env.PUBLIC_URL+"/dollarsign.png"}
                    style={{width: '100%', height: '100%'}}
                    />  
                  :<div/>}
                </div>
                <div
                  style={{
                    display: 'inline-block', 
                    verticalAlign:'top', 
                    paddingTop: '10px',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {modalmessage}
                  <br/>
                  {modalstatus.includes('fail')?
                   <div className="button"
                      style={{
                        background: 'red',
                        display: 'inline-block', 
                        marginTop: '10px'
                      }}
                      onClick={()=>{
                        setModalstatus('closed')
                        props.resetCartStatus()
                      }}
                    >
                      OK!
                    </div> 
                  :<div/>}
                  {modalstatus.includes('paymentsuccess')?
                    <div className="button"
                      style={{
                        background: 'green',
                        display: 'inline-block', 
                        marginTop: '10px'
                      }}
                      onClick={()=>{
                        setModalstatus('closed')
                        props.resetCartStatus()
                        clearData()
                      }}
                    >
                      OK!
                    </div> 
                  :<div/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
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
      setTimeout(() => {
        setModalmessage(result.error.message)
        setModalstatus('paymentfail')
      }, 1000);
    } else {
      console.log('value of result in paymentsuccess for asyncpay: ', result)
      if(result.paymentIntent.status=='succeeded'){
        setTimeout(() => {
          setModalmessage(result.message)
          setModalstatus('paymentsuccess')
        }, 1000);
      }
      else if(result.paymentIntent.status=='requires_action'){
        setTimeout(() => {
          setModalmessage(result.message)
          setModalstatus('requiresaction')
        }, 1000);
      }
    }
  }

  const paymentIntent = () => {
    console.log('value of props: ', props.amount)

    if(props.amount==0){
      setTimeout(() => {  
        setModalmessage('Amount to charge is $0! Please check your cart.')
        setModalstatus('paymentfail')
      }, 1000);
    }else{
      var payload = {
        body:{
          amount: props.amount
        }
      }
      payload.uri = "create-payment-intent"
      payload.url = "http://localhost:4000"
      payload.requestType = "post"
      handlefetch(payload).then(result=>{
        console.log("value of result: ", result)
        asyncpay(result.client_secret)
      }).catch(e=>{
        console.log('there was an error in paymentIntent: ', e)
        setTimeout(() => {
          if(JSON.stringify(e).includes("email")){
            setModalmessage("Email is invalid.")
            setModalstatus('paymentfail')
          }else if(JSON.stringify(e).includes('phone')){
            setModalmessage("Phone number is invalid.")
            setModalstatus('paymentfail')
          }else{
            setModalmessage("An error occurred. Please try again.")
            setModalstatus('paymentfail')
          }
        }, 1000);
      })
    }

  }

  const handleSubmitPayment = async (event) => {

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
    }else{
      setTimeout(() => {
        setModalmessage(error.message)
        setModalstatus('paymentfail')
      }, 1000);
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
      {renderPaymentModal()}
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
        Please be aware that cart items are only reserved for a limited time (longer for registered users) in order to give everyone the chance to consider a purchase. To check that your cart is up to date you might want to refresh the page. When purchasing, cart items are double checked to be current, and, if not, the purchase will not go through and a notification will display.
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
              autocomplete="off"
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
          <div style={{fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'underline', marginRight: '40px', marginBottom: '10px', marginTop: '10px'}}>
            The total cost of your purchase is ${props.amount}.
          </div>
          <div className='button'
            style={{
              background: 'red', display: 'inline-block', marginRight: '40px', 
              fontSize: '20px'
            }}
            onClick={(e)=>{
              setModalstatus("checkcart")
            }}
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
  const [checkcartstatus, setCheckcartstatus] = useState('notchecked')
  const [paymentsuccessmessage, setPaymentsuccessmessage] = useState("")
  const [cartmessage, setCartmessage] = useState("")

  const stripePromise = loadStripe('pk_test_51JFN40GiGVLhVoutsxeWSbq2uvly5CkxsJjI8xDuyHYdWwyfen9wAgfdcnU8j5VEzwXIkMUpUIuM3KFwjRv3yiq900fwWuF1lW');

  const clearDataCallback = () => {
    setCartcover(null)
    setCart(null)
    setShippingsum(0)
    setPricesum(0)
    setCheckcartstatus('notchecked')
    setCartmessage(`
      Your payment was successful!
      Thank you for your purchase.
      Please check your email for followup details.
    `)
  }

  useEffect(()=>{
    if(cart!=null&&cart.length==0){
      setCartmessage("There are currently no items in your cart.")
    }
  }, [cart])

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
      console.log('before findcovers and value of cart: ', cart)
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

  const resetCartStatus = () => {
    setCheckcartstatus('notchecked')
  }

  const checkCartCallback = () => {
    retrieveCart('check')
  }

  const retrieveCartUser = (status) => {
    var payload = {
      body: {
        username: cartholdername()
      }
    }
    payload.requestType = 'postcookie'
    payload.uri = "user/findbooksincartbyuser"
    handlefetch(payload).then(result=>{
      if(status == 'initial'){
        setCart(result)
      }else if(status == 'check'){
        if(result.length == cart.length){
          setCheckcartstatus("passed")
        }else{
          setCheckcartstatus("failed")
          // retrieveCartUser(cartholdername, 'initial')
        }
      }
    })
  }

  const retrieveCartGuest = (status) => {
    console.log("inside retrieveCartGuest")
    var payload = {
      body: {
        username: cartholdername()
      }
    }
    payload.requestType = 'post'
    payload.uri = "user/findbooksincartbyguest"
    handlefetch(payload).then(result=>{
      console.log('value of result from retrieveCartGuest: ', result)
      console.log('result.length: ', result.length)
      console.log('cart.length: ', cart!=null?cart.length:'null')
      if(status == 'initial'){
        setCart(result)
      }else if(status == 'check'){
        if(result.length == cart.length){
          console.log('inside setCheckcartstatus and equality')
          setCheckcartstatus("passed")
        }else{
          console.log('inside setCheckcartstatus and else')
          setCheckcartstatus("failed")
        }
      }
    })
  }

  const retrieveCart = (status) => {
    if(status=='initial'){
      setPricesum(0)
      setShippingsum(0)
    }
    if(cartholderloggedin()){
      retrieveCartUser(status)
    }else{
      retrieveCartGuest(status)
    }
  }

  const removecartuser = (uniqueid) => {
    var payload = {
      body:{
        bookuniqueid: uniqueid, 
        username: cartholdername()
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
      retrieveCart('initial')
    })
  }

  const removecartguest = (uniqueid) => {
    var payload = {
      body: {
        bookuniqueid: uniqueid,
        username: cartholdername()
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
      retrieveCart('initial')
    })
  }

  useEffect(()=>{
    var cartholdername = ""
    retrieveCart('initial')
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
                            if(cartholderloggedin()){
                              removecartuser(cartitem.uniqueid)
                            }else{
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
                <CheckoutForm 
                  resetCartStatus={()=>{resetCartStatus()}}
                  checkcartstatus={checkcartstatus}
                  checkCartCallback={()=>{checkCartCallback()}}
                  clearDataCallback={()=>{clearDataCallback()}}
                  amount={parseFloat(shippingsum) + parseFloat(pricesum)}
                />
              </Elements>
            </div>
          </div>
        :<div/>}
        {cartmessage.length>0?
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
          {cartmessage}
        </div>
        :<div/>}
      </div>
    </div>
  )
}

export default Cart;