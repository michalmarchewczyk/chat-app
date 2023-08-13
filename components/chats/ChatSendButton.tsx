import React, { useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { IMessage, Send, SendProps } from 'react-native-gifted-chat';

import SendIcon from '../../assets/icons/send.svg';
import { COLORS } from '../../styles/colors';

function ChatSendButton(props: SendProps<IMessage>) {
  const [pressed, setPressed] = useState(false);
  return (
    <Send
      {...props}
      containerStyle={styles.container}
      sendButtonProps={{ onPressIn: () => setPressed(true), onPressOut: () => setPressed(false), activeOpacity: 1 }}
    >
      <SendIcon style={[styles.icon, pressed ? styles.iconPressed : null] as StyleProp<ViewStyle>} />
    </Send>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    top: -4,
  },
  icon: {
    width: 34,
    height: 34,
    color: COLORS.plum['500'],
  },
  iconPressed: {
    color: COLORS.plum['700'],
  },
});

export default ChatSendButton;
