import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat';
import Header from '../components/Header';
import { navigate } from '../navigationRef';
const MessageScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigate('Messaging');
        }}
        title="Jennifer"
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};
export default MessageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
