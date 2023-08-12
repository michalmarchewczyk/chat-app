import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { COLORS } from '../styles/colors';

function IconButton({
  children,
  variant,
  onPress,
}: {
  children: React.ReactElement;
  variant?: 'filled' | 'transparent';
  onPress?: () => void;
}) {
  variant = variant ?? 'filled';

  if (variant === 'filled') {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
        {({ pressed }) => React.cloneElement(children, { style: [styles.icon, pressed ? styles.iconPressed : null] })}
      </Pressable>
    );
  } else {
    return (
      <Pressable onPress={onPress} style={[styles.button, styles.buttonTransparent]}>
        {({ pressed }) =>
          React.cloneElement(children, { style: [styles.icon, pressed ? styles.iconTransparentPressed : null] })
        }
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    width: 44,
    backgroundColor: COLORS.white,
    color: COLORS.plum['500'],
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
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
  iconTransparentPressed: {
    color: COLORS.plum['700'],
  },
});

export default IconButton;
