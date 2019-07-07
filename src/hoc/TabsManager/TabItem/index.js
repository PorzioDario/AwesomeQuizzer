import React from 'react';
import classes from './TabItem.module.css';

const TabItem = (props) => (
    <div className={classes.Tab}>
        {props.isActive && props.children}
    </div>
);

export default TabItem;