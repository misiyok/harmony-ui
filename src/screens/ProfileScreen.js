import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';

const ProfileScreen = () => {
    const { state } = useContext(ProfileContext);

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4>ProfileScreen</Text>
            </Spacer>
            <Spacer>
                <Text>{state.firstName}</Text>
                <Text>{state.birthday}</Text>
                <Text>{state.gender}</Text>
            </Spacer>
                <Text h4>Skills</Text>
            <Spacer>
                <FlatList
                    data={state.skills}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                    return (
                        <ListItem chevron title={item.name} />
                    );
                    }}
                />
            </Spacer>

            <Spacer>
                <Text h4>Wishes</Text>
            </Spacer>
                <FlatList
                    data={state.wishes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                    return (
                        <ListItem chevron title={item.name} />
                    );
                    }}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ProfileScreen;