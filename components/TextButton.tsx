import React from 'react';
import { Button, Pressable, StyleSheet, Text } from 'react-native';

import { COLORS } from '../styles/colors';

class TextButton extends Button {
  render() {
    return (
      <Pressable style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]} {...this.props}>
        <Text style={styles.buttonLabel}>{this.props.title}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: COLORS.plum['500'],
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonPressed: {
    backgroundColor: COLORS.plum['700'],
  },
  buttonLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 1,
    color: COLORS.white,
  },
});

export default TextButton;
