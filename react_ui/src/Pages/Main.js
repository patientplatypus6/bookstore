import React, {Component} from 'react';
import Button from '../Components/SubComponents/Button/Button'
import InputBox from '../Components/SubComponents/InputBox/InputBox'
import TextBox from '../Components/SubComponents/TextBox/TextBox'
import { observer, useObserver} from "mobx-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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

class Main extends React.Component{
  render(){
    return(
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Book Shelf</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/book">Book</Link>
            </li>
            <li>
              <Link to="/admin/addbook">Add Book</Link>
            </li>
            <li>
              <Link to="/admin/booklist">Book List</Link>
            </li>
            <li>
              <Link to="/admin/editbook">Edit Book</Link>
            </li>
          </ul>
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
  }
}


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