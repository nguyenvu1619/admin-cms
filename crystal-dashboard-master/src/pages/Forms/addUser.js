import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import defaultAvatar from 'assets/images/default-avatar.png';
import NotificationSystem from 'react-notification-system';

import Axios from 'axios'

import _ from 'lodash';

const styleImage = {
  'width': '200px',
  'height': '200px',
  'margin-right':'600px'
  }
  const styleInput = {
  }
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
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (values.phone_number && _.isNaN(values.number)) {
    errors.phone_number = 'Please enter a number';
  }
  if (!values.phone) {
    errors.phone = 'This field is required';
  }
  if(!values.password)
  {
    errors.password = 'This field is required';
  }
  if (values.password && values.password !== values.confirm) {
    errors.confirm = 'Does not match';
  }
  return errors;
}

class AddUser extends Component{
  state = {
    name : '',
    email: '',
    phone: '',
    photo_id: '',
    avatarFile: '',
    password: '',
    confirm: '',
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
    this.setState({error : validate(this.state)});
    if(this.state.avatarFile){
    const formImage = new FormData();
    formImage.append('photos',this.state.avatarFile);
    const resultUploadImg = await Axios.
    post('https://dev.api.pixastudio.us/v1/photo/upload-photo',
    formImage
    );
    if(resultUploadImg){
      console.log(resultUploadImg);
      
      if(resultUploadImg.data.status){
        const photo_id = resultUploadImg.data.data[0];
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({organization_id: user.organization_id});
        this.setState({ photo_id:photo_id });
        const resultAddUser = await Axios.post('http://localhost:3001/v1/user',this.state,{
          headers: {Authorization: token}
        });
        if(resultAddUser.data.status){
          this.showNotification('success','New user has been added');
          console.log(resultAddUser);
          } else {
            this.showNotification('error',resultAddUser.data.message);
          }
      }
    }
  } else {
    const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({organization_id: user.organization_id});
        const resultAddUser = await Axios.post('http://localhost:3001/v1/user',this.state,{
          headers: {Authorization: token}
        });
        if(resultAddUser.data.status){
          this.showNotification('success','New user has been added');
          } else {
            this.showNotification('error',resultAddUser.data.message);
          }
  }
  }
  handleChange = event => {
    if(event.target.name === 'avatarFile'){
      readURL(event)
      this.setState({                 
        avatarFile: event.target.files[0]
  });
    } else {
    this.setState({                 
        [event.target.name]: event.target.value   
  });
}
  }
    render(){
      return(
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="header"><h4>ADD USER</h4></div>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="content">
              <div className="form-group">
                <label className="col-sm-3 control-label">Full Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="name"
                    className='form-control'
                    onChange = {this.handleChange}
                    />
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
                <label className="col-sm-3 control-label">PHONE NUMBER <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="phone"
                    onChange = {this.handleChange}
                    className='form-control'/>
                    <label className="error" for="required">{this.state.error.phone}</label>
                </div>
              </div>
              <div>
              <div className="form-group">
              <label className="col-sm-3 control-label">AVATAR</label>
                <div className="col-sm-9">
                <img style={styleImage} src={defaultAvatar}  id="myimg" />
                </div>
                </div>
                <div className="form-group">
                <label className="col-sm-3 control-label"></label>
                <div className="col-sm-9"></div>
                <div className="col-sm-9">
                <input  type='file' style={styleInput}  name='avatarFile' size = '50' onChange={this.handleChange}/>
                </div>
                </div>
                </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">PASSWORD <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    onChange = {this.handleChange}
                    name="password"
                    className='form-control' />
                     <label className="error" for="required">{this.state.error.password}</label>
                </div>
                </div>
                <div className="form-group">
                <label className="col-sm-3 control-label">CONFIRM PASSWORD <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    name="confirm"
                    className='form-control'
                    onChange={this.handleChange} />
                     <label className="error" for="required">{this.state.error.confirm}</label>
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

export default AddUser;