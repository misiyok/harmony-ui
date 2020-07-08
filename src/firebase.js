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
            //console.log(`${doc.id} => ${doc.data()}`);
            //console.log(`${doc.data().name}`);
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
        gender: state.gender
    })
    .then(() => {
        console.log('User added!', state.userId);
        
        var userDocRef = db.collection('users').doc(state.userId);
        
        state.skills.forEach(element => {
            userDocRef.collection('skills')
            .doc(element.id)
            .set(element)
            .then(function() {
                console.log("Document written");
            }).catch(function(error) {
                console.error("Error adding documentt: ", error);
            }); 
        });
        state.wishes.forEach(element => {
            userDocRef.collection('wishes')
            .doc(element.id)
            .set(element)
            .then(function() {
                console.log("Document written");
            }).catch(function(error) {
                console.error("Error adding documentt: ", error);
            }); 
        });

    }).catch(function(error) {
        console.error("Error adding user document: ", error);
    });
};

export const do_persistEditedProfile = async (state, addedSkills, removedSkills, addedWishes, removedWishes) => {
    var userDocRef = db.collection('users').doc(state.userId);

    addedSkills.forEach(element => {
        userDocRef.collection('skills')
        .doc(element.id)
        .set(element)
        .then(function() {
            console.log("Document written");
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
    });
    
    removedSkills.forEach(element => {
        userDocRef.collection('skills')
        .doc(element.id)
        .delete()
        .then(function() {
            console.log("Document deleted");
        }).catch(function(error) {
            console.error("Error deleting document: ", error);
        });
    });

    addedWishes.forEach(element => {
        userDocRef.collection('wishes')
        .doc(element.id)
        .set(element)
        .then(function(docRef) {
            console.log("Document written");
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        }); 
    });

    removedWishes.forEach(element => {
        userDocRef.collection('wishes')
        .doc(element.id)
        .delete()
        .then(function() {
            console.log("Document deleted");
        }).catch(function(error) {
            console.error("Error deleting document: ", error);
        }); 
    });
};

// const getUserSkills = async (userId) => {
//     var skills = [];
//     var userDocRef = db.collection('users').doc(userId);
//     await userDocRef.collection("skills").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             //console.log(`${doc.id} => ${doc.data()}`);
//             //console.log(`${doc.data().name}`);
//             var singleObj = {};
//             singleObj['id'] = doc.id;
//             singleObj['name'] = doc.data().name;
//             skills.push(singleObj);
//         });
//         return skills;
//       }).catch(function(error) {
//         console.error("Error getting skills collection: ", error);
//       });
// };

export const do_fetchPotentialMatches = async (callback) => {
    var potentialMatches = [];
    var allUsers = [];
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach( async (doc) => {
            //console.log(`${doc.id} => ${doc.data().name}, ${doc.data().birthday}, ${doc.data().gender}`);
            //console.log(`${doc.data().skills}`);
            
            var singleObj = {};
            singleObj['id'] = doc.id;
            singleObj['name'] = doc.data().name;
            singleObj['birthday'] = doc.data().birthday;
            singleObj['gender'] = doc.data().gender;
            allUsers.push(singleObj);
        });
      }).catch(function(error) {
        console.error("Error getting users collection: ", error);
      });

    //var allUsers = [{'id': 'GtqBLr44pmbPjbLjOhr2BwG32SD2', 'name': 'Katarina'}];
    callback('add_potentialMatches', allUsers );
};