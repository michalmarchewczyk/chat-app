import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { RootQueryType } from '../__generated__/types';
import RoomsIcon from '../assets/icons/rooms.svg';
import SearchIcon from '../assets/icons/search.svg';
import EmptyPlaceholder from '../components/EmptyPlaceholder';
import Header from '../components/Header';
import IconButton from '../components/IconButton';
import RoomItem from '../components/RoomItem';
import { COLORS } from '../styles/colors';

const GET_ROOMS = gql`
  query {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

function Rooms() {
  const { loading, error, data, refetch } = useQuery<RootQueryType>(GET_ROOMS);

  const rooms = data?.usersRooms?.rooms ?? [];

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
      {loading && <ActivityIndicator size={50} color={COLORS.blue['500']} style={{ flex: 1 }} />}
      {error && <EmptyPlaceholder text="Something went wrong" />}
      {data && (
        <FlatList
          data={rooms}
          renderItem={({ item }) => <RoomItem name={item?.name ?? ''} id={item?.id ?? ''} />}
          keyExtractor={(item) => item?.id ?? ''}
          ListEmptyComponent={<EmptyPlaceholder text="No rooms" />}
          contentContainerStyle={[styles.list, { flex: rooms.length ? undefined : 1 }]}
          style={{ marginTop: -24 }}
          onRefresh={refetch}
          refreshing={loading}
        />
      )}
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
