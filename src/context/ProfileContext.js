import { Component } from 'react';
import createDataContext from './createDataContext';

import { navigate } from '../navigationRef';

import { do_fetchSkills, do_persistProfile, do_persistEditedProfile, do_fetchPotentialMatches } from '../firebase';

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
        case 'add_skills':
            return { ...state, skills: [...state.skills, ...action.payload]};
        case 'add_wishes':
            return { ...state, wishes: [...state.wishes, ...action.payload]};
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

const _addSkills = dispatch => {
    return ( skills ) => {
        dispatch({ type: 'add_skills', payload: skills });
        navigate('WishesInput');
    };
};

const _addWishes = dispatch => {
    return ( wishes ) => {
        dispatch({ type: 'add_wishes', payload: wishes });
        navigate('Match');
    };
};

const _fetchSkills = dispatch => {
    return async () => {
        //var allSkills = await do_fetchSkills();
        //var allSkills = [{'id': 'basket', 'name': 'basket'}, {'id': 'football', 'name': 'football'}];
        await do_fetchSkills((type, payload) => {
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
        dispatch({ type: 'add_wishes', payload: addedWishes });
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
    return async () => {
        await do_fetchPotentialMatches((type, payload) => {
            dispatch({ type, payload });
        });
    };
};

export const { Provider, Context } = createDataContext(
    profileReducer,
    { _setUserId, _setFirstName, _setBirthday, _setGender, _addSkills, _addWishes, _fetchSkills, _persistProfile, 
        _editSkills, _editWishes, _persistEditedProfile, _fetchPotentialMatches },
    { userId: null, firstName: '', birthday: '', gender: '', skills: [], wishes: [], allSkills: [], potentialMatches: [] }
);