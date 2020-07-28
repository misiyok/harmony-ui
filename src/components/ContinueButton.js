import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Spacer from './Spacer';
import { Button } from 'react-native-elements';

const ContinueButton = ({ onPress, disabled, title = 'CONTINUE' }) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        {/* <Spacer> */}
        <Button
          disabled={disabled}
          title={title}
          buttonStyle={{
            marginHorizontal: 10,
            borderRadius: 35,
            backgroundColor: disabled ? '#fafafa' : '#368cff',
            padding: 10,
            paddingVertical: 5,
          }}
          containerStyle={{ marginBottom: 10, marginHorizontal: 10 }}
          titleStyle={{
            fontFamily: 'SFProDisplay600',
            fontSize: 22,
            fontStyle: 'normal',
            lineHeight: 41,
            letterSpacing: 0.24,
            textAlign: 'left',
            color: disabled ? '#cacaca' : '#fff',
          }}
          onPress={() => {
            return onPress();

            //console.log('akaka');
            // sendCode(
            //   `${countryCode.dial_code}${phoneInput
            //     .split(/[()\s-]+/g)
            //     .join('')}`
            // );
          }}
        />
        {/* </Spacer> */}
      </KeyboardAvoidingView>
    </>
  );
};

export default ContinueButton;
const styles = ScaledSheet.create({
  container: {
    height: 55,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  backImage: {
    width: 13.5,
    height: 22,
  },
  divider: {
    width: '100%',
    height: 1,
    opacity: 0.2,
    backgroundColor: '#fff',
    shadowColor: 'rgba(255, 255, 255, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  titleView: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'SFProDisplay700',
    fontSize: 26,
    fontStyle: 'normal',
    lineHeight: 41,
    letterSpacing: 0.31,
    textAlign: 'left',
    color: '#ffffff',
  },
});
