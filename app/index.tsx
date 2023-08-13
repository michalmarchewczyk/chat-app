import { Redirect, useRootNavigationState } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { COLORS } from '../styles/colors';

function Index() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState.key) {
    return <View style={{ backgroundColor: COLORS.blue['300'], flex: 1 }} />;
  }

  return <Redirect href="/login" />;
}

export default Index;
