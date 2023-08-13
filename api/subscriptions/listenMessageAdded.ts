import { gql } from '@apollo/client';

export const LISTEN_MESSAGE_ADDED = gql`
  subscription ListenMessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
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

export const LISTEN_MESSAGE_ADDED_SIMPLE = gql`
  subscription ListenMessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      insertedAt
    }
  }
`;
