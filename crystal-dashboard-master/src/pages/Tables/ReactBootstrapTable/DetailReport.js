import React, { Component } from 'react';
import Function from '../../../function';
import axios from 'axios';
import CheckIn from '../../../assets/images/new_logo.png';

const SERVER_API = 'https://dev.api.pixastudio.us';
const DOWNLOAD_IMG = '/image-upload/';

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function timeFormat(cell){
  const value = new Date(cell);
  const date = value.toLocaleDateString('en-US');
  const h = addZero(value.getHours());
  const m = addZero(value.getMinutes());
  const s = addZero(value.getSeconds());
  return `${h}:${m}:${s}, ${date}`;
}

class DetailReport extends Component {
  constructor() {
    super();
    this.state= {
      data: {}
  }
}
    componentDidMount = async () => {
      const token = localStorage.getItem("token");
      const urlArray = (window.location.href).split('/');
      const id = urlArray[urlArray.length-1];  
      const detail = await axios.get(`http://localhost:3001/v1/organization/report/${id}`,{
        'headers': { authorization : token}
      });
      if(detail){
        const { data } = detail.data;
        data.check_in_time = timeFormat(data.check_in_time);
        data.check_out_time =  timeFormat(data.check_out_time);
        this.setState({data});
        console.log(this.state.data);
      }
    }
    render() {
        const data = this.state.data.hasOwnProperty('card_id') ? 
          this.state.data : false; 
        const check_in_info =  data ? `${data.check_in_time} - ${data.checked_in_by.name}` : '';
        const check_out_info =  data ? `${data.check_out_time} - ${data.checked_out_by.name}` : '';
        return (
            <div style = {{width: '80%', marginLeft: 'auto', marginRight: 'auto'}} className="card">
            <div className="header" style={{'marginTop': '50px'}}>
              <h4  className="title">CHECK IN CHECK OUT DETAIL</h4>
            </div>
            <div className="content">
                <div className="row" style= {{fontSize: '18px'}}>
                  <div  className="col-md-4">
                      <div>
                        <span style={{color: 'red'}}>Card ID: </span> {  data.card_id }
                      </div>
                      <div>
                      <span style={{color: 'red'}}>Price: </span> {data? Function.priceFormat(data.price) : 0 }
                      </div>
                  </div> 
    </div>
    <div style={{marginTop: '40px'}} className="row">
                  <div  className='col-md-6'>
                    <div id='check-in-out-title'>
                     CHECK IN
                      </div>
                    <div id='border-check-in'style={{borderRight: '1px solid black'}} >
                     
                  <img style={{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '70%'}} src ={`${SERVER_API+DOWNLOAD_IMG+data.check_in_photo}`}/>                                    
                  <div className='text-check-in-out'>
                  <div style= {{fontSize: '16px',width:'100%'}}  >
                   {check_in_info}
                  </div>
                 
                  </div>
                  </div>
                  </div>
                  <div className="col-md-6">
                      <div id='check-in-out-title'>
                       CHECK OUT
                      </div>
                      
                  <img style={{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '70%'}} src = {`${SERVER_API+DOWNLOAD_IMG+data.check_in_photo}`}/>                  
                  <div className='text-check-in-out'>
                      <div style= {{fontSize: '16px',width:'100%'}}  >
                    {check_out_info}
                  </div>
                  <div style= {{fontSize: '16px',width:'100%'}} >
                     
                  </div>
                  </div>
                  </div>
    </div>
  </div>
  </div>
        )
    }
}
export default DetailReport;