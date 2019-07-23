import React, { Component} from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../reducers/Auth';
import axios from 'axios';
import { any } from 'prop-types';

class Authorization extends Component {
    state = {
        phone: "",
        password: "",
        error: 0
      }
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      handleSubmit = async event => {
        if(this.state.phone.length === 0){
          this.setState({error: 1});
          event.preventDefault();
          return;
        }
        if(this.state.password.length === 0){
          this.setState({error: 2});
          event.preventDefault();
          return;
        }
        this.setState({error: ''});
        event.preventDefault();
        const user = {};
        user.phone = this.state.phone;
        user.password = this.state.password;
        const result = await axios.post("http://localhost:3001/v1/auth/login",user);
        if(result){
          if(result.data.status)
          {
          const userLogin = JSON.stringify(result.data.data);
          localStorage.setItem("token", result.data.data.token);
          localStorage.setItem("user", userLogin);
          
          if(result.data.data.is_super_admin){
            localStorage.setItem("admin",'true');
          }
          window.location.replace('http://localhost:3000/admin/home');
          }
          else {
            this.setState({error: 3});
          }
        }
      }
      render() {
        return (
          <form className= 'login' onSubmit={this.handleSubmit}>
            <h3>Log In to Your Account</h3>
                <label>Phone</label>
            <input style={{marginBottom: '-20px;'}} id='phone-log-in'
              name='phone'
              placeholder='Phone'
              value={this.state.phone}
              onChange={this.handleChange}
              />
              <label style={{color: 'red',marginTop: '-20px;'}}>
                {this.state.error === 1 ? 'Please enter your phone number': ' '}
              </label>
              <label style={{color: 'red',marginTop: '-20px;'}}>
                {this.state.error === 3 ? 'Phone number or password incorrect': ''}
              </label>
            <label>Password</label>
            <input id ='password-log-in'
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleChange}
              />
              <label style={{color: 'red',marginTop: '-20px;'}}>
                {this.state.error === 2 ? 'Please enter your password': ' '}
              </label>
              <div>
            <a href='./reset-password'>Forgot Password?</a>
            <input type='submit' value='Login'/>
            </div>
          </form>
        )
      }
};



export default Authorization;