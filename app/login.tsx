import { gql, useMutation } from '@apollo/client';
import { Link, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootMutationType } from '../__generated__/types';
import Input from '../components/Input';
import TextButton from '../components/TextButton';
import { COLORS } from '../styles/colors';
import { AuthContext } from '../utils/AuthContext';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

function Login() {
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
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.header}>Welcome Back</Text>
            <Text style={styles.subheader}>Log in and stay in touch{'\n'}with everyone!</Text>
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
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/signup" asChild>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.footerButton}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.blue['300'],
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    lineHeight: 42,
    marginLeft: -12,
    color: COLORS.plum['500'],
    marginTop: 16,
    marginBottom: 28,
  },
  subheader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    lineHeight: 33,
    marginLeft: -12,
    color: COLORS.white,
    marginBottom: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.white,
  },
  footerButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: COLORS.plum['500'],
  },
});

export default Login;
