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
  if (!values.organization_name) {
    errors.organization_name = 'This field is required';
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
    limit_card: '100',
    out_date: '3',
    password: '',
    confirm: '',
    organization_code: '',
    organization_name: '',
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
  componentDidMount = async () => {
      if(localStorage.getItem('admin')){
      const token = localStorage.getItem("token");
      const organization_list = await Axios.get('http://localhost:3001/v1/organization/organization-list',{
        headers: { Authorization: token }
      })
      console.log(organization_list)
      if(organization_list.data.status){
        this.setState({
          organization_list: organization_list.data.data,
          organization_name: organization_list.data.data[0].organization_name
        })
      }
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log(new Date().getTimezoneOffset());
    this.setState({error : validate(this.state)});
    if(this.state.avatarFile){
    const formImage = new FormData();
    formImage.append('photos',this.state.avatarFile);
    const resultUploadImg = await Axios.post('https://dev.api.pixastudio.us/v1/photo/upload-photo',
    formImage,{
      headers: {Timezone: new Date().getTimezoneOffset()}
    }
    );
    console.log(resultUploadImg);
    if(resultUploadImg){
      console.log(typeof resultUploadImg.data.status);
    
      if(resultUploadImg.data.status){
        await this.setState({ photo_id:resultUploadImg.data.data[0] });
      }
    }
  }
        const token = localStorage.getItem("token");
        if(!localStorage.getItem('admin')){
        const user = JSON.parse(localStorage.getItem('user'));
        await this.setState({organization_id: user.organization_id});
        }
        const resultAddUser = await Axios.post('http://localhost:3001/v1/user',this.state,{
          headers: {Authorization: token}
        });
        console.log(resultAddUser.data);
        if(resultAddUser.data.status){
          this.showNotification('success','New admin organization has been added');
          } else {
            this.showNotification('error',resultAddUser.data.message);
          }
    }
  OrganizationList = () =>{
    
  }
  handleChange = event => {
    if(event.target.name === 'avatarFile'){
      readURL(event)
      this.setState({                 
        avatarFile: event.target.files[0]
  });
  }  else {
    this.setState({                 
        [event.target.name]: event.target.value   
  });
}
console.log(this.state)
  }
    render(){
      const list = this.state.organization_list;
      return(
    <div className="row">
      <div className="col-md-12">
      <div style={{width: '100%',marginLeft:'auto',marginRight:'auto'}} className="card">
          <div className="header"><h4>ADD ADMIN ORGANIZATION</h4></div>
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
              <div className="form-group">                
                <label className="col-sm-3 control-label">Organization Name <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-sm-9">
                  <select
                    name="organization_name"
                    onChange = {this.handleChange}
                    className='form-control'>
                      {_.isUndefined(list) ? <option></option> : list.map(ele => 
                      <option key={ele.organization_code} code={ele.organization_code}>
                      {ele.organization_name}
                      </option>)}
                    </select>
                    <label className="error" for="required">{this.state.error.organization_name}</label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Limit Card <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-md-3">
                  <select
                    name="limit_card"
                    onChange={this.handleChange}
                    className= 'form-control'
                  >
                    <option>
                      100
                    </option>
                    <option>
                      200
                    </option><option>
                      300
                    </option>
                    <option>
                      400
                    </option>
                    <option>
                      500
                    </option>
                    <option>
                      600
                    </option>
                    <option>
                      700
                    </option>
                    <option>
                      800
                    </option>
                    <option>
                      900
                    </option>
                    <option>
                      1000
                    </option>
                  </select>
                    <label className="error" for="required">{this.state.error.limit}</label>
                </div>
                <label className="col-sm-2 control-label">Time <span style={{'color': 'red'}}>(*)</span></label>
                <div className="col-md-3">
                  <select
                    name="out_date"
                    onChange={this.handleChange}
                    className= 'form-control'
                  >
                    <option value='3'>
                      3 months
                    </option>
                    <option value='6'>
                      6 months
                    </option>
                    <option value='1'>
                      1 year
                    </option>
                    <option value='2'>
                      2 years
                    </option>
                  </select>
                    <label className="error" for="required">{this.state.error.limit}</label>
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