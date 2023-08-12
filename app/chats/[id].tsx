import { gql, useMutation, useQuery } from '@apollo/client';
import { parse } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Day, DayProps, GiftedChat, IMessage } from 'react-native-gifted-chat';

import { Message, RootQueryType } from '../../__generated__/types';
import ChatBubble from '../../components/ChatBubble';
import ChatHeader from '../../components/ChatHeader';
import ChatInput from '../../components/ChatInput';
import ChatInputToolbar from '../../components/ChatInputToolbar';
import ChatSendButton from '../../components/ChatSendButton';
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

const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: String!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
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
`;

function Chat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const { data } = useQuery<RootQueryType>(GET_ROOM, {
    variables: { id },
    pollInterval: 500,
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const currentUser = data?.user;
  const room = data?.room;
  useEffect(() => {
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

  const lastMessage = messages[0];
  const lastMessageDate = (lastMessage?.createdAt as Date) ?? undefined;
  lastMessageDate?.setMinutes(lastMessageDate.getMinutes() - lastMessageDate.getTimezoneOffset());

  const send = useCallback(async (messages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    for (const message of messages) {
      await sendMessage({ variables: { roomId: id, body: message.text ?? '' } });
    }
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
        renderDay={(props: DayProps) => <Day {...props} textStyle={{ color: COLORS.gray['500'] }} />}
        renderComposer={ChatInput}
        renderInputToolbar={ChatInputToolbar}
        messagesContainerStyle={{ paddingBottom: 38 }}
        renderSend={ChatSendButton}
        alwaysShowSend
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
