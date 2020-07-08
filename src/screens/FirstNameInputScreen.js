import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';

import Spacer from '../components/Spacer';

const FirstNameInputScreen = ({ navigation }) => {
    const { _setFirstName, _setUserId } = useContext(ProfileContext);
    const [firstName, setFirstName] = useState('');
    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>My first name is</Text>
            </Spacer>
            <Spacer>
                <Input 
                    value={firstName} 
                    onChangeText={setFirstName}
                    autoCorrect={false}
                />
            </Spacer>
            <Spacer>
                <Button title="CONTINUE" onPress={() => {
                    _setFirstName(firstName);
                    _setUserId(navigation.getParam('userId'));
                    }}/>
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    }
});

export default FirstNameInputScreen;