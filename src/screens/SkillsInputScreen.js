import React, { useState, useEffect, useContext }  from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Input, Button, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';

import Spacer from '../components/Spacer';

const SkillsInputScreen = () => {
    const { state, _addSkills, _fetchSkills } = useContext(ProfileContext);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        _fetchSkills();
    }, []);

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>My skills are</Text>
            </Spacer>

            <FlatList
                    data={state.allSkills}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setSkills([...skills, item]) }
                            >
                                <ListItem chevron title={item.name} />
                            </TouchableOpacity>
                        );
                    }}
                />

            <Spacer>
                <Button title="CONTINUE" onPress={() => {
                    _addSkills( skills );
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

export default SkillsInputScreen;