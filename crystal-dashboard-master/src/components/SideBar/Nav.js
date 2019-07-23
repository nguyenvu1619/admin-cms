import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {
  state = {};
  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/admin/home' ? 'active' : null}>
          <Link to="/admin/home">
            <i className="pe-7s-graph"></i>
            <p>Dashboard</p>
          </Link>
        </li>
        <li className={this.isPathActive('"/admin/users') || this.state.userMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ userMenuOpen: !this.state.userMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-users"></i>
            <p>User <b className="caret"></b></p>
          </a>
          <Collapse in={this.state.userMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/admin//users/list') ? 'active' : null}>
                  <Link to="/admin/users/list">User List</Link>
                </li>
                <li className={this.isPathActive('/admin/users/add') ? 'active' : null}>
                  <Link to="/admin/users/add">Add User</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        {localStorage.getItem('admin') ? (
        <li className={this.isPathActive('"/admin/organizations') || this.state.OrganizationMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ OrganizationMenuOpen: !this.state.OrganizationMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-users"></i>
            <p>Organization <b className="caret"></b></p>
          </a>
          <Collapse in={this.state.OrganizationMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/admin/organizations/list') ? 'active' : null}>
                  <Link to="/admin/organizations/list">Organization List</Link>
                </li>
                <li className={this.isPathActive('/admin/organizations/add-user') ? 'active' : null}>
                  <Link to="/admin/organizations/add">Add Organization</Link>
                </li>
              </ul>
            </div>
          </Collapse>
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