import React, { useContext }  from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as ProfileContext } from '../context/ProfileContext';
import SkillsForm from '../components/SkillsForm';

const WishesInputScreen = () => {
    const { state, _setWishes, _persistProfile } = useContext(ProfileContext);
    return (
        <View style={styles.container}>
            <SkillsForm
                headerText="My wishes are"
                submitButtonText="CONTINUE"
                onSubmit={(wishes) => {
                    _setWishes( wishes );
                    _persistProfile( { ...state, wishes } ); // fix it with a nice solution
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

export default WishesInputScreen;