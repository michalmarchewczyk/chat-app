import { parse } from 'date-fns';
import { IMessage } from 'react-native-gifted-chat';

import { Message } from '../__generated__/types';

export const convertToChatMessage = (message: Message): IMessage => ({
  _id: message.id ?? '',
  text: message.body ?? '',
  createdAt: parse(message?.insertedAt ?? '', 'yyyy-MM-dd HH:mm:ss', new Date()) ?? '',
  user: {
    _id: message.user?.id ?? '',
    name: `${message.user?.firstName ?? ''} ${message.user?.lastName ?? ''}`,
  },
});
