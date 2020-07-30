import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';
import { withCookies } from 'react-cookie';
var FontAwesome = require('react-fontawesome');

class Navbar extends Component {
    state = { 
        token : this.props.cookies.get('mr-token'),
        name: "",
    }

    clickedFunction = evt =>{
        window.location.href = `/${evt.target.name}`;
    }
    logoutClicked = () =>{
        this.props.cookies.remove('mr-token');
        window.location='/home';
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
            .then(res => {this.setState({name: res['username']})})
            .catch( error => console.log(error))
    }

    render() { 
        return ( 
            <div className="navy">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
                <a className="navbar-brand pl-4" id="nbrand" name="home" onClick={this.clickedFunction}>ePool</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>                
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto mr-auto">
                        <li className={this.props.clicked === "home" ? "active nav-item" : "nav-item"}>
                            <a className="nav-link" name="home" onClick={this.clickedFunction}>Home</a>
                        </li>
                        <li className={this.props.clicked === "status" ? "active nav-item" : "nav-item"}>
                            <a className="nav-link" name="status" onClick={this.clickedFunction}>Status</a>
                        </li>
                        <li className={this.props.clicked === "offerride" ? "active nav-item" : "nav-item"}>
                            <a className="nav-link" name="offerride" onClick={this.clickedFunction}>Offer a Ride</a>
                        </li>
                    </ul>

                    {this.state.token ? 
                    <ul className="navbar-nav mr-auto ml-auto">
                        <li>
                            <div id="username" className="mt-3 mb-2">{this.state.name}</div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesome name="caret-square-down"/>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">       
                                <a className="dropdown-item" name="myrides" onClick={() => {window.location='/myrides'}}> My Rides</a>
                                <a className="dropdown-item" name="ur" onClick={() => {window.location='/riderequests'}}>Ride Requests</a> 
                                <a className="dropdown-item" name="logout" onClick={this.logoutClicked}> Logout</a>
                           </div>
                       </li>
                    </ul>
                    :
                    <ul className="navbar-nav mr-auto ml-auto">
                        <li className={this.props.clicked === "login" ? "active nav-item" : "nav-item"}>
                            <a className="nav-link" name="login" onClick={()=> {window.location='/login'}}>Login</a>
                        </li>
                    </ul>
                    }
                </div>
                </nav>       
        </div>
     );
    }
}
 
export default withCookies(Navbar);