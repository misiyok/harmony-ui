import React, { useState, useContext } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const PhoneNumberInputScreen = () => {
    const {state, sendCode, _handleResponse} = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState('');

    renderCaptchScreen = () => {
        return (
            <View style={{ marginTop: 100 }}>
                <Modal
                    visible={ state.showModal }
                    onRequestClose={() => {setShowModal({ showModal: false })}}
                >
                    <WebView
                        source={{ uri: 'http://2865b0a1.ngrok.io/Captcha.html' }}
                        onNavigationStateChange={data =>
                            _handleResponse({data, phoneNumber})
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
                <Input 
                    value={phoneNumber} 
                    onChangeText={setPhoneNumber}
                    autoCorrect={false}
                />
            </Spacer>
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <Spacer>
                <Button title="CONTINUE" onPress={() => sendCode({phoneNumber})}/>
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