import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';

class UserInfo extends Component {
  state = {
    isShowingUserMenu: false
  };
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const photo_id = user.avatar;
    let src = null;
    if(photo_id)
     src = `https://dev.api.pixastudio.us/image-upload/${photo_id}`
    return (
      <div className="user-wrapper">
        <a href='/admin/profile' className="user">
          <img src={src} alt={user.name} className="photo" />
          <div className="userinfo">
            <div style={{'color':"#fff"}} className="username">
              {user.name}
            </div>
            <div  style={{'color':"#fff"}} className="title">Admin</div>
          </div>
          </a>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(UserInfo);