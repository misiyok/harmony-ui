import React, { useState, useContext } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import ContinueButton from '../components/ContinueButton';

const CodeVerificationScreen = ({ navigation }) => {
  const { state, setErrorMessage, setIsNewUser } = useContext(AuthContext);
  const [value, setValue] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <Header onPress={() => navigation.goBack()} title="What's the code?" />

      <NavigationEvents
        onWillBlur={() => {
          setErrorMessage({ errorMessage: '' });
        }}
      />

      {/* <Spacer>
        <Input
          value={verificationCode}
          onChangeText={setVerificationCode}
          autoCorrect={false}
        />
      </Spacer> */}
      <View style={styles.content}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          autoFocus
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}
      </View>

      <ContinueButton
        disabled={value.length < 1}
        onPress={() => {
          state.confirmation
            .confirm(value)
            .then((userCredential) => {
              setIsNewUser({
                isNewUser: userCredential.additionalUserInfo.isNewUser,
              });
            })
            .catch((err) => {
              setErrorMessage({ errorMessage: 'Confirmation Error: ', err });
              // when this is set. onWillBlur doesnt clear the errorMessage at every case. (check it)
            });
        }}
      />
      {/* <Spacer>
        <Button
          title="CONTINUE"
          onPress={() => {
            state.confirmation
              .confirm(verificationCode)
              .then((userCredential) => {
                setIsNewUser({
                  isNewUser: userCredential.additionalUserInfo.isNewUser,
                });
                // if (userCredential.additionalUserInfo.isNewUser)
                //     navigation.navigate('FirstNameInput');
                // else
                //     navigation.navigate('Match');
              })
              .catch((err) => {
                setErrorMessage({ errorMessage: 'Confirmation Error: ', err });
                // when this is set. onWillBlur doesnt clear the errorMessage at every case. (check it)
              });
          }}
        />
      </Spacer> */}
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
    paddingHorizontal: 24,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 10,
  },
  root: { padding: 20, minHeight: 300 },
  codeFieldRoot: {
    marginTop: 50,
  },
  cellRoot: {
    width: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 3,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});

export default CodeVerificationScreen;
