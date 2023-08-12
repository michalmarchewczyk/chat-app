import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginForm from '../components/LoginForm';
import { COLORS } from '../styles/colors';

function Login() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.header}>Welcome Back</Text>
            <Text style={styles.subheader}>Log in and stay in touch{'\n'}with everyone!</Text>
            <LoginForm />
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
    marginTop: 12,
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
