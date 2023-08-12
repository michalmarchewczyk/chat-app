import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import Input from './Input';
import TextButton from './TextButton';
import { RootMutationType } from '../__generated__/types';
import { AuthContext } from '../utils/AuthContext';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<undefined | string>(undefined);
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [loginUser, { data, loading, error: loginError }] = useMutation<RootMutationType>(LOGIN_USER);

  useEffect(() => {
    setError(loginError?.message ?? undefined);
  }, [loginError]);

  useEffect(() => {
    if (data?.loginUser?.user) {
      authContext.setToken(data.loginUser.token ?? undefined);
      router.push('/rooms');
    }
  }, [data]);

  const submit = async () => {
    await loginUser({ variables: { email, password } }).catch(() => {});
  };

  return (
    <>
      <Input
        label="e-mail address"
        containerStyles={{ height: 100 }}
        value={email}
        onChangeText={setEmail}
        onChange={() => setError(undefined)}
      />
      <Input
        label="password"
        containerStyles={{ height: 100 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={error}
        onChange={() => setError(undefined)}
      />
      <View style={{ flex: 1 }} />
      <TextButton title="Log in" onPress={() => submit()} loading={loading} />
    </>
  );
}

export default LoginForm;
