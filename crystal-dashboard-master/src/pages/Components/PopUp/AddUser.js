import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import AddAdmin from '../../Forms/addAdminOrganization';
import AddUser from '../../Forms/addUser';
class Modal extends Component {
    state = {
        showPopup: false
      };
    togglePopup = () => {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
    render(){
        return(
    <Popup
      trigger={<button className="button"> {localStorage.getItem('admin') ? 'Add Admin': 'Add User'} </button>}
      modal
      closeOnDocumentClick
    >
      {localStorage.getItem('admin') ?
     <AddAdmin /> : <AddUser/>}
    </Popup>
  );
    }
}
export default Modal;