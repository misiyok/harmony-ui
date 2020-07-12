import { Component } from 'react';
import createDataContext from './createDataContext';

import { navigate } from '../navigationRef';

import { do_fetchAllSkills, do_persistProfile, do_persistEditedProfile, 
    do_fetchPotentialMatches, do_fetchUserProfileInfo } from '../firebase';

const profileReducer = (state, action) => {
    switch(action.type) {
        case 'set_user_id':
            return { ...state, userId: action.payload};
        case 'set_first_name':
            return { ...state, firstName: action.payload};
        case 'set_birthday':
            return { ...state, birthday: action.payload};
        case 'set_gender':
            return { ...state, gender: action.payload};
        case 'set_skills':
            return { ...state, skills: [...action.payload]};
        case 'set_wishes':
            return { ...state, wishes: [...action.payload]};
        case 'add_allSkills':
            return { ...state, allSkills: [...action.payload]};
        case 'edit_skills':
            return { ...state, skills: [...action.payload]};
        case 'edit_wishes':
            return { ...state, wishes: [...action.payload]};
        case 'add_potentialMatches':
            return { ...state, potentialMatches: [...action.payload]};
        default:
            return state;
    }
};

const _setUserId = dispatch => {
    return ( userId ) => {
        dispatch({ type: 'set_user_id', payload: userId });
    };
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

const _setSkills = dispatch => {
    return ( skills ) => {
        dispatch({ type: 'set_skills', payload: skills });
    };
};

const _setWishes = dispatch => {
    return ( wishes ) => {
        dispatch({ type: 'set_wishes', payload: wishes });
    };
};

const _fetchAllSkills = dispatch => {
    return async () => {
        await do_fetchAllSkills((type, payload) => {
            dispatch({ type, payload });
        });
    };
};

const _persistProfile = dispatch => {
    return async (state) => {
        do_persistProfile(state);
    };
};

const _persistEditedProfile = dispatch => {
    return async (state, addedSkills, removedSkills, addedWishes, removedWishes) => {
        do_persistEditedProfile(state, addedSkills, removedSkills, addedWishes, removedWishes);
        //dispatch({ type: 'add_skills', payload: addedSkills });
        //dispatch({ type: 'add_wishes', payload: addedWishes });
    };
};

const _editSkills = dispatch => {
    return ( skills ) => {
        dispatch({ type: 'edit_skills', payload: skills });
    };
};

const _editWishes = dispatch => {
    return ( wishes ) => {
        dispatch({ type: 'edit_wishes', payload: wishes });
    };
};

const _fetchPotentialMatches = dispatch => {
    return async (state) => {
        await do_fetchPotentialMatches(state, (type, payload) => {
            dispatch({ type, payload });
        });
    };
};

const _fetchUserProfileInfo = dispatch => {
    return async (userId) => {
        await do_fetchUserProfileInfo(userId, (type, payload) => {
            dispatch({ type, payload });
        });
    };
};

export const { Provider, Context } = createDataContext(
    profileReducer,
    { _setUserId, _setFirstName, _setBirthday, _setGender, _setSkills, _setWishes, _fetchAllSkills, _persistProfile, 
        _editSkills, _editWishes, _persistEditedProfile, _fetchPotentialMatches, _fetchUserProfileInfo },
    { userId: null, firstName: '', birthday: '', gender: '', skills: [], wishes: [], allSkills: [], potentialMatches: [] }
);