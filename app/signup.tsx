import { Link } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '../components/Input';
import TextButton from '../components/TextButton';
import { COLORS } from '../styles/colors';

function Signup() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.header}>Create account</Text>
            <Input label="e-mail address" containerStyles={{ height: 100 }} />
            <Input label="first name" containerStyles={{ height: 100 }} />
            <Input label="last name" containerStyles={{ height: 100 }} />
            <Input label="password" containerStyles={{ height: 100 }} secureTextEntry />
            <Input label="password confirmation" containerStyles={{ height: 100 }} secureTextEntry />
            <View style={{ flex: 1 }} />
            <TextButton title="Sign up" />
            <View style={styles.terms}>
              <Text style={styles.termsText}>
                <Text>By signing up, you agree with{'\n'}</Text>
                <Text style={styles.termsLink} onPress={() => Linking.openURL('https://google.com')}>
                  Terms of Service
                </Text>
                <Text> and </Text>
                <Text style={styles.termsLink} onPress={() => Linking.openURL('https://google.com')}>
                  Privacy Policy.
                </Text>
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Link href="/login" asChild>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.footerButton}>Log in</Text>
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
  terms: {
    marginTop: 12,
  },
  termsText: {
    position: 'relative',
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 13,
  },
  termsLink: {
    color: COLORS.blue['500'],
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
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

export default Signup;
