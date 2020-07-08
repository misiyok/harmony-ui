import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';

import Spacer from '../components/Spacer';

const GenderInputScreen = () => {
    const { _setGender } = useContext(ProfileContext);
    const [gender, setGender] = useState('');

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>I am a</Text>
            </Spacer>
            <Spacer>
                <Input 
                    value={gender} 
                    onChangeText={setGender}
                    autoCorrect={false}
                />
            </Spacer>
            <Spacer>
                <Button title="CONTINUE" onPress={() => _setGender(gender)}/>
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    }
});

export default GenderInputScreen;