import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ProgressViewIOSComponent,
  TextInput,
} from 'react-native';
import { Context as ProfileContext } from '../context/ProfileContext';
import { Ionicons as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import ContinueButton from '../components/ContinueButton';

const FirstNameInputScreen = ({ navigation }) => {
  const { _setFirstName, _setUserId, _fetchAllSkills } = useContext(
    ProfileContext
  );
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    _fetchAllSkills();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => {}} title="My first name is" />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#000',
            borderBottomWidth: 2,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Icon name="md-person" size={30} color={'#000'} />
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={{
              fontFamily: 'SFProDisplay300',
              fontSize: 18,
              fontStyle: 'normal',
              lineHeight: 19,
              letterSpacing: 0,
              textAlign: 'left',
              color: '#000',
              marginLeft: 30,
              flex: 1,
            }}
            placeholderTextColor={'#979797'}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="done"
            placeholder={'First Name'}
            autoFocus
          />
        </View>
      </View>

      <ContinueButton
        onPress={() => {
          _setFirstName(firstName);
          _setUserId(navigation.getParam('userId'));
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    marginVertical: 30,
  },
});

export default FirstNameInputScreen;
