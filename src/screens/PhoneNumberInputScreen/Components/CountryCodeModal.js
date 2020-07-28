import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
// import { Colors } from '../../../../auto';
import CountryPhoneCodes from '../Constants/CountryPhoneCodes';
import CountryListItem from '../Components/CountryListItem';
import DoneButton from './DoneButton';

const ClassName = (props) => {
  const [input, setInput] = useState(null);
  const [countryList, setCountryList] = useState(CountryPhoneCodes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    search();
  }, [input]);

  const search = () => {
    if (input == null || input.lenght <= 2) {
      return;
    }
    // console.log('Started');
    setCountryList(CountryPhoneCodes.filter(filterArray));
    // console.log('Finsihed');
    setLoading(false);
  };
  const filterArray = (country) => {
    const upperInput = input.toUpperCase();
    if (
      country.name.toUpperCase().startsWith(upperInput) ||
      country.code.toUpperCase().startsWith(upperInput) ||
      country.dial_code.startsWith('+' + input)
    ) {
      return true;
    }
    return false;
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.background}>
          <View style={styles.container}>
            <TextInput
              numberOfLines={1}
              returnKeyType="search"
              onChangeText={(text) => {
                setLoading(true);
                setInput(text);
              }}
              value={input}
              placeholder={'search'}
              placeholderTextColor={'#000'}
              style={styles.input}
              upperInput
            />
            {loading ? (
              <View style={styles.activityView}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <FlatList
                keyboardShouldPersistTaps="always"
                style={styles.flatList}
                keyExtractor={(item) => item.code}
                data={countryList}
                renderItem={(item) => {
                  item = item.item;
                  return (
                    <CountryListItem
                      onPress={() => {
                        props.onDismiss();
                        props.onCountryPress(item);
                      }}
                      key={item.code}
                      name={item.name}
                      flag={item.flag}
                      code={item.dial_code}
                    />
                  );
                }}
              />
            )}
            <DoneButton onPress={props.onDismiss} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    backgroundColor: '#fff',

    height: '100%',
    width: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    color: '#000',
    height: 50,
    fontSize: 22,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    width: '80%',
    borderBottomWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  flatList: {
    flex: 1,
    width: '90%',
    marginVertical: 10,
  },
  activityView: {
    flex: 1,
    width: '90%',
    marginVertical: 10,
    justifyContent: 'center',
  },
});
export default ClassName;
