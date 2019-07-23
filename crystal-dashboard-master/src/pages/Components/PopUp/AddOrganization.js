import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import AddOrganization from '../../Forms/addOrganization';
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
      trigger={<button className="button"> Add Organization </button>}
      modal
      closeOnDocumentClick
    >
     <AddOrganization />
    </Popup>
  );
    }
}
export default Modal;