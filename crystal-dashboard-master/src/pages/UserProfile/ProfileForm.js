import React, { Component } from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';

function calDate(date1, date2){
  const diffTime = Math.abs(date1.getTime()-date2.getTime());
  const year = Math.floor(diffTime/(365*24*60*60*1000));
  const month = Math.floor((diffTime-year*365*24*60*60*1000)/(30*24*60*60*1000));
  const day = Math.floor((diffTime-year*365*24*60*60*1000-month*30*24*60*60*1000)/(30*24*60*60*1000));
  let string = '';
  if(day> 1){
    string = string.concat(`${day} days`);
  } else 
    {
    string = string.concat(` ${day} day`);
  }
  if(month> 1){
    string = string.concat(` ${month} months`);
  } else 
    {
    string = string.concat(` ${month} month`);
  }
  if(year> 1){
    string = string.concat(` ${year} years`);
  } else 
    {
    string = string.concat(` ${year} day`);
  }
  return string;
}
class ProfileForm extends Component {
  constructor() {
    super();
    this.state= {
      data: {},
      name: '',
      phone: '',
      email: ''
  }
    this.showNotification = this.showNotification.bind(this);
  }

  showNotification(position) {
    this.notificationSystem.addNotification({
      message: 'Your profile has been updated',
      level: 'success',
      autoDismiss: 2,
      position
    });
  }
  handleChange= event =>{
    this.setState({
        [event.target.name]: event.target.value
    });
  }
  handleSubmit =async event => {
    event.preventDefault();
    const data = {};
    let photo_id = '';
    data.name = this.state.name;
    data.phone = this.state.phone;
    data.email = this.state.email;
    if(this.props.src){
      const imageForm = new FormData();
      imageForm.append('photos', this.props.src);
      const resultUploadImg = await axios.
              post('https://dev.api.pixastudio.us/v1/photo/upload-photo',
              imageForm     
      );
      console.log(resultUploadImg);
      if(resultUploadImg){
        if(resultUploadImg.data.status){
          photo_id = resultUploadImg.data.data[0];
          console.log(photo_id)
        }
      }
    }
    if(!this.props.isAdmin){
      const urlArray = (window.location.href).split('/');
      const user_id = urlArray[urlArray.length-1]; 
      data.user_id = user_id;
    }
    if(photo_id)
      data.photo_id = photo_id;
    const token = localStorage.getItem('token');
    const result = await axios.post('http://localhost:3001/v1/user/update', data, {
      headers: {Authorization : token }
    });
    if(result){
      console.log(result);
      const userLogin = JSON.stringify(result.data.data);
      localStorage.setItem("user", userLogin);
    };
    this.showNotification('tc');
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if(this.props.isAdmin){
    const data = await axios.get("http://localhost:3001/v1/user/profile",{
      'headers': {'authorization': token }
    });
      if(data)
      {
        const user =data.data.data;
        user.createdAt = new Date(user.createdAt);
        user.time_left = calDate(new Date(), new Date(user.out_date));
        await this.setState({items: user});
        console.log(user);  
      }
    } else {
      const urlArray = (window.location.href).split('/');
      const user_id = urlArray[urlArray.length-1]; 
      
      const data = await axios.get(`http://localhost:3001/v1/user/profile/${user_id}`,{
      'headers': {'authorization': token }
    });
      if(data)
      {
        const user =data.data.data;
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.updatedAt);
        user.createdAt = user.createdAt.toLocaleDateString('en-US');
        user.updatedAt = user.updatedAt.toLocaleDateString('en-US');
        this.setState({items: user})
      }
    }
  }
  render() {
    console.log(localStorage.getItem('admin'))
    const { items } = this.state;
    console.log(items);
    const isAdmin = this.props.isAdmin;
    if(items){
    return(
     <div className="card">
    <div className="header" style={{'marginTop': '50px'}}>
      <h4 className="title">My Profile</h4>
    </div>
    <div className="content">
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div className="row">
          <div className="col-md-5">
            <div className="form-group">
              <label>Full Name</label>
              <input name='name' type="text" className="form-control" disabled="" placeholder="Full Name" defaultValue={items.name} />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="phone" className="form-control" defaultValue={this.state.items.phone} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" name="email" className="form-control" placeholder="Email" defaultValue={items.email} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="form-group">
              <label>Organization Name</label>
              <input type="text" className="form-control" readOnly placeholder="Company" defaultValue={items.organization_id? items.organization_id.organization_name : ''} />
            </div>
          </div>
          {!isAdmin ? (
            <div className="col-md-4">
            <div className="form-group">
              <label>User ID</label>
              <input type="text" className="form-control" readOnly placeholder="User ID" defaultValue={items._id} />
            </div>
          </div>
          ) :(
            <div></div>
          )}
        </div>
        {isAdmin ? (
          <div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Limit Card</label>
              <input type="text" className="form-control" readOnly placeholder="Limit card" defaultValue={items.limit_card} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Effective Card</label>
              <input type="text" className="form-control" readOnly placeholder="Effective Card" defaultValue={items.effective_card} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <br></br>
        <button type="button" className="btn btn-danger btn-fill pull-center">More User Account</button>              
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>Time Left</label>
            <input type="text" className="form-control" readOnly placeholder="User Added" defaultValue={items.time_left} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <br></br>
          </div>
        </div>
      </div>
      </div>
        ) :(
          <div>
            <div className="row">
          <div className="col-md-2">
            <div className="form-group">
              <label>Create At</label>
              <input type="text" className="form-control" readOnly placeholder="Create At" defaultValue={items.createdAt} />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label>Update At</label>
              <input type="text" className="form-control" readOnly placeholder="Update At" defaultValue={items.updatedAt} />
            </div>
          </div>
          </div>
          </div>
        )}
        <div style={{'overflow':'auto'}} className='footer text-center'>
        <button type="submit" name='Submit' className="btn btn-info btn-fill">Update Profile</button>
        </div>
        <div className="clearfix"></div>
      </form>
      <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
    </div>
  </div>
)
    } else return <div></div>
}
}

export default ProfileForm;