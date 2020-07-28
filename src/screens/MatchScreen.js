import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Image,
  StatusBar,
} from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

const MatchScreen = ({ navigation }) => {
  const {
    state,
    _fetchPotentialMatches,
    _fetchUserProfileInfo,
    _fetchAllSkills,
    _like,
    _dislike,
  } = useContext(ProfileContext);

  const [matchedSkills, setMatchedSkills] = useState([]);
  const [matchedWishes, setMatchedWishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!state.userId) {
        await _fetchUserProfileInfo(navigation.getParam('userId'));
        _fetchAllSkills();
      } else {
        _fetchPotentialMatches(state);
      }
    };
    fetchData();
  }, [state.userId]);

  const _renderItem = (item, index) => {
    if(index === 0){
      setMatchedSkills(item.matchingSkills);
      setMatchedWishes(item.matchingWishes);
    }
    return (
      <View
        style={{
          backgroundColor: '#000',
          width: 150,
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Text style={styles.title}>{item.title}</Text> */}
        
        <Image
          source={item ? {uri: item.userProfile.profilePhotoUri} : null}
          style={{ width: 150, height: 150, resizeMode: 'cover' }}
        />
      </View>
    );
  };
  const ENTRIES1 = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: require('../../assets/bgImage.png'),
    },
    {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: require('../../assets/bgImage.png'),
    },
    {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: require('../../assets/bgImage.png'),
    },
    {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: require('../../assets/bgImage.png'),
    },
    {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: require('../../assets/bgImage.png'),
    },
    {
      title: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: require('../../assets/bgImage.png'),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ alignItems: 'center', flex: 1 }}>
        {/* <View
        style={{
          padding: 0,
        
          
        }}
      > */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              width: 150,
              height: 200,
              padding: 3,
              borderWidth: 0,
              borderRadius: 10,
              borderWidth: 0.1,
              backgroundColor: '#d0d0d0',
              borderStyle: 'dashed',
              borderColor: '#368cff',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 3,
            }}
          >
            <View style={{ width: 145, height: 195 }}>
              <Image
                style={{ width: 145, height: 195 }}
                source={state.profilePhotoUri ? { uri: state.profilePhotoUri } : require('../../assets/bgImage.png')}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',

            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'SFProDisplay300',
              fontSize: 19,

              fontStyle: 'normal',

              letterSpacing: 0.23,
              textAlign: 'center',
              color: '#000',
            }}
          >
            Skills
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 30,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%' }}
            data={matchedSkills}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: 62,

                    marginHorizontal: 5,
                  }}
                >
                  <View
                    style={{
                      height: 62,
                      width: 62,
                      borderRadius: 15,
                      backgroundColor: '#000',
                    }}
                  >
                    {item.uri && (
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          height: scale(60),
                          width: scale(60),
                          borderRadius: 10,
                          resizeMode: 'cover',
                        }}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'SFProDisplay300',
                        fontSize: 12,
                        fontStyle: 'normal',

                        letterSpacing: 0,
                        textAlign: 'left',
                        color: '#000',
                      }}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'SFProDisplay300',
              fontSize: 19,

              fontStyle: 'normal',

              letterSpacing: 0.23,
              textAlign: 'center',
              color: '#000',
            }}
          >
            Wishes
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 30,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%' }}
            data={matchedWishes}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: 62,

                    marginHorizontal: 5,
                  }}
                >
                  <View
                    style={{
                      height: 62,
                      width: 62,
                      borderRadius: 15,
                      backgroundColor: '#000',
                    }}
                  >
                    {item.uri && (
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          height: scale(60),
                          width: scale(60),
                          borderRadius: 15,
                          resizeMode: 'cover',
                        }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'SFProDisplay300',
                        fontSize: 12,
                        fontStyle: 'normal',

                        letterSpacing: 0,
                        textAlign: 'left',
                        color: '#000',
                      }}
                      adjustsFontSizeToFit
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {/* </View> */}

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text h5 style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
            Potential Matches
          </Text>
          {/* <FlatList
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
                /> */}
          <View
            style={{
              width: 150,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {
              state.potentialMatches.length > 0 ?
              <Swiper
                backgroundColor={'#000'}
                infinite={false}
                showSecondCard
                cardVerticalMargin={0}
                cardHorizontalMargin={0}
                stackSize={3}
                cards={state.potentialMatches}
                renderCard={_renderItem}
                useViewOverflow={Platform.OS === 'ios'}
                onSwiped={(i) => {
                  if(i === state.potentialMatches.length - 1)
                    return;
                  setMatchedSkills(state.potentialMatches[i+1].matchingSkills);
                  setMatchedWishes(state.potentialMatches[i+1].matchingWishes);
                }}
                onSwipedLeft={ (index) => {
                  _dislike({id: state.userId, name: state.firstName}, 
                    {'id':state.potentialMatches[index].userProfile.id, 'name': state.potentialMatches[index].userProfile.name});
                }}
                onSwipedRight={ (index) => {
                  _like({id: state.userId, name: state.firstName, profilePhotoUri: state.profilePhotoUri}, 
                    {'id':state.potentialMatches[index].userProfile.id, 'name': state.potentialMatches[index].userProfile.name});
                }}
              ></Swiper>
              :
              <Image
                source={null}
                style={{ width: 150, height: 150, resizeMode: 'cover' }}
              />
            }
          </View>
        </View>
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

export default MatchScreen;
