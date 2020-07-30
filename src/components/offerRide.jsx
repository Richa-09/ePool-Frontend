import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './offerRide.css';
import Navbar from './navbar';


class Offerride extends Component {

    state = {
        details: {
            'destination':'',
            'departure':'',
            'date':'',
            'time':'',
            'seats': '',
            'price': '',
        },
        token: this.props.cookies.get('mr-token')
    }

    componentDidMount(){
        if(!this.state.token) {
          window.location.href = '/home';
        }
      }

    inputChanged = event => {
        let det = this.state.details;
        det[event.target.name] = event.target.value;
        this.setState({details: det});
    }

    offerClicked = () => {
            fetch(`https://epool-app.herokuapp.com/api/offers/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.state.token}`
                },
                body: JSON.stringify(this.state.details)
                }).then( resp => resp.json())
                .then(window.location='/status')
                .catch( error => console.log(error))
    }

    render() {
        return (
            <div>
                <Navbar clicked="offerride" />
                <h1 className="offer">Offer a ride!</h1>
                <div className="container mt-5 jumbotron">
                        <div className="form-group">
                                <label for="f1">Destination</label>
                                <input type="text" className="form-control" id="f1" name="destination" value={this.state.details.destination} onChange={this.inputChanged}/>
                        </div>
                        <div className="form-group">
                                <label for="f2">Departure</label>
                                <input type="text" className="form-control" id="f2" name="departure" value={this.state.details.departure} onChange={this.inputChanged}/>
                        </div>
                        <div className="form-group">
                                <label for="f3">Date of Journey</label>
                                <input type="date" className="form-control" id="f3" name="date" value={this.state.details.date} onChange={this.inputChanged}/>
                        </div>
                        <div className="form-group">
                                <label for="f4">Time of departure</label>
                                <input type="time" className="form-control" id="f4" name="time" value={this.state.details.time} onChange={this.inputChanged}/>
                        </div>
                        <div className="form-group">
                                <label for="f6">Seats Available</label>
                                <input type="number" className="form-control" id="f6" name="seats" value={this.state.details.seats} onChange={this.inputChanged}/>
                        </div>
                        <div className="form-group">
                                <label for="f7">Price per seat</label>
                                <input type="number" className="form-control" id="f7" name="price" value={this.state.details.price} onChange={this.inputChanged}/>
                        </div>

                        <button className="btn btn-secondary" onClick={this.offerClicked}>Offer</button>
                       

                </div>
            </div>
        )
    }
}

export default withCookies(Offerride);