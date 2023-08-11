import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import RoomsIcon from '../assets/icons/rooms.svg';
import SearchIcon from '../assets/icons/search.svg';
import Header from '../components/Header';
import IconButton from '../components/IconButton';
import RoomItem from '../components/RoomItem';
import { COLORS } from '../styles/colors';

function Rooms() {
  const rooms = [
    {
      id: 1,
      name: 'Room 1',
      unread: true,
    },
    {
      id: 2,
      name: 'Room 2',
    },
    {
      id: 3,
      name: 'Room 3',
    },
    {
      id: 4,
      name: 'Room 4',
    },
    {
      id: 5,
      name: 'Room 5',
    },
    {
      id: 6,
      name: 'Room 6',
    },
    {
      id: 7,
      name: 'Room 7',
    },
    {
      id: 8,
      name: 'Room 8',
    },
    {
      id: 9,
      name: 'Room 9',
    },
  ];
  return (
    <View style={styles.container}>
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
      <FlatList
        data={rooms}
        renderItem={({ item }) => <RoomItem name={item.name} unread={item.unread} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        style={{ marginTop: -24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue['100'],
  },
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
  list: {
    paddingBottom: 24,
    paddingTop: 48,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: 'red',
  },
});

export default Rooms;
