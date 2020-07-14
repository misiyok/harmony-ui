import url from 'url';
import createDataContext from './createDataContext';

import firebase from 'firebase/app';
import 'firebase/auth';

import { navigate } from '../navigationRef';

const config = {
    apiKey: 'AIzaSyDj8jmgUPEJ7ljX6Jzst6pQ6irhrE5jLV4',
    authDomain: 'harmony-aa3a1.firebaseapp.com',
    databaseURL: 'https://harmony-aa3a1.firebaseio.com',
    projectId: 'harmony-aa3a1',
    storageBucket: 'harmony-aa3a1.appspot.com',
    messagingSenderId: '415084951399',
    appId: '1:415084951399:web:da900f53fae3501b8de1c2',
    measurementId: 'G-LH4HKHRKW0'
  };
  
firebase.initializeApp(config);

const authReducer = (state, action) => {
    switch(action.type) {
        case 'set_show_modal':
            return { ...state, showModal: action.payload };
        case 'set_confirmation':
            return { ...state, confirmation: action.payload, errorMessage: ''};
        case 'set_error_message':
            return { ...state, errorMessage: action.payload};
        case 'signin':
            return { ...state, userId: action.payload };
        case 'signout':
            return { ...state, userId: null };
        case 'set_isNewUser':
            return { ...state, isNewUser: action.payload };
        case 'set_initializing':
            return { ...state, initializing: action.payload };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => () => {
    const subscriber = firebase.auth().onAuthStateChanged(user => {
        if(user) {
            dispatch({ type: 'signin', payload: user.uid });
        }
        dispatch({ type: 'set_initializing', payload: false });
    });
    return subscriber;
};

validatePhoneNumber = (phoneNumber) => {
    const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(phoneNumber);
};

const sendCode = dispatch => {
    return (phoneNumber) => {
        if(validatePhoneNumber(phoneNumber)){
            dispatch({ type: 'set_show_modal', payload: true });
        } else {
            dispatch({ type: 'set_error_message', payload: 'Invalid Phone Number !' });
        }  
    };
};

const _handleResponse = dispatch => {
    return ({ data, phoneNumber }) => {
        const query = url.parse(data.url, true).query;
        if (query.hasOwnProperty('token')) {
            _sendConfirmationCode( dispatch, query.token, phoneNumber );
        } else if (query.hasOwnProperty('cancel')) { // think about this again ??
            dispatch({ type: 'set_show_modal', payload: false });
        }
    };
};

const setErrorMessage = dispatch => {
    return ({ errorMessage }) => {
        dispatch({ type: 'set_error_message', payload: errorMessage });
    };
};

const setShowModal = dispatch => {
    return ({ showModal }) => {
        dispatch({ type: 'set_show_modal', payload: showModal });
    };
};

const signout = dispatch => {
    return () => {
        firebase.auth().signOut();
        dispatch({ type: 'signout' });
        navigate('Landing');
    };
};

_sendConfirmationCode = (dispatch, captchaToken, phoneNumber) => {
    dispatch({ type: 'set_show_modal', payload: false });
    //const number = `+${phoneNumber}`;
    const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(captchaToken)
    }
    firebase.auth().signInWithPhoneNumber(phoneNumber, captchaVerifier)
    .then((confirmation) => {
        dispatch({ type: 'set_confirmation', payload: confirmation });
        navigate('CodeVerification');
    })
    .catch((err) => {
        dispatch({ type: 'set_error_message', payload: 'Oops! something is wrong' });
    });
}

const setIsNewUser = dispatch => {
    return ({ isNewUser }) => {
        dispatch({ type: 'set_isNewUser', payload: isNewUser });
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {sendCode, _handleResponse, setErrorMessage, setShowModal, tryLocalSignin, signout, setIsNewUser},
    { errorMessage: null, showModal: false, confirmation: {}, userId: null, isNewUser: false, initializing: true }
);