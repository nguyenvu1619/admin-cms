import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';
import {LanguageContext} from './Language';

import Header from './Header';

import SideBar from '../../components/SideBar';
/**
 * Pages
 */
import Dashboard from '../Dashboard';
import CheckInCheckOutHistory from '../Tables/ReactBootstrapTable/CheckInCheckOutHistory';
import UserProfile from '../UserProfile';
import Report from '../Tables/ReactBootstrapTable/Report';
import UserList from '../Tables/ReactBootstrapTable/UserList';
import AddOrganization from '../Forms/addOrganization'
import AddUser from '../Forms/addUser';
import AddAdminOrganization from '../Forms/addAdminOrganization';
import DetailReport from '../Tables/ReactBootstrapTable/DetailReport';
import OrganizationList from '../Tables/ReactBootstrapTable/OrganizationList';
import SuperAdminReport from '../Tables/ReactBootstrapTable/SuperAdminReport';

const checkSuperAdmin = localStorage.getItem('admin');
console.log(checkSuperAdmin);
const MainPage = ({
    mobileNavVisibility,
    hideMobileMenu,
    history
  }) => {
    history.listen(() => {
      if (mobileNavVisibility === true) {
        hideMobileMenu();
      }
    });
    return(
      <div className={cx({
        'nav-open': mobileNavVisibility === true
      })}>
        <div className="wrapper">
          
          <div className="close-layer" onClick={hideMobileMenu}></div>
          <SideBar />
          <div className="main-panel">
            <Header />
            <Route exact path="/admin/home" component={Dashboard} />
            <Route exact path="/admin/users/list" render= {(props) => <UserList {...props} is_super_admin ={checkSuperAdmin}/>}/>
            {checkSuperAdmin ? (
              <Route exact path="/admin/users/add" component={AddAdminOrganization}/>
            ) : ( <Route path="/admin/users/add" component={AddUser}/>)}
            {checkSuperAdmin ? (
              <div>
            <Route exact path="/admin/organizations/list" component={OrganizationList} />
            <Route exact path="/admin/organizations/add" component={AddOrganization} />
            </div>
            ) : (
              <div></div>
            )}
            <Route exact path="/admin/profile"
            render={() => <UserProfile  isAdmin={true} />}
            />
            <Route exact path="/admin/checkincheckout/list" component={CheckInCheckOutHistory} />
            <Route exact path="/admin/users/profile/:userID"
            render={() => <UserProfile  isAdmin={false} />}
            />
            {!checkSuperAdmin ? (
              <div>
              <Route exact path="/admin/report" component={Report} />
              <Route exact path="/admin/report/:id" component={DetailReport} />
            </div>
            ) : (
              <Route exact path="/admin/report" component={SuperAdminReport} />
            )}
          </div>
        </div>
      </div>
    )
  };
  
  const mapStateToProp = state => ({
    mobileNavVisibility: state.Layout.mobileNavVisibility,
  });
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
  });
  export default withRouter(connect(mapStateToProp, mapDispatchToProps)(MainPage));