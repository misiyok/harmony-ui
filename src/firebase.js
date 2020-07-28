import firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import { navigate } from './navigationRef';

global.crypto = require('@firebase/firestore');
global.crypto.getRandomValues = (byteArray) => {
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = Math.floor(256 * Math.random());
  }
};
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const db = firebase.firestore();

export const do_fetchAllSkills = async (callback) => {
  var allSkills = [];
  await db
    .collection('skills')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var singleObj = {};
        singleObj['id'] = doc.id;
        singleObj['name'] = doc.data().name;
        singleObj['category'] = doc.data().category;
        singleObj['uri'] = doc.data().uri;
        allSkills.push(singleObj);
      });
    })
    .catch(function (error) {
      console.error('Error getting skills collection: ', error);
    });
  callback('add_allSkills', allSkills);
};

export const do_persistProfile = async (state) => {
  db.collection('users')
    .doc(state.userId)
    .set({
      name: state.firstName,
      birthday: state.birthday,
      gender: state.gender,
      skills: state.skills,
      wishes: state.wishes,
      likes: [...state.likes],
      dislikes: [...state.dislikes],
      mutualLikes: [...state.mutualLikes],
      profilePhotoUri: state.profilePhotoUri,
    })
    .then(() => {
      console.log('User added/Updated!', state.userId);
    })
    .catch(function (error) {
      console.error('Error adding user document: ', error);
    });
};

const getAllUsers = async (allUsers) => {
  await db
    .collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        try {
          var singleObj = {};
          singleObj['id'] = doc.id;
          singleObj['name'] = doc.data().name;
          singleObj['birthday'] = doc.data().birthday;
          singleObj['gender'] = doc.data().gender;
          singleObj['skills'] = doc.data().skills;
          singleObj['wishes'] = doc.data().wishes;
          singleObj['likes'] = doc.data().likes;
          singleObj['dislikes'] = doc.data().dislikes;
          singleObj['mutualLikes'] = doc.data().mutualLikes;
          singleObj['profilePhotoUri'] = doc.data().profilePhotoUri;
          allUsers.push(singleObj);
        } catch (err) {
          console.error(err);
        }
      });
    })
    .catch(function (error) {
      console.error('Error getting users collection: ', error);
    });
};

const getIntersection = (a1, a2) => {
  a2Ids = a2.map((x) => x.id);
  return a1.filter((n) => {
    return a2Ids.indexOf(n.id) !== -1;
  });
};

export const do_fetchPotentialMatches = async (state, callback) => {
  // var potentialMatches = [    {  'userProfile': {'id': 'id1', 'name': 'Muhammed', 'skills': [{'id': 'football', 'name': 'Football', 'category': 'Sports'}] },
  //                                 'matchingSkills': [{'id': '1', 'name': '1', 'category': 'Sports'}],
  //                                 'matchingWishes': [{'id': '2', 'name': '2', 'category': 'Sports'}]
  //                             },
  //                             {   'userProfile': {'id': 'id2', 'name': 'Muhammed2', 'skills': [{'id': 'basketball', 'name': 'Basketball', 'category': 'Sports'}, {'id': 'painting', 'name': 'Painting', 'category': 'Art'}] },
  //                                 'matchingSkills': [{'id': '3', 'name': '3', 'category': 'Sports'}],
  //                                 'matchingWishes': [{'id': '4', 'name': '4', 'category': 'Sports'}]
  //                             }
  //                         ];
  var allUsers = [];
  await getAllUsers(allUsers);

  var potentialMatches = [];

  myLikes = state.likes.map((like) => like.id);
  myDislikes = state.dislikes.map((dislike) => dislike.id);
  myMutualLikes = state.mutualLikes.map((mutualLike) => mutualLike.id);

  potentialMatches = allUsers
    .map((user) => {
      var singleObj = {};
      singleObj['userProfile'] = user;
      singleObj['matchingSkills'] = [];
      singleObj['matchingWishes'] = [];
      return singleObj;
    })
    .filter((userObj) => {
      // filter my profile
      if (userObj.userProfile.id == state.userId) {
        return false;
      }

      //filter liked, disliked and mutual liked profiles
      if (
        [...myLikes, ...myDislikes, ...myMutualLikes].includes(
          userObj.userProfile.id
        )
      ) {
        return false;
      }

      userObj.matchingSkills = getIntersection(state.skills, userObj.userProfile.wishes);
      userObj.matchingWishes = getIntersection(state.wishes, userObj.userProfile.skills);
      return (
        userObj.userProfile.id != state.userId &&
        userObj.matchingSkills.length > 0 &&
        userObj.matchingWishes.length > 0
      );
    });

  callback('add_potentialMatches', potentialMatches);
};

