import React, { Component } from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';


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
      console.log(data.photo_id)
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
        this.setState({items: user})
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
    
    const { items } = this.state;
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