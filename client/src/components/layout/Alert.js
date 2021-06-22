import React from 'react';

const Alert = ({ alert }) => {
    if (!alert) {
        return null;
    }
    return (
        <div
            className={ `alert ${alert.category}` }
            data-cy='alert'
        >
            { alert.message }
        </div>
    );
};

export default Alert;