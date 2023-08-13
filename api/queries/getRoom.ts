import { gql } from '@apollo/client';

export const GET_ROOM = gql`
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

export const GET_ROOM_SIMPLE = gql`
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