export const do_fetchUserProfileInfo = async (userId, callback) => {
  await db
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      callback('set_profile', {
        id: doc.id,
        name: doc.data().name,
        gender: doc.data().gender,
        birthday: doc.data().birthday,
        skills: [...doc.data().skills],
        wishes: [...doc.data().wishes],
        likes: [...doc.data().likes],
        dislikes: [...doc.data().dislikes],
        mutualLikes: [...doc.data().mutualLikes],
        profilePhotoUri: doc.data().profilePhotoUri,
      });
    })
    .catch(function (error) {
      console.error('Error getting users collection: ', error);
    });
};

export const do_like = async (user, likedUser, callback) => {
  // firebase -> retrieve likedUser
  db.collection('users')
    .doc(likedUser.id)
    .get()
    .then((likedUserDoc) => {
      // check likedUser's likes
      likedUsersFilteredList = likedUserDoc.data().likes
        ? likedUserDoc.data().likes.filter((usr) => {
            return usr.id == user.id;
          })
        : [];
      if (likedUsersFilteredList.length > 0) {
        // if userId exists
        // firebase -> remove from there
        // firebase -> add it to its ML list
        db.collection('users')
          .doc(likedUser.id)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(user),
            mutualLikes: firebase.firestore.FieldValue.arrayUnion( { ...user, profilePhotoUri: user.profilePhotoUri })
          })
          .then(() => {})
          .catch(function (error) {
            console.error(
              'Error deleting user from liked users likes list',
              error
            );
          });

        // firebase -> add likedUser to my ML list
        db.collection('users')
          .doc(user.id)
          .update({
            mutualLikes: firebase.firestore.FieldValue.arrayUnion({ ...likedUser, profilePhotoUri: likedUserDoc.data().profilePhotoUri })
          })
          .then(() => {
            callback('mutual_like', { ...likedUser, profilePhotoUri: likedUserDoc.data().profilePhotoUri });
          })
          .catch(function (error) {
            console.error(
              'Error adding liked user to mutual likes list',
              error
            );
          });
      } else {
        // if doesnt exist
        // firebase -> add likedUSer to my likes list
        db.collection('users')
          .doc(user.id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(likedUser),
          })
          .then(() => {
            callback('like', likedUser);
          })
          .catch(function (error) {
            console.error('Error adding user to likes list', error);
          });
      }
    })
    .catch(function (error) {
      console.error('Error getting liked user document: ', error);
    });
};

export const do_dislike = async (user, dislikedUser, callback) => {
  db.collection('users')
    .doc(user.id)
    .update({
      dislikes: firebase.firestore.FieldValue.arrayUnion(dislikedUser),
    })
    .then(() => {
      callback('dislike', dislikedUser);
    })
    .catch(function (error) {
      console.error('Error adding likes to user document: ', error);
    });
};

export const do_uploadImage = async (userId, uploadUri, callback) => {
  if (uploadUri === null) return;

  const response = await fetch(uploadUri);
  const blob = await response.blob();

  const imageRef = firebase.storage().ref('profilePhotos/' + userId);
  await imageRef.put(blob).catch((error) => {
    throw error;
  });
  const uri = await imageRef.getDownloadURL().catch((error) => {
    throw error;
  });

  callback('set_pp_uri', uri);
  navigate('SkillsInput');
};

export const do_uploadNewImage = async (userId, uploadUri, callback) => {
  if (uploadUri === null) return;

  const response = await fetch(uploadUri);
  const blob = await response.blob();

  const imageRef = firebase.storage().ref('profilePhotos/' + userId);
  await imageRef.put(blob).catch((error) => {
    throw error;
  });
  const uri = await imageRef.getDownloadURL().catch((error) => {
    throw error;
  });

  callback('set_pp_uri', uri);
  // navigate('SkillsInput');
};
