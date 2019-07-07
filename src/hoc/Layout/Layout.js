import React from 'react';
import classes from './Layout.module.css';
import Header from './Header';

const layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div className={classes.MainContent}>
                {props.children}
            </div>
            <div className={classes.Footer}>Footer</div>
        </React.Fragment>
    );
}

export default layout;