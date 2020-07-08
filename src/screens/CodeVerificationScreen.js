import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const CodeVerificationScreen = ({ navigation }) => {
    const {state, setErrorMessage, setIsNewUser} = useContext(AuthContext);
    const [verificationCode, setVerificationCode] = useState('');

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={() => { setErrorMessage({ errorMessage: '' }) }}
            />
            <Spacer>
                <Text h3>Verification Code</Text>
            </Spacer>
            <Spacer>
                <Input 
                    value={verificationCode} 
                    onChangeText={setVerificationCode}
                    autoCorrect={false}
                />
            </Spacer>
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <Spacer>
                <Button title="CONTINUE" onPress={ () => {
                    state.confirmation.confirm(verificationCode)
                    .then((userCredential) => {
                        setIsNewUser({ isNewUser: userCredential.additionalUserInfo.isNewUser });
                        // if (userCredential.additionalUserInfo.isNewUser)
                        //     navigation.navigate('FirstNameInput');
                        // else
                        //     navigation.navigate('Match');
                    })
                    .catch((err) => {
                        setErrorMessage({ errorMessage: 'Confirmation Error: ', err }); 
                        // when this is set. onWillBlur doesnt clear the errorMessage at every case. (check it)
                    });
                } } />
            </Spacer>
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

export default CodeVerificationScreen;