import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Day, DayProps, GiftedChat, IMessage } from 'react-native-gifted-chat';

import { Message, RootQueryType, RootSubscriptionType } from '../../__generated__/types';
import { SEND_MESSAGE } from '../../api/mutations/sendMessage';
import { GET_ROOM } from '../../api/queries/getRoom';
import { LISTEN_MESSAGE_ADDED } from '../../api/subscriptions/listenMessageAdded';
import ChatBubble from '../../components/chats/ChatBubble';
import ChatHeader from '../../components/chats/ChatHeader';
import ChatInput from '../../components/chats/ChatInput';
import ChatInputToolbar from '../../components/chats/ChatInputToolbar';
import ChatSendButton from '../../components/chats/ChatSendButton';
import { COLORS } from '../../styles/colors';
import { convertToChatMessage } from '../../utils/convertToChatMessage';

function Chat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const { data } = useQuery<RootQueryType>(GET_ROOM, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });
  const { data: subscriptionData } = useSubscription<RootSubscriptionType>(LISTEN_MESSAGE_ADDED, {
    variables: { roomId: id },
  });

  useEffect(() => {
    const newMessage = subscriptionData?.messageAdded;
    if (newMessage) {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [convertToChatMessage(newMessage)]));
    }
  }, [subscriptionData]);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const currentUser = data?.user;
  const room = data?.room;
  useEffect(() => {
    const msgs = room?.messages?.slice() ?? [];
    msgs.reverse();
    setMessages(
      msgs
        .filter((msg): msg is Message => !!msg)
        .map(convertToChatMessage)
        .sort((a, b) => (b.createdAt as number) - (a.createdAt as number)),
    );
  }, [room?.messages]);

  const lastMessage = messages[0];
  const lastMessageDate = (lastMessage?.createdAt as Date) ?? undefined;
  lastMessageDate?.setMinutes(lastMessageDate.getMinutes() - lastMessageDate.getTimezoneOffset());

  const send = useCallback(async (messages: IMessage[] = []) => {
    // setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
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
        messagesContainerStyle={{ paddingBottom: 38, paddingHorizontal: 8 }}
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
