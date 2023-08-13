import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RoomsIcon from '../../assets/icons/rooms.svg';
import SearchIcon from '../../assets/icons/search.svg';
import { COLORS } from '../../styles/colors';
import Header from '../shared/Header';
import IconButton from '../shared/IconButton';

function RoomsHeader() {
  return (
    <Header>
      <Text style={styles.headerText}>Rooms</Text>
      <View style={styles.headerIcons}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <RoomsIcon />
        </IconButton>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: COLORS.plum['500'],
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 2,
  },
});

export default RoomsHeader;
