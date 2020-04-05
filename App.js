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