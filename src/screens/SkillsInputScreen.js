import React, { useContext }  from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as ProfileContext } from '../context/ProfileContext';
import SkillsForm from '../components/SkillsForm';

const SkillsInputScreen = ({ navigation }) => {
    const { state, _setSkills } = useContext(ProfileContext);
    return (
        <View style={styles.container}>
            <SkillsForm
                headerText="My skills are"
                submitButtonText="CONTINUE"
                onSubmit={(skills) => {
                    _setSkills(skills);
                    navigation.navigate('WishesInput');
                }}
                allSkills={state.allSkills}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    }
});

export default SkillsInputScreen;