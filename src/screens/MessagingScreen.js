import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';

const MessagingScreen = () => {
    const { signout } = useContext(AuthContext);
    const { state, _cleanState } = useContext(ProfileContext);

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4>MessagingScreen</Text>
            </Spacer>
            <Spacer>
                <Text h5>Mutual Likes</Text>
                <FlatList
                    data={state.mutualLikes}
                    listKey={(item, index) => 'D' + index.toString()}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <ListItem title={item.name} />
                        );
                    }}
                />
            </Spacer>
            <Spacer>
                <Button title="Log out" onPress={() => {
                    _cleanState();
                    signout();
                }} />
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