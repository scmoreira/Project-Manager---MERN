import React, { useReducer } from 'react'

import AlertReducer from './alertReducer'
import AlertContext from './alertContext'

import { SHOW_ALERT, HIDE_ALERT } from '../../types'

const AlertState = props => {

    // Set initial state
    const initialState = {
        alert: null
    }

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(AlertReducer, initialState)

    // Show alert
    const showAlert = (message, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                message,
                category
            }
        })

        // Hide alert
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000)
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
