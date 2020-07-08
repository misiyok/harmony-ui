import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const MessagingScreen = () => {
    const { signout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4>MessagingScreen</Text>
            </Spacer>
            <Spacer>
                <Button title="Log out" onPress={signout} />
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

export default MessagingScreen;