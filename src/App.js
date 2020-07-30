import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar';
import { withCookies } from 'react-cookie';
var FontAwesome = require('react-fontawesome');

class App extends Component{

  render(){
    return (
      <div>
        <Navbar clicked="home"/>
        <div className="container">
           <img className="img-fluid" src="https://image.shutterstock.com/image-photo/young-japanese-asian-woman-sits-600w-1162739953.jpg"/>
        </div>
           <div className="container">
             <div className="jumbotron">
                 image here
             </div>
           </div>

           <div className="container">
           <h3>Go literally anywhere. From anywhere.</h3>
           <div className="row">
             <div className="col-4">Smart</div>
             <div className="col-4">Simple</div>
             <div className="col-4">Seamless</div>
           </div>
           </div>

      </div>
    );
  }
}

export default withCookies(App);
