import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import {Colors} from '../../../../auto';
// import translations from '../../../Languages/translations';

const DoneButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>Cancel</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 300,
    backgroundColor: '#393939',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SFProDisplay800',
    letterSpacing: 0.75,
  },
});
export default DoneButton;
