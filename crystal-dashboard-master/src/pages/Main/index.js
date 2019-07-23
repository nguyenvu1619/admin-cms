import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';
import {LanguageContext} from './Language';

/**
 * Pages
 */
import Authorization from './Auth';
import Reset from './Reset';
import MainPage from './MainPage';

const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
       
          <Route exact  path="" component={Authorization} />
          <Route exact path="/reset-password" component={Reset} />
          <Route  path="/admin" render={() => (
            !localStorage.getItem('token') ? (
            <Redirect to="/"/>
            ) : (
            <MainPage/>
            )
)}/>
       </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));