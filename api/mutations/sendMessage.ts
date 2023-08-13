import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
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
