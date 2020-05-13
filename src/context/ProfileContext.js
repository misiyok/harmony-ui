import { Component } from 'react';
import createDataContext from './createDataContext';

import { navigate } from '../navigationRef';

import firebase from 'firebase';
import 'firebase/firestore';

import {decode, encode} from 'base-64';

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { 
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = Math.floor(256 * Math.random());
  } 
}

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const db = firebase.firestore();

const profileReducer = (state, action) => {
    switch(action.type) {
        case 'set_first_name':
            return { ...state, firstName: action.payload};
        case 'set_birthday':
            return { ...state, birthday: action.payload};
        case 'set_gender':
            return { ...state, gender: action.payload};
        case 'add_skills':
            return { ...state, skills: [...state.skills, ...action.payload]};
        case 'add_wishes':
            return { ...state, wishes: [...state.wishes, ...action.payload]};
        case 'add_allSkills':
            return { ...state, allSkills: [...action.payload]};
        default:
            return state;
    }
};

const _setFirstName = dispatch => {
    return ( firstName ) => {
        dispatch({ type: 'set_first_name', payload: firstName });
        navigate('BirthdayInput');
    };
};

const _setBirthday = dispatch => {
    return ( birthday ) => {
        dispatch({ type: 'set_birthday', payload: birthday });
        navigate('GenderInput');
    };
};

const _setGender = dispatch => {
    return ( gender ) => {
        dispatch({ type: 'set_gender', payload: gender });
        navigate('SkillsInput');
    };
};

const _addSkills = dispatch => {
    return ( skills ) => {
        dispatch({ type: 'add_skills', payload: skills });
        navigate('WishesInput');
    };
};

const _addWishes = dispatch => {
    return ( wishes ) => {
        dispatch({ type: 'add_wishes', payload: wishes });
        navigate('Profile');
    };
};

const _fetchSkills = dispatch => {
    return async () => {
        var allSkills = [];
        await db.collection("skills").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                //console.log(`${doc.data().name}`);
                var singleObj = {};
                singleObj['id'] = doc.id;
                singleObj['name'] = doc.data().name;
                allSkills.push(singleObj);
            });
          }).catch(function(error) {
            console.error("Error adding document: ", error);
          });
        dispatch({ type: 'add_allSkills', payload: allSkills });
    };
};

export const { Provider, Context } = createDataContext(
    profileReducer,
    { _setFirstName, _setBirthday, _setGender, _addSkills, _addWishes, _fetchSkills },
    { firstName: '', birthday: '', gender: '', skills: [], wishes: [], allSkills: [] }
);