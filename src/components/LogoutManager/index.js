import { useEffect } from 'react';
//import classes from './LogoutManager.module.css';
import { connect } from 'react-redux';
import * as ActionTypes from '../../store/actions/actionTypes';
import axios from '../../axios';

const LogoutManager = (props) => {
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        
        const baseUrl = 'http://localhost:8800/auth/';
        axios.get(baseUrl + 'logout');
        props.performLogout();
    }, [props]);

    return null;
}

const mapDispatchToProps = dispatch => {
    return {
        performLogout: () => dispatch({type: ActionTypes.RESET_AUTHENTICATION})
    };
}

export default connect( null, mapDispatchToProps )( LogoutManager );