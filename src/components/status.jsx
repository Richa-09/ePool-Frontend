import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { withCookies } from 'react-cookie';
import Navbar from './navbar';
import ShowRides from './showRides';
import RequestForm from './requestForm';
var FontAwesome = require('react-fontawesome');

class Status extends Component{

    state = {
      offers: [],
      Interested : null,
      token: this.props.cookies.get('mr-token')
    }
  
    componentDidMount(){
      if(this.state.token) {
        fetch('https://epool-app.herokuapp.com/api/offers/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${this.state.token}`
          }
        }).then( resp => resp.json())
        .then( res => {this.setState({offers: res})
                    console.log(res)})
        .catch( error => console.log(error))
      }
      else {
        window.location.href = '/home';
      }
    }
    
    rideInterested = evt => {
         console.log(evt)
         this.setState({Interested: evt})
    }
  
    render(){
      return (
      <div>
        <Navbar clicked="status" />
        <div className="row">
            <div className="col-9">
              {this.state.offers.map(offer => {
                  return (<div key={offer.id}>
                          <ShowRides offer={offer} rideInterested={this.rideInterested}/>  
                          </div>);
              })}
            </div>
            <div className="col-3">
            <div className="sti">{
              this.state.Interested ? 
               <RequestForm  offer={this.state.Interested} rideInterested={this.rideInterested}
                token={this.state.token}/>
              : null}</div>
            </div>
        </div>
      </div>
      );
    }
  }
  
  export default withCookies(Status);