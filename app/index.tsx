import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TextButton from '../components/TextButton';
import { COLORS } from '../styles/colors';

function Index() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 70, color: COLORS.plum['500'] }}>Chatty.</Text>
      <Link href="/login" asChild>
        <TextButton title="Log in" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue['300'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
});

export default Index;
