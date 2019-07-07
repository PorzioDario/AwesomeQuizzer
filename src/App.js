import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import * as ActionTypes from './store/actions/actionTypes';

import Layout from './hoc/Layout/Layout';
import QuizList from './containers/QuizList/QuizList';
import QuizBuilder from './containers/QuizBuilder/QuizBuilder';
import LoginManager from './components/LoginManager';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import LogoutManager from './components/LogoutManager';

library.add(faQuestionCircle);
library.add(faCheck);
library.add(faTimes);
library.add(faPencilAlt);

class App extends Component {
  
componentDidMount() {
  const token = localStorage.getItem('token');
  const expDate = new Date(localStorage.getItem('tokenExpirationDate'));
  const userId = localStorage.getItem('userId');
  const isNewUser = localStorage.getItem('newUser');
  const username = localStorage.getItem('username');

  if(!token || expDate < new Date()) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpirationDate');
      localStorage.removeItem('userId');
      localStorage.removeItem('newUser');
      localStorage.removeItem('username');
      this.props.logout();
  } else {
    if(isNewUser) {
      this.props.setNewUser();
    }
    this.props.autoLogin(token,userId,username);
  }
}

  render() {
    let routes = null;
    if (!this.props.isAuth) {
      routes = <Switch>
        <Route path="/login" component={LoginManager} />
        <Route path="/" exact render={() => <p>Cool Landing Page</p>} />
        {/* <Redirect to="/" />  */}
      </Switch>
    } else if (this.props.isNewUser) {
      routes = <Switch>
        <Route path="/new-user" render={() => <p>Please fill the following form and submit to continue...</p>} />
        {/* This route is allowed just to let the component itself redirect to the correct page depending on login/signup */}
        <Route path="/login" component={LoginManager} />
        <Route path="/" render={() => <Redirect to="/new-user" />} />
        {/* <Route path="/" render={() => <p>404 Page Not Found</p>} /> */}
      </Switch>;
    } else {
      routes = <Switch>
        <Route path="/dashboard" render={() => <p>User Dashboard</p>} />
        <Route path="/quizzes" component={QuizList}/>
        <Route path="/quizz/:id" component={QuizBuilder} />
        <Route path="/skills" render={() => <p>Skills</p>} />
        <Route path="/reports" render={() => <p>Reports</p>} />
        <Route path="/logout" component={LogoutManager} />
        {/* This route is allowed just to let the component itself redirect to the correct page depending on login/signup */}
        <Route path="/login" component={LoginManager} />
        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
        <Route path="/" render={() => <p>404 Page Not Found</p>} />
      </Switch>
    }

    return ( <div className="App">
            <Layout>
                {routes}
            </Layout>
          </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.token !== null,
    isNewUser: state.isNewUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNewUser: () => dispatch({type: ActionTypes.SET_NEW_USER}),
    logout: () => dispatch({type: ActionTypes.RESET_AUTHENTICATION}),
    autoLogin: (token, idUser, username) => dispatch({type: ActionTypes.SET_AUTHENTICATION, payload: {token, idUser, username}})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
