import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

import { COLORS } from '../../styles/colors';

function ChatBubble(props: BubbleProps<IMessage>) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{ left: [styles.bubble, styles.bubbleLeft], right: [styles.bubble, styles.bubbleRight] }}
      textStyle={{ left: styles.text, right: styles.text }}
      renderTime={() => null}
    />
  );
}

const styles = StyleSheet.create({
  bubble: {
    marginVertical: 4,
    padding: 4,
    paddingTop: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bubbleLeft: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 0,
  },
  bubbleRight: {
    backgroundColor: COLORS.plum['300'],
    borderBottomRightRadius: 0,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 17,
  },
  textLeft: {
    color: COLORS.black,
  },
  textRight: {
    color: COLORS.white,
  },
});

export default ChatBubble;
