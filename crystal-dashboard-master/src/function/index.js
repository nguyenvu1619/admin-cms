
import React from 'react';
import Switch from '../components/Switch';

const SERVER_API = 'https://dev.api.pixastudio.us';
const DOWNLOAD_IMG = '/image-upload/'

const Function = {
    priceFormat: (value) => {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${value} VNĐ`;
    },

    dateFormat: (value) => {
      const date = new Date(value);
      return date.toLocaleDateString('en-US')
    },
    timeFormat: (value) => {
    const dateObject = new Date(value);
    const date = dateObject.toLocaleDateString('en-US');
    const h = addZero(dateObject.getHours());
    const m = addZero(dateObject.getMinutes());
    const s = addZero(dateObject.getSeconds());
    return `${h}:${m}:${s}, ${date}`;
  },
  imageFormat: (value)=>{
    return <img src={SERVER_API+DOWNLOAD_IMG+value}/> ;
  },
  activeFormat: (cell) => {
    return <Switch value={cell} />
  },
  isEmpty: (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
}
function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

export default Function;