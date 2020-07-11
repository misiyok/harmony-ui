import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import Spacer from '../components/Spacer';


const SkillsForm = ({ headerText, onSubmit, submitButtonText, allSkills, selectedSkills }) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        if(selectedSkills){
            setSkills(selectedSkills);
        }
    }, []);

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
                                { skills.includes(item) ? <ListItem chevron title={`${item.name} - (${item.category})`} checkmark /> :
                                <ListItem chevron title={`${item.name} - (${item.category})`} checkBox /> }
                                
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