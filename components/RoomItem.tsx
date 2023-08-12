import { gql, useQuery } from '@apollo/client';
import { formatDistanceToNow, parse } from 'date-fns';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import { RootQueryType } from '../__generated__/types';
import ProfileImage from '../assets/images/profile.svg';
import { COLORS } from '../styles/colors';

const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      messages {
        body
        insertedAt
      }
    }
  }
`;

function RoomItem({ id, name }: { id: string; name: string }) {
  const { data } = useQuery<RootQueryType>(GET_ROOM, {
    variables: { id },
  });

  const room = data?.room;
  const messages = room?.messages ?? [];
  const lastMessage = messages[messages.length - 1];

  const unread = false;

  return (
    <Link href={`/chats/${id}`} asChild style={styles.wrapper}>
      <TouchableHighlight activeOpacity={0.9} underlayColor={COLORS.black}>
        <View style={[styles.item, unread ? styles.itemUnread : null]}>
          <ProfileImage style={{ width: 64, height: 64 }} />
          <View style={styles.textContainer}>
            <Text style={[styles.roomName, unread ? styles.roomNameUnread : null]} numberOfLines={1}>
              {name}
            </Text>
            <Text style={[styles.lastMessage, unread ? styles.lastMessageUnread : null]} numberOfLines={1}>
              {lastMessage?.body ?? '...'}
            </Text>
          </View>
          {unread ? (
            <View style={styles.unreadIndicator} />
          ) : (
            <Text style={styles.lastMessageTime}>
              {lastMessage &&
                formatDistanceToNow(parse(lastMessage?.insertedAt ?? '', 'yyyy-MM-dd HH:mm:ss', new Date())) + ' ago'}
            </Text>
          )}
        </View>
      </TouchableHighlight>
    </Link>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    borderRadius: 12,
  },
  item: {
    backgroundColor: COLORS.white,
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    gap: 16,
    color: COLORS.black,
  },
  itemUnread: {
    backgroundColor: COLORS.plum['500'],
    color: COLORS.white,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.active,
  },
  lastMessageTime: {
    position: 'absolute',
    top: 12,
    right: 12,
    color: COLORS.gray['500'],
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  textContainer: {
    flex: 1,
    marginTop: 2,
  },
  roomName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.black,
    marginRight: 80,
  },
  roomNameUnread: {
    color: COLORS.white,
  },
  lastMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginRight: 24,
  },
  lastMessageUnread: {
    color: COLORS.white,
  },
});

export default RoomItem;
