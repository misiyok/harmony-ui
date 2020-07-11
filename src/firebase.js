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

export const do_fetchSkills = async (callback) => {
    var allSkills = [];
    await db.collection("skills").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var singleObj = {};
            singleObj['id'] = doc.id;
            singleObj['name'] = doc.data().name;
            allSkills.push(singleObj);
        });
      }).catch(function(error) {
        console.error("Error getting skills collection: ", error);
      });
    callback('add_allSkills', allSkills );
};

export const do_persistProfile = async (state) => {
    db.collection('users')
    .doc(state.userId)
    .set({
        name: state.firstName,
        birthday: state.birthday,
        gender: state.gender,
        skills: state.skills,
        wishes: state.wishes
    })
    .then(() => {
        console.log('User added/Updated!', state.userId);
    }).catch(function(error) {
        console.error("Error adding user document: ", error);
    });
};

const getAllUsers = async (allUsers) => {
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach( async (doc) => {
            try {
                var singleObj = {};
                singleObj['id'] = doc.id;
                singleObj['name'] = doc.data().name;
                singleObj['birthday'] = doc.data().birthday;
                singleObj['gender'] = doc.data().gender;
                singleObj['skills'] = doc.data().skills;
                singleObj['wishes'] = doc.data().wishes;
                allUsers.push(singleObj);
            } catch (err) {
                console.warn(err);
            }
        });
    }).catch(function(error) {
    console.error("Error getting users collection: ", error);
    });
};

export const do_fetchPotentialMatches = async (callback) => {
    //var potentialMatches = [];
    var allUsers = [];
    await getAllUsers(allUsers);
    
    callback('add_potentialMatches', allUsers );
};

export const do_fetchUserProfileInfo = async (userId, callback) => {
    await db.collection("users").doc(userId).get().then((doc) => {
        callback('set_user_id', doc.id );
        callback('set_first_name', doc.data().name );
        callback('set_birthday', doc.data().birthday );
        callback('set_gender', doc.data().gender );
        callback('set_skills', doc.data().skills );
        callback('set_wishes', doc.data().wishes );
    })
    .catch(function(error) {
        console.error("Error getting users collection: ", error);
    });
};