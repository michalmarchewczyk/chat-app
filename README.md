# Chat app

Simple chat app

## Features
- Login and Signup
- List of chat rooms
- Live marking of unread rooms
- Chat view
- Live messages updates

## Technologies
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [Expo Router](https://docs.expo.dev/routing/introduction/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Absinthe WebSockets](https://hexdocs.pm/absinthe/apollo.html#using-a-websocket-link)
- [date-fns](https://date-fns.org/)
- [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## Installation
- Clone the repo:
    ```bash
    git clone https://github.com/michalmarchewczyk/chat-app.git
    ```
- Install dependencies:
  ```bash
  npm install
  ```
- Set `EXPO_PUBLIC_API_URL` and `EXPO_PUBLIC_WS_URL` environment variables to GraphQL API URL and WebSocket URL respectively,  
for example using `.env` file:
  ```bash
  EXPO_PUBLIC_API_URL=<URL of GraphQL endpoint>
  EXPO_PUBLIC_WS_URL=<URL of GraphQL WebSocket endpoint>
  ```
- Generate types for GraphQL queries and mutations:
  ```bash
  npm run graphql-codegen
  ```

## Running the app
You can run the app using Expo:
```bash
expo start
```
