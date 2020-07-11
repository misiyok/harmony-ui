import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Button, Modal } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';
import SkillsForm  from '../components/SkillsForm';

const ProfileScreen = () => {
    const { state, _setSkills, _persistProfile } = useContext(ProfileContext);
    const [ modalVisible, setModalVisible] = useState(false);
    const [ edited, setEdited ] = useState(false);

    renderSkillsForm = () => {
        return (
            <View style={{ marginTop: 100 }}>
                <Modal
                    visible={ modalVisible }
                    onRequestClose={() => setModalVisible(false)}
                >
                    <SkillsForm
                        headerText="Add/Remove Skills"
                        allSkills={state.allSkills}
                        submitButtonText="DONE"
                        selectedSkills={state.skills}
                        onSubmit={(skills) => {
                            setModalVisible(false);
                            if (skills != state.skills){
                                setEdited(true);
                            }
                            _setSkills(skills);
                        }}
                    />
                </Modal>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={() => {
                if(edited){
                    _persistProfile(state);
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
            <Spacer>
                <Text h4>Skills</Text>
            </Spacer>
            <FlatList
                data={state.skills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <ListItem chevron title={item.name} />
                    );
                }}
            />
            <Button title="EDIT SKILLS" onPress={() => {
                // open Skills Form
                setModalVisible(true);
            }}/>

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
            {renderSkillsForm()}
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