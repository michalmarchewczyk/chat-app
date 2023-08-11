import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { COLORS } from '../styles/colors';

function EmptyPlaceholder({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 48,
    color: COLORS.blue['300'],
    alignSelf: 'center',
    marginTop: -24,
  },
});

export default EmptyPlaceholder;
