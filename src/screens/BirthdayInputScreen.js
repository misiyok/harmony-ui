import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';

import Spacer from '../components/Spacer';

const BirthdayInputScreen = ({ navigation }) => {
    const { _setBirthday } = useContext(ProfileContext);
    const [birthday, setBirthday] = useState('');

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>My birthday is</Text>
            </Spacer>
            <Spacer>
                <Input 
                    value={birthday} 
                    onChangeText={setBirthday}
                    autoCorrect={false}
                />
            </Spacer>
            <Spacer>
                <Button title="CONTINUE" onPress={() => _setBirthday(birthday)}/>
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    }
});

export default BirthdayInputScreen;