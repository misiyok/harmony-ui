import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, Platform } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';
import * as Permissions from 'expo-permissions';
import Header from '../components/Header';
import ContinueButton from '../components/ContinueButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

const BirthdayInputScreen = ({ navigation }) => {
  const { state, _uploadImage } = useContext(ProfileContext);
  const [image, setimage] = useState(null);

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
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3.5],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setimage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  useEffect(() => {
    getPermissionAsync();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        title={'Add Profile Photo'}
      />
      <View style={styles.content}>
        <View
          style={{
            padding: 0,
            borderWidth: 5,
            borderRadius: 10,
            borderStyle: 'dashed',
            borderColor: '#c0c0c0',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 300,
              height: 400,
              borderWidth: 0,
              borderRadius: 10,
              borderWidth: 0.1,
              backgroundColor: '#d0d0d0',
            }}
          >
            <Image
              style={{ width: 300, height: 400 }}
              source={image ? { uri: image } : null}
              resizeMode="contain"
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
      </View>
      <ContinueButton onPress={() => {
        _uploadImage(state.userId, image);
      }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 100
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BirthdayInputScreen;
