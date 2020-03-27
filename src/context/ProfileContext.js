import { Component } from 'react';
import createDataContext from './createDataContext';

const profileReducer = (state, action) => {
    switch(action.type) {
        case 'save_phone_number':
            return { ...state, phoneNumber: action.payload };
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const savePhoneNumber = dispatch => {
    return ({ phoneNumber }) => {
        if (isValidPhoneNumber(phoneNumber)) {
            dispatch({ type: 'save_phone_number', payload: phoneNumber });
            console.log('phone number saved: ' + phoneNumber);
        } else {
            dispatch({ type: 'add_error', payload: 'Please enter a valid phone number!' });
        }
    };
};


export const { Provider, Context } = createDataContext(
    profileReducer,
    { savePhoneNumber },
    { phoneNumber: '', errorMessage: '' }
);