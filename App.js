import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LandingScreen from './src/screens/LandingScreen';
import PhoneNumberInputScreen from './src/screens/PhoneNumberInputScreen';
import CodeVerificationScreen from './src/screens/CodeVerificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MatchScreen from './src/screens/MatchScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import DummyProfileCreateScreen from './src/screens/DummyProfileCreateScreen';

import { Provider as ProfileProvider } from './src/context/ProfileContext';
import { Provider as AuthProvider } from './src/context/AuthContext';

import { setNavigator } from './src/navigationRef';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


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

const switchNavigator = createSwitchNavigator({
  phoneNumberFlow: createStackNavigator({
    Landing: LandingScreen,
    PhoneNumberInput: PhoneNumberInputScreen,
    CodeVerification: CodeVerificationScreen
  }),
  DummyProfileCreate: DummyProfileCreateScreen,
  mainFlow: createBottomTabNavigator({
    Profile: ProfileScreen,
    Match: MatchScreen,
    Messaging: MessagingScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <ProfileProvider>
      <AuthProvider>
        <App ref={(navigator) => {setNavigator(navigator) }} />
      </AuthProvider>
    </ProfileProvider>
  );
};