import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {
  state = {};
  render() {
    console.log(localStorage.getItem('admin'));
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/admin/home' ? 'active' : null}>
          <Link to="/admin/home">
            <i className="pe-7s-graph"></i>
            <p>Dashboard</p>
          </Link>
        </li>
        <li className={this.isPathActive('"/admin/users') ? 'active' : null}>
        <Link to="/admin/users/list">
              <i className="pe-7s-note2"></i>
            <p>
              User
            </p>
            </Link>
        </li>
        {localStorage.getItem('admin') ? (
         <li className={this.isPathActive('"/admin/organizations') ? 'active' : null}>
         <Link to="/admin/organizations/list">
               <i className="pe-7s-note2"></i>
             <p>
               Organization
             </p>
             </Link>
         </li>
        ) : (
          <div></div>
        )}
        <li className={this.isPathActive('/report') ? 'active' : null}>
              <Link to="/admin/report">
              <i className="pe-7s-note2"></i>
            <p>
              Report
            </p>
            </Link>
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);