import React, { useState, useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import ContinueButton from '../components/ContinueButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const GenderInputScreen = ({ navigation }) => {
  const { _setGender } = useContext(ProfileContext);
  const [gender, setGender] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="I am a" onPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{
          flex: 1,

          alignItems: 'center',
          width: '100%',
        }}
      >
        <Button
          title="WOMAN"
          buttonStyle={{
            borderRadius: 25,
            borderStyle: 'solid',
            borderWidth: 2,
            paddingVertical: 15,
            borderColor: gender === 'woman' ? '#e6e7e8' : '#000',
            backgroundColor: gender === 'woman' ? '#368cff' : 'transparent',
            marginHorizontal: 30,
          }}
          onPress={() => setGender('woman')}
          containerStyle={{ width: '100%', marginVertical: 10 }}
          titleStyle={{
            fontFamily: 'SFProDisplay300',
            fontSize: 16,

            fontStyle: 'normal',
            lineHeight: 19,
            letterSpacing: 0,
            textAlign: 'left',
            color: gender === 'woman' ? '#fff' : '#000',
          }}
        />
        <Button
          title="MAN"
          buttonStyle={{
            borderRadius: 25,
            borderStyle: 'solid',
            borderWidth: 2,
            paddingVertical: 15,
            borderColor: gender === 'man' ? '#e6e7e8' : '#000',
            marginHorizontal: 30,
            backgroundColor: gender === 'man' ? '#368cff' : 'transparent',
          }}
          onPress={() => setGender('man')}
          containerStyle={{ width: '100%', marginVertical: 10 }}
          titleStyle={{
            fontFamily: 'SFProDisplay300',
            fontSize: 16,

            fontStyle: 'normal',
            lineHeight: 19,
            letterSpacing: 0,
            textAlign: 'left',
            color: gender === 'man' ? '#fff' : '#000',
          }}
        />
      </KeyboardAvoidingView>
      {/* <Spacer>
        <Input value={gender} onChangeText={setGender} autoCorrect={false} />
      </Spacer> */}

      <ContinueButton
        title="CONTINUE"
        onPress={() => {
          _setGender(gender);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default GenderInputScreen;
