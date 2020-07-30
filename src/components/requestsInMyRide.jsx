import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './requestsInMyRide.css';
var FontAwesome = require('react-fontawesome');

class Requested extends Component {
    state = {
        offerreqsted: [],
        provider: [],
        token: this.props.cookies.get('mr-token'),
      }
    
      componentDidMount(){

          fetch(`https://epool-app.herokuapp.com/api/offers/${this.props.req.provider}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${this.state.token}`
            }
          }).then( resp => resp.json())
          .then( res => this.setState({offerreqsted: res}))
          .catch( error => console.log(error))

          fetch(`https://epool-app.herokuapp.com/api/users/${this.props.req.pro}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${this.state.token}`
            }
          }).then( resp => resp.json())
          .then( res => this.setState({provider: res}))
          .catch( error => console.log(error))
      }

    render() {
        return (
           <div key={this.props.req.id}>
                    <div className="row ml-5 mt-5">
                        <div className="col-10 jumbotron p-3">
                            <div className="row mx-auto">
                                <div className="col-lg-7 col-12 my-auto">
                                    <h2 id="fromto"><FontAwesome name="car"/> {this.state.offerreqsted.departure} <FontAwesome name="arrow-right"/> {this.state.offerreqsted.destination}</h2>
                                    <br/>
                                    
                                    <span className="time mt-5"> <FontAwesome name="clock"/>   {this.state.offerreqsted.time}</span>
                                    <br/>
                                    <span className="time"> <FontAwesome name="calendar-week"/>   {this.state.offerreqsted.date}</span>
                                    <br/>
                                    <span className="time"> <FontAwesome name="user"/>{this.state.provider.username}</span>
                                    
                                </div>
                                <div className="col-lg-4 col-12 mt-5 bg-dark text-light ml-5 p-5 mx-auto" id="curve">
                                    <span className="time"> <FontAwesome name="rupee-sign"/>{this.state.offerreqsted.price} <span id="cost2">/person</span></span>
                                    <br/>
                                    {this.props.req.z===0 ?
                                      <div className="wait">Waiting for response</div>
                                    :
                                      <div>
                                      {this.props.req.approved===true ? <div className="approved">Approved</div> : <div className="cancelled">Cancelled</div> }
                                      </div>
                                    }
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            );
    }
}
export default withCookies(Requested);