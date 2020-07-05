import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';

const ProfileScreen = () => {
    const { state, _persistEditedProfile } = useContext(ProfileContext);
    const [edited, setEdited] = useState(false);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={() => {
                if(edited){
                    const addedSkills = [{'id': 'yoga', 'name': 'Yoga'}];
                    const removedSkills = [{'id': 'football', 'name': 'Football'}];
                    const addedWishes = [{'id': 'painting', 'name': 'painting'}];
                    const removedWishes = [];
                    _persistEditedProfile(state, addedSkills, removedSkills, addedWishes, removedWishes);
                    setEdited(false);
                }
            }} />
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
            <Spacer>
                <Button title="SET EDITED TO TRUE" onPress={() => setEdited(true)}/>
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

export default ProfileScreen;