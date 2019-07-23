import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import Axios from 'axios'

import _ from 'lodash';


  function readURL(event) {
    const tgt = event.target || window.event.srcElement,
          files = tgt.files;
          if (FileReader && files && files.length) {
            var reader = new FileReader();
            reader.onload = function (e) {
              document.getElementById('myimg').setAttribute('src',e.target.result);
          }
          reader.readAsDataURL(files[0]);
        }
    
        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
  }

const validate = values => {
  const errors = {};
  console.log(values);
  console.log(isNaN(values.limit));
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (values.phone && isNaN(values.phone)) {
    errors.phone = 'Please enter a number';
  }
  if (!values.phone) {
    errors.phone = 'This field is required';
  }
  if (!values.organization_code) {
    errors.code = 'This field is required';
  }
  if (!values.organization_name) {
    errors.name = 'This field is required';
  }
 
  return errors;
}

class AddOrganization extends Component{
  state = {
    name : '',
    email: '',
    phone: '',
    address: '',
    code: '',
    limit: 0,
    error: {}
  }
  showNotification = this.showNotification.bind(this);
  showNotification(level, message) {
    this.notificationSystem.addNotification({
      message,
      level,
      autoDismiss: 3,
      position: 'tc'
    });
  }
  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    await this.setState({error : validate(this.state)});
    if(!_.isEmpty(this.state.error))
    return
    const token = localStorage.getItem("token");
    const resultAddUser = await Axios.post('http://localhost:3001/v1/organization/add-organization',this.state,{
      headers: {Authorization: token}
    });
    console.log(resultAddUser);
    if(resultAddUser.data.status){
    this.showNotification('success','New organization has been added');
    } else {
      this.showNotification('error',resultAddUser.data.message);
    }
  }

  handleChange = event => {
    this.setState({                 
        [event.target.name]: event.target.value   
  });
}
    render(){
      return(
    <div className="row">
      <div className="col-md-12">
        <div style={{width: '100%',marginLeft:'auto',marginRight:'auto'}} className="card">
          <div className="header"><h4>Organization Infomation</h4></div>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="content">
              <div className="form-group">
              <label className="col-sm-3 control-label">Organization Name <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="organization_name"
                    className='form-control'
                    onChange = {this.handleChange}
                    />
                     <label className="error" for="required">{this.state.error.name}</label>
                </div>
              </div>

              <div className="form-group">
              <label className="col-sm-3 control-label">Organization Code <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="organization_code"
                    onChange = {this.handleChange}
                    className='form-control' />
               <label className="error" for="required">{this.state.error.code}</label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Address</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="address"
                    onChange = {this.handleChange}
                    className='form-control' />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    name="email"
                    onChange = {this.handleChange}
                    className='form-control' />
                    <label className="error" for="required">{this.state.error.email}</label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Phone <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="phone"
                    onChange = {this.handleChange}
                    className='form-control'/>
                    <label className="error" for="required">{this.state.error.phone}</label>
                </div>
                </div>
            </div>
            <div className="footer text-center">
              <button type="submit" className="btn btn-success btn-fill btn-wd">ADD</button>
            </div>
          </form>
          <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
        </div>
      </div>
    </div>
  );
      }
    }

export default AddOrganization;