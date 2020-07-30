import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './myRides.css';
import Navbar from './navbar';
import Offered from './offersInMyRide';
import Requested from './requestsInMyRide';

class MyRides extends Component {

        state = {
            offers: [],
            requests: [],
            val: [],
            token: this.props.cookies.get('mr-token')
        }
        
        componentDidMount() { 

            fetch('https://epool-app.herokuapp.com/api/offers/', {
                method: 'GET',
                headers: {
                  'Authorization': `Token ${this.state.token}`
                }
                }).then( resp => resp.json())
                .then( res => this.setState({offers: res}))
                .catch( error => console.log(error))

            fetch('https://epool-app.herokuapp.com/api/requests/', {
                method: 'GET',
                headers: {
                  'Authorization': `Token ${this.state.token}`
                }
                }).then( resp => resp.json())
                .then( res => this.setState({requests: res}))
                .catch( error => console.log(error))
    
            fetch('https://epool-app.herokuapp.com/api/user-from-token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.state.token}`,
                },
                body: JSON.stringify({'token': this.state.token})
                }).then( resp => resp.json())
                .then(res => {this.setState({val: res})})
                .catch( error => console.log(error))
            }
    render(){
        return (
        <div>
          <Navbar />
          <div className="row">
             <div className="col-6">
                 <span className="above">My Offered Rides</span>
              {this.state.offers.map(offer => {
                  if(offer.by===this.state.val.id) {
                  return (<div key={offer.id}>
                          <Offered offer={offer} userdetails={this.state.val} />  
                          </div>);
                  }
              })}
             </div>
             <div className="col-6">
             <span className="above">My Requested Rides</span>
             {this.state.requests.map(req => 
             {if(req.receiver===this.state.val.id) {
                return (
                     <div key={req.id}>
                        <Requested req={req} userdetails={this.state.val}/>  
                     </div>);
                }}
              )}
           </div>
        </div>

        </div>
        );
    }
}

export default withCookies(MyRides);