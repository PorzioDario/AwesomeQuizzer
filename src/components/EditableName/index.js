import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './EditableName.module.css';

const EditableName = ({name, nameChanged}) => {
    const [editMode, setEditMode] = useState(false);
    const [tempName, setTempName] = useState(name);

    const saveButtonClickHandler = () => {
        nameChanged(tempName);
        setEditMode(false);
    };

    const cancelButtonClickHandler = () => {
        setTempName(name);
        setEditMode(false);
    };
    
    const editButtonClickHandler = () => {
        setEditMode(true);
    };

    const userTyping = (event) => {
        setTempName(event.target.value);
    };

    return (
        <div className={classes.Container}>
            <FontAwesomeIcon icon="question-circle" className={classes.MainIcon} />
            {/* <i className={["fas","fa-question-circle","fa-5x",classes.MainIcon].join(' ')}></i> */}
            { 
                editMode ? 
                (<React.Fragment>
                    <input type="text" onChange={userTyping} value={tempName} />
                    <FontAwesomeIcon icon="check" className={classes.Icon} onClick={saveButtonClickHandler} />
                    <FontAwesomeIcon icon="times" className={classes.Icon} onClick={cancelButtonClickHandler} />
                </React.Fragment>) :
                (<React.Fragment>
                    <p className={classes.Parag}>{name}</p>
                    <FontAwesomeIcon icon="pencil-alt" className={classes.Icon} onClick={editButtonClickHandler} />            
                </React.Fragment>)
            }
        </div>
    );
};

export default EditableName;