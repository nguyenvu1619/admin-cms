import React, { Component} from 'react';
import AccountKit from 'react-facebook-account-kit'

class ResetPassword extends Component {
    state = {
        password: ""
      }
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      render() {
        return (
            <form className= 'login'>
                <h3>Reset your password</h3>
                <label>New Password</label>
                <input id ='password-log-in'
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleChange}
              /><br/>
            <AccountKit
            appId="697135597383623" // Update this!
            version="v1.1" // Version must be in form v{major}.{minor}
            onResponse={(resp) => console.log(resp)}
            csrf={'pixavn'} // Required for security
          >
            {p => <button {...p}>Reset </button>}
          </AccountKit>
          </form>
        )
      }
};



export default ResetPassword;