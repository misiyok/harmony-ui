import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import Spacer from '../components/Spacer';


const SkillsForm = ({ headerText, onSubmit, submitButtonText, allSkills }) => {
    const [skills, setSkills] = useState([]);

    return (
        <View>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>

            <FlatList
                    data={allSkills}
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
                <Button title={submitButtonText} onPress={() => {
                    onSubmit( skills );
                }}/>
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({});

export default SkillsForm;