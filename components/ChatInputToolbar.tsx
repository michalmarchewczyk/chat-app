import React from 'react';
import { StyleSheet } from 'react-native';
import { IMessage, InputToolbar, InputToolbarProps } from 'react-native-gifted-chat';

import { COLORS } from '../styles/colors';

function ChatInputToolbar(props: InputToolbarProps<IMessage>) {
  return <InputToolbar {...props} containerStyle={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue['300'],
    padding: 18,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopWidth: 0,
  },
});

export default ChatInputToolbar;
