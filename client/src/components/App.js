import React, { Component } from "react";
import "../App.css";
import NavBar from "./NavBar";
import Jumbotron from "./Jumbotron";
import BookStore from "./BookStore";
import MyBookList from "./MyBookList";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {

 
  render() {
    return (
         <Router>
              <div> 
              <NavBar />
              <Jumbotron />
              <Route exact path="/search" component={BookStore} />
              <Route exact path="/save" component={MyBookList} />  
           </div>           
        </Router>
    );
  }
}

export default App;
