import React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const LandingScreen = ({ navigation }) => {
    const {state, tryLocalSignin} = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, []);

    console.log('landing screen loading...');

    return (
        <View style={styles.container} >
            <Spacer>
                <Text h3>Harmony</Text>
            </Spacer>
            <Spacer>
                <Button title="LOG IN WITH PHONE NUMBER" onPress={() => navigation.navigate('PhoneNumberInput')} />
            </Spacer>
        </View>
    );
};

LandingScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
});

export default LandingScreen;