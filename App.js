import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as Font from 'expo-font';
import LandingScreen from './src/screens/LandingScreen';
import PhoneNumberInputScreen from './src/screens/PhoneNumberInputScreen/PhoneNumberInputScreen';
import CodeVerificationScreen from './src/screens/CodeVerificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MatchScreen from './src/screens/MatchScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import FirstNameInputScreen from './src/screens/FirstNameInputScreen';
import BirthdayInputScreen from './src/screens/BirthdayInputScreen';
import GenderInputScreen from './src/screens/GenderInputScreen';
import SkillsInputScreen from './src/screens/SkillsInputScreen';
import WishesInputScreen from './src/screens/WishesInputScreen';
import ProfileImageInputScreen from './src/screens/ProfileImageInputScreen';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Provider as ProfileProvider } from './src/context/ProfileContext';
import { Provider as AuthProvider } from './src/context/AuthContext';

import { setNavigator } from './src/navigationRef';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MessageScreen from './src/screens/MessageScreen';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator(
    {
      // SkillsInput: SkillsInputScreen,
      Landing: LandingScreen,
      PhoneNumberInput: PhoneNumberInputScreen,
      CodeVerification: CodeVerificationScreen,
      //   },
      //   { headerMode: 'none' }
      // ),
      // profileCreationFlow: createStackNavigator(
      //   {
      FirstNameInput: FirstNameInputScreen,
      BirthdayInput: BirthdayInputScreen,
      GenderInput: GenderInputScreen,
      ProfileImageInput: ProfileImageInputScreen,
      SkillsInput: SkillsInputScreen,
      WishesInput: WishesInputScreen,
    },
    { headerMode: 'none', mode: 'card' }
  ),
  mainFlow: createBottomTabNavigator(
    {
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon size={30} name="md-person" color={tintColor} />
          ),
        },
      },
      Match: {
        screen: MatchScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ width: 30, height: 30, resizeMode: 'contain' }}
              source={
                tintColor === '#368cff'
                  ? require('./assets/mainIconTint.png')
                  : require('./assets/mainIcon.png')
              }
            />
          ),
        },
      },
      Messaging: {
        screen: MessagingScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon size={30} name="md-mail-open" color={tintColor} />
          ),
        },
      },
    },
    {
      tabBarOptions: {
        activeTintColor: '#368cff',
        inactiveTintColor: '#000',
        showLabel: false,
      },
    }
  ),
  MessageFlow: createStackNavigator(
    {
      MessageScreen: MessageScreen,
    },
    {
      headerMode: 'none',
      mode: 'modal',
    }
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
  const [fontsLoaded, setfontsLoaded] = useState(false);
  useEffect(async () => {
    await Font.loadAsync({
      SFProDisplay200: require('./assets/fonts/SF-Pro-Display-Ultralight.otf'),
      SFProDisplay300: require('./assets/fonts/SF-Pro-Display-Light.otf'),
      SFProDisplay400: require('./assets/fonts/SF-Pro-Display-Regular.otf'),
      SFProDisplay500: require('./assets/fonts/SF-Pro-Display-Medium.otf'),
      SFProDisplay600: require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
      SFProDisplay700: require('./assets/fonts/SF-Pro-Display-Bold.otf'),
      SFProDisplay800: require('./assets/fonts/SF-Pro-Display-Bold.otf'),
    });
    setfontsLoaded(true);
  }, []);
  return (
    <ProfileProvider>
      <AuthProvider>
        {fontsLoaded && (
          <SafeAreaProvider>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </SafeAreaProvider>
        )}
      </AuthProvider>
    </ProfileProvider>
  );
};
