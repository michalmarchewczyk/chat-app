import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { COLORS } from '../styles/colors';

function IconButton({ children }: { children: React.ReactElement }) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
      {({ pressed }) => React.cloneElement(children, { style: [styles.icon, pressed ? styles.iconPressed : null] })}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    width: 44,
    backgroundColor: COLORS.white,
    color: COLORS.plum['500'],
    borderRadius: 100,
  },
  buttonPressed: {
    backgroundColor: COLORS.plum['500'],
    color: COLORS.white,
  },
  icon: {
    color: COLORS.plum['500'],
  },
  iconPressed: {
    color: COLORS.white,
  },
});

export default IconButton;
