import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { NavigationEvents } from 'react-navigation';
import { Text, ListItem } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import SkillsForm from '../components/SkillsForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';
import EditSkillsScreen from './EditSkillsScreen';
const ProfileScreen = () => {
  const {
    state,
    _setSkills,
    _persistProfile,
    _fetchPotentialMatches,
    _cleanState,
    _setWishes,
    _changeImage,
  } = useContext(ProfileContext);
  useEffect(() => {
    console.log('state', state);
    return () => {};
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [wishesModal, setWishesModal] = useState(false);
  const [edited, setEdited] = useState(false);
  const [image, setimage] = useState(null);
  const { signout } = useContext(AuthContext);
  const getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  const _pickImage = async () => {
    try {
      await getPermissionAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3.5],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setimage(result.uri);
        console.log('uploadImage');
        _changeImage(state.userId, result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  const renderSkillsForm = () => {
    return (
      <View style={{ marginTop: 100 }}>
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <EditSkillsScreen
            cancelSubmit={() => setModalVisible(false)}
            onSubmit={(skills) => {
              setModalVisible(false);
              console.log('changedSkills', skills);
              // check this comparison, it may be not the best solution to understand if edited
              const mySkills = state.skills.map((s) => s.id);

              if (
                skills
                  .map((s) => s.id)
                  .filter((n) => {
                    return mySkills.indexOf(n) !== -1;
                  }).length != skills.length ||
                skills
                  .map((s) => s.id)
                  .filter((n) => {
                    return mySkills.indexOf(n) !== -1;
                  }).length != mySkills.length
              ) {
                console.log('degisti');
                setEdited(true);
                _setSkills(skills);
              }
            }}
            previousSkills={state.skills}
          />
          {/* // <SkillsForm
          //   headerText="Add/Remove Skills"
          //   allSkills={state.allSkills}
          //   submitButtonText="DONE"
          //   selectedSkills={state.skills}
          //   onSubmit={(skills) => {
          //     setModalVisible(false);
          //     // check this comparison, it may be not the best solution to understand if edited
          //     mySkills = state.skills.map((s) => s.id);
          //     if (
          //       skills
          //         .map((s) => s.id)
          //         .filter((n) => {
          //           return mySkills.indexOf(n) !== -1;
          //         }).length != skills.length
          //     ) {
          //       setEdited(true);
          //       _setSkills(skills);
          //     }
          //   }}
          // /> */}
        </Modal>
      </View>
    );
  };
  const renderWishesForm = () => {
    return (
      <View style={{ marginTop: 100 }}>
        <Modal
          visible={wishesModal}
          onRequestClose={() => setWishesModal(false)}
        >
          <EditSkillsScreen
            title="My Wishes Are"
            cancelSubmit={() => setWishesModal(false)}
            onSubmit={(skills) => {
              setWishesModal(false);
              // check this comparison, it may be not the best solution to understand if edited
              const myWishes = state.wishes.map((s) => s.id);
              if (
                skills
                  .map((s) => s.id)
                  .filter((n) => {
                    return myWishes.indexOf(n) !== -1;
                  }).length != skills.length ||
                skills
                  .map((s) => s.id)
                  .filter((n) => {
                    return myWishes.indexOf(n) !== -1;
                  }).length != myWishes.length
              ) {
                setEdited(true);
                _setWishes(skills);
              }
            }}
            previousSkills={state.wishes}
          />
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationEvents
        onWillBlur={() => {
          if (edited) {
            _persistProfile(state);
            setEdited(false);
            // here if the changing info is the profile photo
            // then we shouldnt call this again
            _fetchPotentialMatches(state);
          }
        }}
      />
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
        }}
      >
        <View
          style={{
            padding: 0,
            borderWidth: 5,
            borderRadius: 10,
            borderStyle: 'dashed',
            borderColor: '#368cff',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            width: 230,
            height: 305,
          }}
        >
          <View
            style={{
              width: 225,
              height: 300,
              borderWidth: 0,
              borderRadius: 10,
              borderWidth: 0.1,
              backgroundColor: '#d0d0d0',
            }}
          >
            <Image
              style={{ width: 225, height: 300 }}
              source={
                state.profilePhotoUri ? { uri: state.profilePhotoUri } : null
              }
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                right: -20,
                bottom: -20,
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            >
              <TouchableOpacity
                style={{ width: 50, height: 50 }}
                onPress={_pickImage}
              >
                <Image
                  source={require('../../assets/plusCircle.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Spacer>
          <Text
            style={{
              fontFamily: 'SFProDisplay600',
              fontSize: 26,
              fontStyle: 'normal',
              letterSpacing: 0.31,
              textAlign: 'center',
              color: '#000',
            }}
          >
            { `${state.firstName}, ${ 2020 - parseInt(state.birthday.substr(4))}` }
          </Text>
        </Spacer>
        {/* <Spacer>
          <Text>{state.firstName}</Text>
          <Text>{state.birthday}</Text>
          <Text>{state.gender}</Text>
        </Spacer> */}
        <View
          style={{ width: '100%', alignItems: 'flex-end', paddingRight: 30 }}
        >
          <TouchableOpacity
            title="Edit Skills"
            onPress={() => {
              // open Skills Form
              setModalVisible(true);
            }}
          >
            <Text
              style={{
                fontFamily: 'SFProDisplay300',
                fontSize: 19,

                fontStyle: 'normal',

                letterSpacing: 0.23,
                textAlign: 'center',
                color: '#368cff',
              }}
            >
              <Icon name="pencil" size={19} /> Edit Skills
            </Text>
          </TouchableOpacity>
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
          <View style={{ width: '100%' }}>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsHorizontalScrollIndicator={false}
              style={{ width: '100%' }}
              data={[...state.skills]}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: 62,
                      marginHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#000',
                        height: scale(60),
                        width: scale(60),
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
        </View>
        {/* <FlatList
          data={state.skills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <ListItem chevron title={item.name} />;
          }}
        /> */}
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            paddingRight: 30,
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            title="Edit Skills"
            onPress={() => {
              // open Skills Form
              setWishesModal(true);
            }}
          >
            <Text
              style={{
                fontFamily: 'SFProDisplay300',
                fontSize: 19,

                fontStyle: 'normal',

                letterSpacing: 0.23,
                textAlign: 'center',
                color: '#368cff',
              }}
            >
              <Icon name="pencil" size={19} /> Edit Wishes
            </Text>
          </TouchableOpacity>
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
            Wishes
          </Text>
          <View style={{ width: '100%' }}>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsHorizontalScrollIndicator={false}
              style={{ width: '100%' }}
              data={[...state.wishes]}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: 62,
                      marginHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#000',
                        height: scale(60),
                        width: scale(60),
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
        </View>

        <TouchableOpacity
          onPress={() => {
            _cleanState();
            signout();
          }}
          style={{ position: 'absolute', bottom: 0 }}
        >
          <Text
            style={{
              fontFamily: 'SFProDisplay300',
              fontSize: 19,

              fontStyle: 'normal',

              letterSpacing: 0.23,
              textAlign: 'center',
              color: '#f00',
            }}
          >
            {' '}
            Log Out
          </Text>
        </TouchableOpacity>
        {renderSkillsForm()}
        {renderWishesForm()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
