import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './navbar';

class Signup extends Component {
    state = {
        credentials : {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
        },
        text: '',
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }
    signUp = () => {
            fetch(`https://epool-app.herokuapp.com/api/users/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                    if(res.id !== undefined){
                        window.location='/login';
                        } else{
                            this.setState({text: 'Incorrect username/password'});
                        }
                })
                .catch( error => console.log(error))
    }


    render () {
        return (
            <div>
            <Navbar clicked="login" />
            <div className="signup-container">
            <h1>Register</h1>
            <span>Username</span><br/>
                <input type="text" name="username" value={this.state.credentials.username} 
                    onChange={this.inputChanged} /><br/>
            <span>First Name</span><br/>
                <input type="text" name="first_name" value={this.state.credentials.first_name} 
                    onChange={this.inputChanged} /><br/>
            <span>Last Name</span><br/>
                <input type="text" name="last_name" value={this.state.credentials.last_name} 
                    onChange={this.inputChanged} /><br/>
            <span>Email</span><br/>
                <input type="email" name="email" value={this.state.credentials.email} 
                    onChange={this.inputChanged} /><br/>
            <span>Password</span><br/>
                <input type="password" name="password" value={this.state.credentials.password} 
                    onChange={this.inputChanged} /><br/>
            <button onClick={this.signUp}>Register</button>
            <p>Login</p>
            <span>{this.state.text}</span>
        </div>
        </div>
    
        );
    }
}

export default withCookies(Signup);