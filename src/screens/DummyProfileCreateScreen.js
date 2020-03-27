import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';

import Spacer from '../components/Spacer';

const DummyProfileCreateScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4>your account has been created</Text>
            </Spacer>
            <Spacer>
                <Button title="Go to Match Screen" onPress={() => navigation.navigate('Match')} />
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default DummyProfileCreateScreen;