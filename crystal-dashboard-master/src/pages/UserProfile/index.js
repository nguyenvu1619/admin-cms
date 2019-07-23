import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import axios from 'axios';

const style = {
  'position': 'absolute',
  'left':'35%',
  "width": '30%',
  "height": '150px',
  "zIndex": "2",
  "top": "-100px",
  'display': 'inlineBlock',
  'textAlign': 'center',
  'color': 'black',
  'overflow': 'hidden'
}
const styleText = {
  "fontSize": '20px',
  "textAlgin": "center",
  'position': 'absolute',
  'bottom': '75px',
  'width': '100%',
  'paddingTop': '10px',
  'margin' : '0'
}
function buildFileSelector(){
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('id', 'file');
  fileSelector.setAttribute('accept', 'image/*');
  fileSelector.onchange = (e) => {
    const files = e.target.files;
    if (FileReader && files && files.length) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('img-avatar').setAttribute('src',e.target.result);
    }
    reader.readAsDataURL(files[0]);
  }
}
  return fileSelector;
}
class UserProfile extends Component {
  state = {
    src: '',
    fileSelector: '',
    file: ''
  }
async componentDidMount(){
  this.setState({fileSelector : buildFileSelector()});
  this.nv.addEventListener('load', this.handleFileChange);
  const token = localStorage.getItem("token");
  if(!this.props.isAdmin) {
    const urlArray = (window.location.href).split('/');
    const user_id = urlArray[urlArray.length-1]; 
    
    const data = await axios.get(`http://localhost:3001/v1/user/profile/${user_id}`,{
    'headers': {'authorization': token }
  });
    if(data)
    {
      const user =data.data.data;
      this.setState({src: user.avatar})
    }
  }
}
handleAvatarImage = (value) => {
  console.log(value)
}
handleFileSelect = (e) => {
 this.state.fileSelector.click();
}
handleFileChange = (event) => {
 this.setState({file : this.state.fileSelector.files[0]});
}
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const photo_id = this.state.src ? this.state.src : user.avatar;
    const src = `https://dev.api.pixastudio.us/image-upload/${photo_id}`;
  return (
  <div className="content">
    <div className="container-fluid">
      <div style={{'position': 'relative','marginTop': '100px'}} className="row">
        
      <div style={{"zIndex": "1",'width':'60%','marginLeft':'20%'}} className="col-md-8">
      <div  onClick={this.handleFileSelect.bind(this)} style={style} id='avatar-img'>
        <img ref={elem => this.nv = elem}   id='img-avatar' style={{'width':'150px','height':'150px','margin':'auto'}}   src={src}>
        </img>
       <p id ='avatar' style={styleText}>Change Avatar</p>
        </div>
        <ProfileForm avatar={this.handleAvatarImage} src={this.state.file? this.state.file:''} isAdmin={this.props.isAdmin} />
      </div>
    </div>
    </div>
  </div>
  )
  }
}


export default UserProfile;