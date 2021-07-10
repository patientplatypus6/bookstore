import React, {Component, useState} from 'react';
import Button from '../Components/SubComponents/Button/Button'
import InputBox from '../Components/SubComponents/InputBox/InputBox'
import TextBox from '../Components/SubComponents/TextBox/TextBox'
// import { observer, useObserver} from "mobx-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  NavLink
} from "react-router-dom";

import AddBook from '../Pages/Admin/AddBook'
import BookList from '../Pages/Admin/BookList'
import EditBook from '../Pages/Admin/EditBook'
import Portal from '../Pages/Admin/Portal'

import BillShip from '../Pages/Cart/BillShip'
import Cart from '../Pages/Cart/Cart'
import Confirmation from '../Pages/Cart/Confirmation'

import Book from '../Pages/Library/Book'
import BookShelf from '../Pages/Library/BookShelf'
import About from '../Pages/Library/About'

import Message from '../Pages/User/Message'
import OrderHistory from '../Pages/User/OrderHistory'
import UserInfo from '../Pages/User/UserInfo'
import ActionHandler from '../Redux/actionhandler.js'

import { useLocation } from 'react-router-dom'

// class Main extends React.Component{



const Main = () => {
  // render(){

    // var location = useLocation().pathname

    const usePathname = () => {
      const location = useLocation();
      console.log('value of location.pathname: ', location.pathname)
      return location.pathname;
    }

    return(
      <Router>
      <div>
        <ActionHandler/>
        <nav>
          <div
            style={{
              background: 'black', 
              padding: '5px', 
              marginBottom: '20px'
            }}
          >
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
            exact to="/admin/addbook">Add Book</NavLink>
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
            exact to="/admin/booklist">Book List</NavLink>
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
            exact to="/admin/editbook">Edit Book</NavLink>
          </div>
        </nav>  
        <Switch>
          <Route exact path="/" render={()=><BookShelf/>}/>
          <Route exact path="/about" render={()=><About/>}/>
          <Route exact path="/book" render={()=><Book/>}/>
          <Route exact path="/admin/addbook" render={()=><AddBook/>}/>
          <Route exact path="/admin/booklist" render={()=><BookList/>}/>
          <Route exact path="/admin/editbook" render={()=><EditBook/>}/>
        </Switch>
      </div>
    </Router>
    );
  // }
}
// }


// <Route exact path="/about">
// <About />
// </Route>
// <Route exact path="/book">
// <Book />
// </Route>
// <Route exact path="/admin/addbook">
// <AddBook/>
// </Route>
// <Route exact path="/admin/booklist">
// <BookList/>
// </Route>
// <Route exact path="/admin/editbook">
// <EditBook/>
// </Route>


// class Main extends React.Component{
//   render(){
//     return(
//       <div>
//         This is main
//         <div/>
//         <Button 
//           buttonName='testbutton'
//         />
//         <InputBox
//           buttonName='testbutton'
//         />
//         <TextBox
//           buttonName='testbutton'
//         />
//       </div>
//     );
//   }
// }

export default Main;