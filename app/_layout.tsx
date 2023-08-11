import { ApolloProvider } from '@apollo/client';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import React from 'react';

import { getClient } from '../utils/client';

function Layout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins/Poppins-Italic.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={getClient()}>
      <Slot />
    </ApolloProvider>
  );
}

export default Layout;
