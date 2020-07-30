import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './login.css';
import Navbar from './navbar';

class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        text: '',
    }
    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }
    login = () => {
            fetch(`https://epool-app.herokuapp.com/auth/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                        this.props.cookies.set('mr-token', res.token);
                        window.location='/home';
                        this.setState({credText: 'Incorrect username/password'});
                })
                .catch( error => console.log(error))
    }

    render(){
        return (
        <div>
        <Navbar clicked="login" />
        <div className="login container jumbotron">
            <h1 className="head">Login</h1>
            <span>Username</span><br/>
                <input type="text" name="username" value={this.state.credentials.username} 
                    onChange={this.inputChanged} /><br/>
            <span>Password</span><br/>
                <input type="password" name="password" value={this.state.credentials.password} 
                    onChange={this.inputChanged} /><br/>
            <button onClick={this.login}>Login</button>
            <p onClick={()=> {window.location='/signup'}}>Create Account</p>
            <span>{this.state.text}</span>
        </div>
        </div>
        );
    }
}

export default withCookies(Login);