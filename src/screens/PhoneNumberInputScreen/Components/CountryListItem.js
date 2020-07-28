import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Colors } from '../../../../auto';

const CountryListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <View style={styles.view}>
        <Text style={styles.flag}>{props.flag}</Text>
        <Text numberOfLines={1} style={styles.name}>
          {props.name}
        </Text>
        <Text numberOfLines={1} style={styles.code}>
          {props.code}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  flag: {
    flex: 0.7,
    fontSize: 32,
  },
  name: {
    flex: 3,
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#000',
  },
  code: {
    flex: 1.1,
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#000',
  },
});
export default CountryListItem;
