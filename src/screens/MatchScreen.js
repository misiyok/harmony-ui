import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';

const MatchScreen = ({ navigation }) => {
    const { state, _fetchPotentialMatches, _fetchUserProfileInfo } = useContext(ProfileContext);

    useEffect( () => {
        console.log('Match::useEffect');
        if(navigation.getParam('userId')){
            // having userId at navigation parameters means
            // we navigated from Landing Screen (Profile Context is empty)
            _fetchUserProfileInfo(navigation.getParam('userId'));
        }
        _fetchPotentialMatches();
    }, []);

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
                            <View>
                                <ListItem chevron title={item.name} />
                                <FlatList
                                    data={item.skills}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <ListItem title={item.name} />
                                        );
                                    }}
                                />
                            </View>
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