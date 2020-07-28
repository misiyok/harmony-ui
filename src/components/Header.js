import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const Header = ({ onPress, title, subTitle }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            paddingHorizontal: 20,
            height: 55,
            justifyContent: 'center',
            width: '30%',
          }}
        >
          <Image
            source={require('../../assets/Back.png')}
            resizeMode="contain"
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: 'SFProDisplay300',
            fontSize: 18,
            // fontStyle: 'normal',
            lineHeight: 21,
            letterSpacing: 0.22,
            textAlign: 'left',
            color: '#ffffff',
          }}
        >
          {subTitle}
        </Text>
      </View>
    </>
  );
};

export default Header;
const styles = ScaledSheet.create({
  container: {
    height: 55,

    justifyContent: 'center',
  },
  backImage: {
    width: 13.5,
    height: 22,
  },
  divider: {
    width: '100%',
    height: 1,
    opacity: 0.2,
    backgroundColor: '#000',
    shadowColor: 'rgba(255, 255, 255, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  titleView: {
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    fontFamily: 'SFProDisplay700',
    fontSize: 32,
    fontStyle: 'normal',
    letterSpacing: 0.31,
    color: '#000',
  },
});
