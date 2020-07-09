import React, { useState, useContext } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import PhoneInput from 'react-native-phone-input'

const PhoneNumberInputScreen = () => {
    const {state, sendCode, _handleResponse, setShowModal} = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');

    renderCaptchScreen = () => {
        return (
            <View style={{ marginTop: 100 }}>
                <Modal
                    visible={ state.showModal }
                    onRequestClose={() => {setShowModal({ showModal: false })}}
                >
                    <WebView
                        source={{ uri: 'http://8476f50131ec.ngrok.io/Captcha.html' }}
                        onNavigationStateChange={data =>
                            _handleResponse({data, phoneNumber: `+${countryCode}${phoneNumber}`})
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>My number is</Text>
            </Spacer>
            <Spacer>
                <PhoneInput
                    value={phoneNumber}
                    onChangePhoneNumber={setPhoneNumber}
                    ref = { (ref) => { ref ? setCountryCode(ref.getCountryCode()) : 1 } }
                    textProps = {{placeholder: 'Enter phone number'}}
                    flagStyle = {{width: 50, height: 30, borderWidth:0}}
                    textStyle = {{fontSize: 18}}
                />
            </Spacer>
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <Spacer>
                <Button title="CONTINUE" onPress={() => {
                    sendCode(`+${countryCode}${phoneNumber}`);
                } }/>
            </Spacer>
            {renderCaptchScreen()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    }
});

export default PhoneNumberInputScreen;