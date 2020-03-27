import url from 'url';
import createDataContext from './createDataContext';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { navigate } from '../navigationRef';

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
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            dispatch({ type: 'signin', payload: user.userId });
            navigate('Match');
        } else {
            navigate('Landing');
        }
    });
};

validatePhoneNumber = (phoneNumber) => {
    const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(phoneNumber);
};

const sendCode = dispatch => {
    return ({ phoneNumber }) => {
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

const signin = dispatch => {
    return ({ userId }) => {
        dispatch({ type: 'signin', payload: userId });
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

export const { Provider, Context } = createDataContext(
    authReducer,
    {sendCode, _handleResponse, setErrorMessage, tryLocalSignin, signout, signin},
    { errorMessage: null, showModal: false, confirmation: {}, userId: null }
);