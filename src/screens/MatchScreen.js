import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';

const MatchScreen = () => {
    const { state, _fetchPotentialMatches } = useContext(ProfileContext);

    useEffect(() => {
        console.log('Match::useEffect');
        _fetchPotentialMatches();
    }, [state.skills, state.wishes]);

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4>MatchScreen</Text>
            </Spacer>
            <Spacer>
                <FlatList
                    data={state.potentialMatches}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <ListItem chevron title={item.name} />
                        );
                    }}
                />
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

export default MatchScreen;