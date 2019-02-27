import React from 'react';
import {
  Link
} from 'react-router-dom'



function Navbar (props){

      return (
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand disabled" href="#" tabIndex="-1" aria-disabled="true">Google Book</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
          <Link to="/search"  className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}>Search </Link>
            </li> 
          <li className="nav-item">
            <Link to="/save"  className={window.location.pathname === "/save" ? "nav-link active" : "nav-link"}>Save</Link>
            </li>
           
         
          </ul>
        </div>
        
      </nav>
     
    )
}


export default Navbar;