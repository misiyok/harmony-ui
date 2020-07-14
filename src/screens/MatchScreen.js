import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';

const MatchScreen = ({ navigation }) => {
    const { state, _fetchPotentialMatches, _fetchUserProfileInfo, _fetchAllSkills } = useContext(ProfileContext);

    useEffect(() => {
        const fetchData = async () => {
            // if(navigation.getParam('userId')){
            //     // having userId at navigation parameters means
            //     // we navigated directly from Landing Screen (Profile Context is empty)
                
            //     await _fetchUserProfileInfo(navigation.getParam('userId'));
            //     _fetchAllSkills();
            //     _fetchPotentialMatches(state);
            // }
            if (!state.userId){
                await _fetchUserProfileInfo(navigation.getParam('userId'));
                _fetchAllSkills();
            } else {
                _fetchPotentialMatches(state);
            }
        }

        fetchData();
    }, [state.userId]);

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4>MatchScreen</Text>
            </Spacer>
            <Spacer>
                <Text h5 style={{   borderBottomWidth: 1,
                                    borderBottomColor: 'black' }}>
                    Potential Matches
                </Text>
                <FlatList
                    data={state.potentialMatches}
                    keyExtractor={item => item.userProfile.id}
                    listKey={(item, index) => 'D' + index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                borderBottomWidth: 1,
                                borderBottomColor: 'black',
                                }}
                            >
                                <ListItem chevron title={item.userProfile.name} />
                                <Text h5>skills (teach)</Text>
                                <FlatList
                                    data={item.matchingSkills}
                                    listKey={(item, index) => 'D' + index.toString()}
                                    keyExtractor={item => item}
                                    renderItem={({ item }) => {
                                        return (
                                            <ListItem title={item} />
                                        );
                                    }}
                                />
                                <Text h5>wishes (learn)</Text>
                                <FlatList
                                        listKey={(item, index) => 'D' + index.toString()}
                                        data={item.matchingWishes}
                                        keyExtractor={item => item}
                                        renderItem={({ item }) => {
                                            return (
                                                <ListItem title={item} />
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