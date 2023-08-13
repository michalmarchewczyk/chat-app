import React from 'react';
import { StyleSheet } from 'react-native';
import { ComposerProps } from 'react-native-gifted-chat';

import Input from '../shared/Input';

function ChatInput(props: ComposerProps) {
  return (
    <Input value={props.text} onChangeText={props.onTextChanged} style={styles.input} containerStyles={{ flex: 1 }} />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderBottomRightRadius: 0,
  },
});

export default ChatInput;
