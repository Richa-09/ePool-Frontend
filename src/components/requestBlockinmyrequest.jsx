import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
var FontAwesome = require('react-fontawesome');

class RequestBlock extends Component {
    state = { 
        asked : this.props.req,
        offerreqsted: [],
        receiver: [],
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

          fetch(`https://epool-app.herokuapp.com/api/users/${this.props.req.receiver}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${this.state.token}`
            }
          }).then( resp => resp.json())
          .then( res => this.setState({receiver: res}))
          .catch( error => console.log(error))
      }


    approved = () => {
        var asked = {...this.state.asked}
        asked.approved = true;
        asked.z = 1;
        this.setState({asked})

        fetch(`https://epool-app.herokuapp.com/api/requests/${this.props.req.id}/`,{
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.asked)
        }).then(resp => resp.json())
                .catch(error => console.log(error))
        
    }

    canceled = () => {
        var asked = {...this.state.asked}
        asked.z = 1;
        this.setState({asked})

        fetch(`https://epool-app.herokuapp.com/api/requests/${this.props.req.id}/`,{
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.asked)
        }).then(resp => resp.json())
                .catch(error => console.log(error))

                window.location='/home';
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
                                    
                                </div>
                                <div className="col-lg-4 col-12 mt-5 bg-dark text-light ml-5 p-5 mx-auto" id="curve">
                                    <span className="time"> <FontAwesome name="rupee-sign"/>{this.state.offerreqsted.price} <span id="cost2">/person</span></span>
                                    <br/>
                                    <span className="time mt-5">Seats requested : {this.props.req.seats_required}</span>
                                   <br/>
                                   <span className="time mt-5">By : {this.state.receiver.username}</span>
                                   <br/>
                                      <button className="btn btn-success" onClick={this.approved}>Approve</button>
                                      <button className="btn btn-warning ml-3" onClick={this.canceled}>Cancel</button>
                                </div>
                            </div>
                        </div>
                </div>
           </div>
        );
    }
}
export default withCookies(RequestBlock);