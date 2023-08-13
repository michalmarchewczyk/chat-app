import { useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { RootQueryType } from '../__generated__/types';
import { GET_ROOMS } from '../api/queries/getRooms';
import RoomItem from '../components/rooms/RoomItem';
import RoomsHeader from '../components/rooms/RoomsHeader';
import EmptyPlaceholder from '../components/shared/EmptyPlaceholder';
import { COLORS } from '../styles/colors';

function Rooms() {
  const { loading, error, data, refetch } = useQuery<RootQueryType>(GET_ROOMS);

  const rooms = data?.usersRooms?.rooms ?? [];

  return (
    <View style={styles.container}>
      <RoomsHeader />
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
  list: {
    paddingBottom: 24,
    paddingTop: 48,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: 'red',
  },
});

export default Rooms;
