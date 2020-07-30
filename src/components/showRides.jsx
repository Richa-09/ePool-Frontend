import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
var FontAwesome = require('react-fontawesome');

class ShowRides extends Component {
    state = {
        offered: [],
        token: this.props.cookies.get('mr-token'),
        userid: "",
      }
    
      componentDidMount(){
        fetch('https://epool-app.herokuapp.com/api/user-from-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.state.token}`,
            },
            body: JSON.stringify({'token': this.state.token})
            }).then( resp => resp.json())
            .then(res => {this.setState({userid: res['id']})})
            .catch( error => console.log(error))

          fetch(`https://epool-app.herokuapp.com/api/users/${this.props.offer.by}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${this.state.token}`
            }
          }).then( resp => resp.json())
          .then( res => this.setState({offered: res}))
          .catch( error => console.log(error))
      }

    render() {
        return (
        <div key={this.props.offer.id}>
                
                    <div className="row ml-5 mt-5">
                        <div className="col-10 jumbotron p-3">
                            <div className="row mx-auto">
                                <div className="col-lg-7 col-12 my-auto">
                                    <h2 id="fromto"><FontAwesome name="car"/> {this.props.offer.departure} <FontAwesome name="arrow-right"/> {this.props.offer.destination}</h2>
                                    <br/>
                                    
                                    <span className="time mt-5"> <FontAwesome name="clock"/>   {this.props.offer.time}</span>
                                    <br/>
                                    <span className="time"> <FontAwesome name="calendar-week"/>   {this.props.offer.date}</span>
                                    <br/>
                                    <span className="time"> <FontAwesome name="user"/>{this.state.offered.username}</span>
                                    
                                </div>
                                <div className="col-lg-4 col-12 mt-5 bg-dark text-light ml-5 p-5 mx-auto" id="curve">
                                    <span className="time"> <FontAwesome name="rupee-sign"/>{this.props.offer.price} <span id="cost2">/person</span></span>
                                    <br/>
                                    <span className="time mt-5">{this.props.offer.seats_available} <span id="cost2">seats available</span></span>
                                    <br/>
                                    {this.state.userid===this.props.offer.by ?
                                    null
                                    :
                                      <button onClick={()=>{this.props.rideInterested(this.props.offer)}} className="btn btn-info mt-5">Request this ride</button>
                                    }
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            );
    }
}
export default withCookies(ShowRides);