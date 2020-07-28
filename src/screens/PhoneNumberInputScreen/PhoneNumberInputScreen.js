import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, Input, Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import CountryCodeModal from './Components/CountryCodeModal';
import { Context as AuthContext } from '../../context/AuthContext';
import Spacer from '../../components/Spacer';
import { TextInputMask } from 'react-native-masked-text';
import PhoneInput from 'react-native-phone-input';
import Header from '../../components/Header';
import ContinueButton from '../../components/ContinueButton';

const PhoneNumberInputScreen = ({ navigation }) => {
  const {
    state,
    sendCode,
    _handleResponse,
    setShowModal,
    setErrorMessage,
  } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [countryCode, setCountryCode] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);
  const [phoneInput, setphoneInput] = useState('');
  const [countryCode, setcountryCode] = useState({
    name: 'United States',
    flag: '🇺🇸',
    code: 'US',
    dial_code: '+1',
  });

  renderCaptchScreen = () => {
    return (
      <View>
        <Modal
          visible={state.showModal}
          onRequestClose={() => {
            setShowModal({ showModal: false });
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}
          >
            <Header
              onPress={() => {
                setShowModal({ showModal: false });
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  height: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <WebView
                  source={{ uri: 'http://2eef7f5546a1.ngrok.io/Captcha.html' }}
                  onNavigationStateChange={(data) =>
                    _handleResponse({
                      data,
                      phoneNumber: `${countryCode.dial_code}${phoneInput
                        .split(/[()\s-]+/g)
                        .join('')}`,
                    })
                  }
                  containerStyle={{ width: '100%', height: '80%' }}
                  style={{ width: '100%' }}
                  injectedJavaScript={`document.f1.submit()`}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        title={"What's your number ?"}
        subTitle={"We'll text a code to verify your phone"}
      />
      <NavigationEvents
        onWillBlur={() => {
          setErrorMessage({ errorMessage: '' });
        }}
      />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>
            {/* {translations.joinBluedot} */}
          </Text>
          <View style={styles.inputView}>
            <TouchableHighlight
              underlayColor={'#e6e7e9'}
              activeOpacity={0.7}
              onPress={() => {
                setmodalVisible(true);
                //this.setState({ modalVisible: true });
              }}
              style={styles.touchable}
            >
              <View style={styles.registerContainer}>
                <Text style={styles.country}>{countryCode.flag}</Text>
                <Icon
                  name="ios-arrow-down"
                  size={20}
                  color={'#000'}
                  style={styles.arrow}
                />
                <View
                  style={{
                    borderLeftColor: '#e6e7e9',
                    borderLeftWidth: 1,
                    height: '50%',
                    // borderTopRightRadius: 10,
                    // borderBottomRightRadius: 10,
                    marginLeft: 15,
                    paddingLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text numberOfLines={1} style={styles.dialCode}>
                    {countryCode.dial_code}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            <CountryCodeModal
              onCountryPress={(countryCode) => {
                setcountryCode(countryCode);
                // this.setState({ countryCode: countryCode });
              }}
              onDismiss={() => {
                setmodalVisible(false);
              }}
              // onDismiss={() => {
              //   setmodalVisible(false);
              //   if (this.inputRef.current)
              //     this.inputRef.current._inputElement.focus();
              // }}
              visible={modalVisible}
            />
            <TextInputMask
              type={'custom'}
              options={{
                mask: '999 999 9999999',
              }}
              // ref={this.inputRef}
              style={styles.textNumber}
              value={phoneInput}
              onChangeText={(text) => {
                setphoneInput(text);
              }}
              returnKeyType="done"
              maxLength={15}
              keyboardType="phone-pad"
              placeholder={'(201) 555-0123'}
              placeholderTextColor="#979797"
            />
          </View>
          {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
          ) : null}
        </View>
      </View>
      {/* <Spacer>
        <PhoneInput
          value={phoneNumber}
          onChangePhoneNumber={setPhoneNumber}
          ref={(ref) => {
            ref ? setCountryCode(ref.getCountryCode()) : 1;
          }}
          textProps={{ placeholder: 'Enter phone number' }}
          flagStyle={{ width: 50, height: 30, borderWidth: 0 }}
          textStyle={{ fontSize: 18 }}
        />
      </Spacer> */}
      <ContinueButton
        disabled={phoneInput.length < 1}
        onPress={() => {
          sendCode(
            `${countryCode.dial_code}${phoneInput.split(/[()\s-]+/g).join('')}`
          );
        }}
      />
      {renderCaptchScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
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
  content: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.8,
    width: '85%',
    marginTop: 10,
  },
  inputView: {
    width: '100%',
    height: 60,
    // borderRadius: 10,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    borderBottomWidth: 2,
    borderColor: '#e6e7e9',
    // shadowOpacity: 0.3,
    // elevation: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    // borderColor: Colors.white,
    // borderWidth: 1,
  },
  touchable: {
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    minWidth: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  dialCode: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 1.3,
    color: '#000',
    marginRight: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
    height: '100%',
    // borderRightColor: '#e6e7e9',
    // borderRightWidth: 1,
  },
  arrow: { marginLeft: 10, marginRight: -5 },
  country: {
    fontSize: 35,
    marginLeft: 10,
    marginRight: 5,
    color: '#fff',
  },
  textNumber: {
    flex: 4,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 1.3,
    textAlign: 'left',
    color: '#000',
    // borderWidth: 3,
    // borderColor: '#fff',
  },
});

export default PhoneNumberInputScreen;
