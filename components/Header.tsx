import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '../styles/colors';

function Header({ children }: React.PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue['300'],
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 104,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 100,
  },
});

export default Header;
