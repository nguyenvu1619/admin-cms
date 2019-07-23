
import axios from 'axios';
import React from 'react';

const defaultUserInfo = {
  name: 'Demo User',
  image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png'
};
const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})

export const userLogin   = user => {
  user = JSON.stringify(user);
  return dispatch => {
    return fetch("http://localhost:3001/v1/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': 'en'
      },
      body: user
    })
      .then(resp => resp.json())
      .then(data => {
          console.log(data.status);
          if(data.status){
          const user = JSON.stringify(data.data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", user);
          }
          else {
            return (
            <div>
              asdfasdfdasfadsf;
            </div>
            )
          }
      })
  }
}


export const addFetch = (data) => {
  const userInfo = JSON.stringify(data);
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      return fetch("http://localhost:3000/v1/organization/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: userInfo
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            localStorage.removeItem("token")
          } else {
            dispatch(loginUser(data.user))
          }
        })
    }
  }
}

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}