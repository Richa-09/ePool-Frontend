import React, { Component } from 'react';
import './requestForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import { withCookies } from 'react-cookie';
var FontAwesome = require('react-fontawesome');

class RequestForm extends Component {
    state = { 
        val: {
            'description': '',
            'seats_req': '', 
            'pickup_location': '',
            'offer_id' : '',
        },
     }

    inputChanged = event => {
        let v = this.state.val;
        v[event.target.name] = event.target.value;
        this.setState({val: v});
    }

    sendRequest = () => {
        let v = this.state.val;
        v.offer_id = this.props.offer.id;
        this.setState({val: v});
        fetch(`https://epool-app.herokuapp.com/api/requests/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.props.token}`
                },
                body: JSON.stringify(this.state.val)
                }).then( resp => resp.json())
                .then(res=> console.log(res))
                .catch( error => console.log(error))
    }
    
    render() { 
        const isDisabled = this.state.val.description.length===0 || this.state.val.seats_req.length===0;
        return ( 
            <div className="request mr-5">
                <div className="container mt-5 jumbotron bg-dark text-light pt-4">
                        <h2 className="mb-5">{this.props.offer.departure} <FontAwesome name="arrow-right"/> {this.props.offer.destination}</h2>
                        <div className="form-group">
                                <label for="f1">Pick-Up Location</label>
                                <input type="text" className="form-control" id="f1" name="pickup_location" value={this.state.val.pickup_location} onChange={this.inputChanged}/>
                        </div>
                        <div className="form-group">
                                <label for="f1">Seats Required</label>
                                <input type="number" className="form-control" id="f1" name="seats_req" value={this.state.val.seats_req} onChange={this.inputChanged}/>
                        </div>
                        <div className="form-group">
                                <label for="f1">Description</label>
                                <input type="text" className="form-control" id="f1" name="description" value={this.state.val.description} onChange={this.inputChanged}/>
                        </div>
                        <button className="btn btn-success" onClick={this.sendRequest} disabled={isDisabled}>Submit</button>
                       
                        <button className="btn btn-warning ml-3" onClick={()=>{this.props.rideInterested(null)}}>Cancel</button>
                </div>

            </div>
         );
    }
}
 
export default withCookies(RequestForm);