import React, { useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
const LandingScreen = ({ navigation }) => {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    if (!state.userId) {
      const subscriber = tryLocalSignin();
      return subscriber;
    } else if (state.userId) {
      if (state.isNewUser) {
        navigation.navigate('FirstNameInput', { userId: state.userId });
      } else {
        navigation.navigate('Match', { userId: state.userId });
      }
    }
  }, [state.userId]);

  if (state.initializing) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: width,
          height: height,
          resizeMode: 'cover',
        }}
        source={require('../../assets/bgImage.png')}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 230,
        }}
      >
        <Text
          style={{
            fontFamily: 'SFProDisplay600',
            fontSize: 59,
            fontStyle: 'normal',
            letterSpacing: 0,
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          Harmony
        </Text>
      </View>
      <View
        style={{
          marginBottom: 70,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 100,
            backgroundColor: '#ffffff',
            marginHorizontal: 40,
            paddingVertical: 15,
            paddingHorizontal: 30,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
          //title="LOG IN WITH PHONE NUMBER"
          onPress={() => navigation.navigate('PhoneNumberInput')}
        >
          <Text
            style={{
              fontFamily: 'SFProDisplay600',
              fontSize: 20,
              fontStyle: 'normal',
              lineHeight: 24,
              letterSpacing: 0,
              textAlign: 'left',
              color: '#000000',
            }}
          >
            Login With Phone Number
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

LandingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default LandingScreen;
