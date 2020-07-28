import React, { useState, useContext, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as ProfileContext } from '../context/ProfileContext';

import Header from '../components/Header';
import ContinueButton from '../components/ContinueButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const BirthdayInputScreen = ({ navigation }) => {
  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const { _setBirthday } = useContext(ProfileContext);
  const [birthday, setBirthday] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        title={'My birthday is'}
      />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextInput
            autoFocus
            placeholderTextColor="#979797"
            placeholder="DD"
            style={{
              fontFamily: 'SFProDisplay300',
              fontSize: 28,
              fontStyle: 'normal',
              flex: 2,
              color: '#000',
              textAlign: 'right',
              paddingHorizontal: 15,
            }}
            keyboardType="numeric"
            maxLength={2}
            value={day}
            onChangeText={(text) => {
              setDay(text);
              if (text.length >= 2) {
                monthInputRef.current.focus();
              }
              // const day = Math.min(parseInt(text), 31);
              // if (day && day > 3 && day < 10) {
              //   setDay('0' + text);
              //   monthInputRef.current.focus();
              // } else {
              //   setMonth(day.toString());
              //   if (text.length >= 2) {
              //     monthInputRef.current.focus();
              //   }
            }}
          />

          <Text
            style={{
              // fontFamily: 'SFProDisplay800',
              fontSize: 40,
              fontWeight: '700',
              fontStyle: 'normal',
              color: '#000',
            }}
          >
            /
          </Text>

          <TextInput
            placeholderTextColor="#979797"
            placeholder="MM"
            ref={monthInputRef}
            style={{
              fontFamily: 'SFProDisplay300',
              fontSize: 28,
              fontStyle: 'normal',

              color: '#000',
              paddingHorizontal: 15,
              overflow: 'visible',
            }}
            keyboardType="numeric"
            maxLength={2}
            //onChangeText={setMonth}
            onChangeText={(text) => {
              setMonth(text);
              if (text.length >= 2) {
                yearInputRef.current.focus();
              }
              // const day = Math.min(parseInt(text), 12);
              // if (day && day > 1 && day < 10) {
              //   setMonth('0' + text);
              //   monthInputRef.current.focus();
              // } else {
              //   setMonth(day.toString());

              // }
            }}
          />

          <Text
            style={{
              // fontFamily: 'SFProDisplay800',
              fontSize: 40,

              fontWeight: '700',
              fontStyle: 'normal',
              color: '#000',
            }}
          >
            /
          </Text>
          <TextInput
            onChangeText={setYear}
            placeholderTextColor="#979797"
            placeholder="YYYY"
            ref={yearInputRef}
            style={{
              fontFamily: 'SFProDisplay300',
              fontSize: 28,
              fontStyle: 'normal',
              flex: 2,
              color: '#000',
              paddingHorizontal: 15,
              overflow: 'visible',
              textAlign: 'left',
            }}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
      </View>
      <ContinueButton onPress={() => _setBirthday(day + month + year)} />
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
  },
});

export default BirthdayInputScreen;
