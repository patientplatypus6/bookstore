import React, {Component, useEffect, useState} from 'react';
// import Button from '../Components/SubComponents/Button/Button'
// import InputBox from '../Components/SubComponents/InputBox/InputBox'
// import TextBox from '../Components/SubComponents/TextBox/TextBox'
// import { observer, useObserver} from "mobx-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  NavLink
} from "react-router-dom";

import AddBook from './Admin/AddBook'
import AdminDashboard from './Admin/AdminDashboard'
import EditBook from '../Pages/Admin/EditBook'
import Book from '../Pages/Library/Book'
import BookShelf from '../Pages/Library/BookShelf'
import About from '../Pages/Library/About'
import Cart from '../Pages/Cart/Cart'
import Purchase from '../Pages/Cart/Purchase'

import { useLocation } from 'react-router-dom'
import AddRevenueCost from './Admin/AddRevenueCost';

import {fetchrequest} from '../api/fetch'

import './main.css'
import { render } from '@vue/runtime-dom';

const Main = () => {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[login, setLogin] = useState([])
    const[loginmodal, setLoginmodal] = useState(false)
    const[modalmessage, setModalmessage] = useState("")
    const[loggedin, setLoggedin] = useState(false)
    const[cartbookids, setCartbookids] = useState([])

    const updatecartbookids = (updated) => {
      var tempcartbookids = [...cartbookids]; 
      tempcartbookids = updated
      setCartbookids([...tempcartbookids])
    }

    const handlefetch = (payload) => {
      console.log('inside handlefetch and value of payload: ', payload)
      const fetchasync = async () => {
        var fetchresult = await fetchrequest(payload)
        return fetchresult
      }
      return fetchasync();
    }

    useEffect(()=>{
      if(localStorage.getItem('username')!='' && localStorage.getItem('username')!=null){
        setUsername(localStorage.getItem('username'))
        setLoggedin(true)
      }
    }, [])

    const handleLogout = () => {
      var payload = {
        body: {
          username, 
          password
        },
        requestType: "post", 
        uri: "user/logout"
      } 
      handlefetch(payload).then(result=>{
        setLoggedin(false)
        localStorage.removeItem('username')
        localStorage.removeItem('cookie')
      })     
    }

    const handleLogin = () => {
      var payload = {
        body: {
          username,
          password
        },
        requestType: "post", 
        uri: "user/login"
      } 
      handlefetch(payload).then(result=>{
        console.log('value of result: ', result)
        setLogin(result)
        if(!result.success){
          setUsername("")
          setPassword("")
          setModalmessage(`Username or password was not found in database. \n Please register as a new user or retry.`)
          console.log('value of login: ', login)
          console.log('value of loginmodal: ', loginmodal)
          setLoginmodal(true)
        }else{
          setLoginmodal(false)
          setLoggedin(true)
          localStorage.setItem('username', username)
          localStorage.setItem('cookie', result.cookie)
          setUsername("")
          setPassword("")
        }
      })
    }

    const handleRegister = () => {
      var payload = {
        body: {
          username,
          password
        },
        requestType: "post", 
        uri: "user/register"
      } 
      handlefetch(payload).then(result=>{
        console.log('value of result: ', result)
        setLogin(result)
        if(!result.success){
          setUsername("")
          setPassword("")
          setModalmessage(`Username already in use. \n Please register a new username and password or log in to an existing account.`)
          console.log('value of login: ', login)
          console.log('value of loginmodal: ', loginmodal)
          setLoginmodal(true)
        }else{
          setLoginmodal(false)
          setLoggedin(true)
          localStorage.setItem('username', username)
          localStorage.setItem('cookie', result.cookie)
          setUsername("")
          setPassword("")
        }
      })
    }

    const renderLoginModal = () => {
      console.log('value of loginmodal in renderLoginModal: ', loginmodal)
      if(loginmodal==true){
        return(
          <div  
            style={{
              position: 'fixed',
              top: 0, left: 0, bottom: 0, right: 0, 
              zIndex: '999',
              background: 'rgba(0,0,0,0.6)', 
              color: 'white'
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
                  width: '50vw', 
                  marginLeft: '25vw', 
                  marginRight: '25vw', 
                  background: 'grey',
                  color: 'black',
                  borderRadius: '5px', 
                  border: '2px solid blue', 
                  marginTop: '20vh', 
                  padding: '10px', 
                  textAlign: 'center'
                }}
              >
                <br/>
                {modalmessage}
                <br/><br/>
                <div style={{display: 'inline', marginRight: '10px'}}>
                  <span style={{marginRight: '5px', color: 'rgb(0,0,0)'}}>user</span>
                  <input 
                    value={username}
                    onChange={(e)=>{
                      setUsername(e.target.value)
                    }}
                  />
                </div>
                <div style={{display: 'inline', marginRight: '10px'}}>
                  <span style={{marginRight: '5px', color: 'rgb(0,0,0)'}}>pass</span>
                  <input 
                    value={password}
                    type='password'
                    onChange={(e)=>{
                      setPassword(e.target.value)
                    }}
                  />
                </div>
                <div
                  className='button'
                  style={{display: 'inline', marginRight: '5px'}}
                  onClick={()=>{
                    handleLogin()
                  }}
                >
                  login
                </div>
                <div
                  className='button'
                  style={{display: 'inline'}}
                  onClick={()=>{
                    handleRegister()
                  }}
                >
                  register
                </div>
                <br/>
                <br/>
              </div>
            </div>
          </div>
        )
      }else{
        return(<div/>)
      }
    }

    return(
      <div>
      {renderLoginModal()}
      <Router>
      <div
        style={{
          background: 'black', 
          padding: '5px', 
          height: '20px'
        }}
      >
        <nav style={{display: "inline-block"}}>
          <NavLink 
          style={{
            textDecoration: 'none', 
            color: "rgb(180,180,180)", 
            padding: '20px'
          }} 
          activeStyle={{
            textDecoration: 'underline',
            padding: '20px',
            color: "rgb(250,250,250)"
          }}
          exact to="/">Book Shelf</NavLink>
          <NavLink 
          style={{
            textDecoration: 'none', 
            color: "rgb(180,180,180)", 
            padding: '20px'
          }} 
          activeStyle={{
            textDecoration: 'underline',
            padding: '20px',
            color: "rgb(250,250,250)"
          }}
          exact to="/about">About</NavLink>
          <NavLink 
          style={{
            textDecoration: 'none', 
            color: "rgb(180,180,180)", 
            padding: '20px'
          }} 
          activeStyle={{
            textDecoration: 'underline',
            padding: '20px',
            color: "rgb(250,250,250)"
          }}
          exact to="/book">Book</NavLink>
          <NavLink 
          style={{
            textDecoration: 'none', 
            color: "rgb(180,180,180)", 
            padding: '20px'
          }} 
          activeStyle={{
            textDecoration: 'underline',
            padding: '20px',
            color: "rgb(250,250,250)"
          }}
          exact to="/cart">Cart</NavLink>
          <NavLink 
          style={{
            textDecoration: 'none', 
            color: "rgb(180,180,180)", 
            padding: '20px'
          }} 
          activeStyle={{
            textDecoration: 'underline',
            padding: '20px',
            color: "rgb(250,250,250)"
          }}
          exact to="/purchase">Purchase</NavLink>
          <NavLink 
          style={{
            textDecoration: 'none', 
            color: "rgb(180,180,180)", 
            padding: '20px'
          }} 
          activeStyle={{
            textDecoration: 'underline',
            padding: '20px',
            color: "rgb(250,250,250)"
          }}
          exact to="/admin/dashboard">Admin Dashboard</NavLink>
        </nav> 
        {!loggedin?<div 
          style={{
            display: 'inline-block', float: 'right', marginRight: '10px'
          }}
        >
          <div style={{display: 'inline', marginRight: '10px'}}>
            <span style={{marginRight: '5px', color: 'rgb(200,200,200)'}}>user</span>
            <input 
              value={username}
              onChange={(e)=>{
                setUsername(e.target.value)
              }}
            />
          </div>
          <div style={{display: 'inline', marginRight: '10px'}}>
            <span style={{marginRight: '5px', color: 'rgb(200,200,200)'}}>pass</span>
            <input 
              value={password}
              type='password'
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
          </div>
          <div
            className='button'
            style={{display: 'inline', marginRight: '5px'}}
            onClick={()=>{
              handleLogin()
            }}
          >
            login
          </div>
          <div
            className='button'
            style={{display: 'inline'}}
            onClick={()=>{
              handleRegister()
            }}
          >
            register
          </div>
        </div>:
        <div style={{display: 'inline-block', float: 'right', marginRight: '10px'}}>
          <div style={{display: 'inline-block', color: 'white', marginRight: '10px'}}>
            Welcome {localStorage.getItem('username')}!
          </div>
          <div className='button'
            onClick={()=>{
              handleLogout()
            }}
          >
            log out
          </div>
        </div>}
      </div> 
      <Switch>
          <Route exact path="/" render={()=><BookShelf
            cartbookids={cartbookids}
            updatecartbooks={(newids)=>{updatecartbookids(newids)}}
          />}/>
          <Route exact path="/about" render={()=><About/>}/>
          <Route exact path="/admin/addbook" render={()=><AddBook/>}/>
          <Route exact path="/admin/addrevenuecost" render={()=><AddRevenueCost/>}/>
          <Route exact path="/admin/dashboard" render={()=><AdminDashboard/>}/>
          <Route exact path="/admin/editbook" render={()=><EditBook/>}/>
          <Route exact path="/book" render={()=><Book
            cartbookids={cartbookids}
            updatecartbooks={(newids)=>{updatecartbookids(newids)}}
          />}/>
          <Route exact path="/cart" render={()=><Cart
            cartbookids={cartbookids}
            updatecartbooks={(newids)=>{updatecartbookids(newids)}}
          />}/>
          <Route exact path="/purchase" render={()=><Purchase
            cartbookids={cartbookids}
            updatecartbooks={(newids)=>{updatecartbookids(newids)}}
          />}/>
      </Switch>
    </Router>
    </div>
    );
}


export default Main;