import React, { useState, useEffect, useContext }  from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Input, Button, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';

import Spacer from '../components/Spacer';

const WishesInputScreen = () => {
    const { state, _addWishes } = useContext(ProfileContext);
    const [wishes, setWishes] = useState([]);

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>My wishes are</Text>
            </Spacer>

            <FlatList
                    data={state.allSkills}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setWishes([...wishes, item]) }
                            >
                                <ListItem chevron title={item.name} />
                            </TouchableOpacity>
                        );
                    }}
                />

            <Spacer>
                <Button title="CONTINUE" onPress={() => {
                    _addWishes( wishes );
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

export default WishesInputScreen;