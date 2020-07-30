import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import Navbar from './navbar';
import RequestBlock from './requestBlockinmyrequest';

class RideRequests extends Component {

    state = {
        requests: [],
        val: '',
        token: this.props.cookies.get('mr-token')
    }
    
    componentDidMount(){
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
            .then(res => {this.setState({val: res.id})})
            .catch( error => console.log(error))

        }

    render() {
        return (
        <div>
        <Navbar />
        <div className="row">
            <div className="col">
              {this.state.requests.map(req =>
                {if(req.pro===this.state.val && req.z===0) {
                  return (
                       <div key={req.id}>
                          <RequestBlock req={req} token={this.state.token}/>  
                       </div>);
                  }}
                )
              }
            </div>
        </div>
        </div>
        );
    }
}

export default withCookies(RideRequests);
