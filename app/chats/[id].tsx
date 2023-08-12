import { gql, useQuery } from '@apollo/client';
import { parse } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { Message, RootQueryType } from '../../__generated__/types';
import ChatBubble from '../../components/ChatBubble';
import ChatHeader from '../../components/ChatHeader';
import { COLORS } from '../../styles/colors';

const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      user {
        id
        firstName
        lastName
      }
      messages {
        id
        body
        insertedAt
        user {
          id
          firstName
          lastName
        }
      }
    }
    user {
      id
      firstName
      lastName
    }
  }
`;

function Chat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const { data } = useQuery<RootQueryType>(GET_ROOM, {
    variables: { id },
    pollInterval: 500,
  });

  const currentUser = data?.user;
  const room = data?.room;
  useEffect(() => {
    console.log('SETTING MESSAGES');
    const msgs = room?.messages?.slice() ?? [];
    msgs.reverse();
    setMessages(
      msgs
        .filter((msg): msg is Message => !!msg)
        .map(
          (message): IMessage => ({
            _id: message.id ?? '',
            text: message.body ?? '',
            createdAt: parse(message?.insertedAt ?? '', 'yyyy-MM-dd HH:mm:ss', new Date()) ?? '',
            user: {
              _id: message.user?.id ?? '',
              name: `${message.user?.firstName ?? ''} ${message.user?.lastName ?? ''}`,
            },
          }),
        )
        .sort((a, b) => (b.createdAt as number) - (a.createdAt as number)),
    );
  }, [room?.messages]);

  const lastMessage = messages[messages.length - 1];
  const lastMessageDate = (lastMessage?.createdAt as Date) ?? undefined;

  console.log('messages', messages);

  const send = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <View style={styles.container}>
      <ChatHeader name={room?.name ?? ''} lastMessageDate={lastMessage ? lastMessageDate : undefined} />
      <GiftedChat
        messages={messages}
        onSend={send}
        user={{
          _id: currentUser?.id ?? '',
          name: `${currentUser?.firstName ?? ''} ${currentUser?.lastName ?? ''}`,
        }}
        renderBubble={ChatBubble}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue['100'],
  },
});

export default Chat;
