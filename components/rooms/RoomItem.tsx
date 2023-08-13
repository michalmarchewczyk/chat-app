import { useQuery, useSubscription } from '@apollo/client';
import { formatDistanceToNow, parse } from 'date-fns';
import { Link } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { Message, RootQueryType, RootSubscriptionType } from '../../__generated__/types';
import { GET_ROOM_SIMPLE } from '../../api/queries/getRoom';
import { LISTEN_MESSAGE_ADDED_SIMPLE } from '../../api/subscriptions/listenMessageAdded';
import ProfileImage from '../../assets/images/profile.svg';
import { COLORS } from '../../styles/colors';

function RoomItem({ id, name }: { id: string; name: string }) {
  const [lastMessage, setLastMessage] = React.useState<Message | null>(null);

  const { data } = useQuery<RootQueryType>(GET_ROOM_SIMPLE, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });
  const { data: subscriptionData } = useSubscription<RootSubscriptionType>(LISTEN_MESSAGE_ADDED_SIMPLE, {
    variables: { roomId: id },
  });

  useEffect(() => {
    if (subscriptionData?.messageAdded) {
      setLastMessage(subscriptionData.messageAdded);
    }
  }, [subscriptionData]);

  useEffect(() => {
    const room = data?.room;
    const messages = room?.messages?.slice() ?? [];
    messages.sort(
      (a, b) =>
        parse(a?.insertedAt ?? '', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime() -
        parse(b?.insertedAt ?? '', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime(),
    );
    setLastMessage(messages[messages.length - 1] ?? null);
  }, [data]);

  const lastMessageDate = useMemo(() => {
    const date = parse(lastMessage?.insertedAt ?? '', 'yyyy-MM-dd HH:mm:ss', new Date());
    date?.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }, [lastMessage]);

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
            <Text style={styles.lastMessageTime}>{lastMessage && formatDistanceToNow(lastMessageDate) + ' ago'}</Text>
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
    top: 8,
    right: 12,
    color: COLORS.gray['500'],
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  textContainer: {
    flex: 1,
    marginTop: 5,
  },
  roomName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: COLORS.black,
    marginRight: 88,
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
