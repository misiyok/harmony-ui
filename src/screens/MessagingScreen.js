import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const MessagingScreen = ({ navigation }) => {
  const { state } = useContext(ProfileContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          margin: 15,
        }}
      >
        <Text h4>Messages</Text>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
          showsHorizontalScrollIndicator={false}
          style={{ width: '100%' }}
          data={state.mutualLikes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            console.warn('item: ', item);
            return (
              <TouchableOpacity
                key={index.toString()}
                style={{
                  width: '100%',
                  flexDirection: 'row',

                  paddingHorizontal: 30,
                  marginVertical: 10,
                }}
                onPress={() => navigation.navigate('MessageScreen')}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 38,
                    marginHorizontal: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 38,
                      resizeMode: 'cover',
                    }}
                    source={{ uri: item.profilePhotoUri }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'SFProDisplay300',
                          fontSize: 22,
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          textAlign: 'left',
                          color: '#000',
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: 'SFProDisplay300',
                        fontSize: 14,
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        textAlign: 'left',
                        color: '#949494',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default MessagingScreen;
