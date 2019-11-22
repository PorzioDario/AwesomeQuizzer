import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ActionTypes from '../../store/actions/actionTypes';

import TabsManager from '../../hoc/TabsManager';
import TabItem from '../../hoc/TabsManager/TabItem';

//import classes from './LoginManager.module.css';
import axios from 'axios';
import {setToken} from '../../axios';

const LoginManager = (props) => {

    const baseUrl = 'http://localhost:33000/auth/';

    const [{ hasError, errorMessage }, setError] = useState({ hasError: false, errorMessage: '' });
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [psw, setPsw] = useState('');

    const resetError = () => {
        setError({ hasError: false, errorMessage: '' });
    }

    const LoginMethod = (event) => {
        event.preventDefault();
        const payload = {
            email,
            password: psw
        }

        axios.post(baseUrl + 'login', payload)
            .then(response => {
                let expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('tokenExpirationDate', expDate);
                localStorage.setItem('username', response.data.username);
                setToken(response.data.idToken);
                props.setAuth(response.data.idToken, response.data.localId, response.data.username);
                resetError();
            })
            .catch(err => {
                console.log(err);
                setError({ hasError: true, errorMessage: err.response.data.message });
            });
    }

    const RegisterMethod = (event) => {
        event.preventDefault();
        const payload = {
            email,
            password: psw,
            confirmPassword: psw,
            username
        }

        axios.post(baseUrl + 'signup', payload)
            .then(response => {
                let expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('tokenExpirationDate', expDate);
                localStorage.setItem('username', response.data.username);
                //localStorage.setItem('newUser', true);
                //props.setNewUser();
                props.setAuth(response.data.idToken, response.data.localId, response.data.username);
                resetError();
            })
            .catch(err => {
                setError({ hasError: true, errorMessage: err.response.data.message });
            });
    }

    const errorDiv = <div className="alert alert-danger" role="alert">
        {errorMessage}
    </div>;

    return (
        <React.Fragment>
            {props.isAuth && <Redirect to="/" />}
            {
                hasError && errorDiv
            }
            <div className="mx-auto w-50 h-75 my-5">
                <TabsManager>
                    <TabItem tabId="login" tabName="Login">
                        <form className="my-5 p-3" onSubmit={LoginMethod} >
                            <div className="form-group">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    value={psw}
                                    onChange={event => setPsw(event.target.value)}
                                    placeholder="Password" />
                            </div>
                            {/* <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                            <button type="submit" className="btn btn-primary btn-block mb-3">Login</button>
                        </form>
                    </TabItem>
                    <TabItem tabId="signin" tabName="Sign In">
                        <form className="my-5 p-3" onSubmit={RegisterMethod} >
                            <div className="form-group">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    placeholder="Enter email" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="Username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Username"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    placeholder="Enter your username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    value={psw}
                                    onChange={event => setPsw(event.target.value)}
                                    placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </form>
                    </TabItem>
                </TabsManager>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.token !== null,
        isNewUser: state.isNewUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuth: (token, idUser, username) => dispatch({ type: ActionTypes.SET_AUTHENTICATION, payload: { token, idUser, username } }),
        setNewUser: () => dispatch({ type: ActionTypes.SET_NEW_USER })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginManager));