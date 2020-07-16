import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Spacer from '../components/Spacer';

const MatchScreen = ({ navigation }) => {
    const { state, _fetchPotentialMatches, _fetchUserProfileInfo, _fetchAllSkills, _like, _dislike } = useContext(ProfileContext);

    useEffect(() => {
        const fetchData = async () => {
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
                                borderBottomColor: 'black'
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
                                <Button title="Like" onPress={() => {
                                    _like({id: state.userId, name: state.firstName}, 
                                        {'id':item.userProfile.id, 'name': item.userProfile.name});
                                }}/>
                                <Spacer />
                                <Button title="Dislike" onPress={() => {
                                    _dislike({id: state.userId, name: state.firstName}, 
                                        {'id':item.userProfile.id, 'name': item.userProfile.name});
                                }}/>
                                <Spacer />
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