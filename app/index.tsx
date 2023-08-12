import { Redirect, useRootNavigationState } from 'expo-router';
import React from 'react';

function Index() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState.key) {
    return null;
  }

  return <Redirect href="/login" />;
}

export default Index;
