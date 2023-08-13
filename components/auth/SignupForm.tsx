import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import validator from 'validator';

import { RootMutationType } from '../../__generated__/types';
import { REGISTER_USER } from '../../api/mutations/registerUser';
import Input from '../shared/Input';
import TextButton from '../shared/TextButton';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [registerUser, { data, loading, error: registerError }] = useMutation<RootMutationType>(REGISTER_USER);
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    if ((registerError?.graphQLErrors?.[0].errors as string) === 'email has already been taken') {
      setErrors({ ...errors, email: 'Email has already been taken' });
    }
  }, [registerError]);

  useEffect(() => {
    if (data?.registerUser?.id) {
      Alert.alert(
        'User created',
        `Welcome ${data.registerUser.firstName} ${data.registerUser.lastName}\nYou can now log in`,
        [{ text: 'OK', onPress: () => router.push('/login') }],
        { onDismiss: () => router.push('/login') },
      );
    }
  }, [data]);

  const runValidationsStrict = () => {
    const newErrors: Record<string, string | undefined> = {
      ...errors,
      email: !email || !validator.isEmail(email) ? 'Invalid email' : undefined,
      firstName: firstName ? undefined : 'First name is required',
      lastName: lastName ? undefined : 'Last name is required',
      password: !password || password.length < 8 ? 'Password must be at least 8 characters' : undefined,
      passwordConfirmation: passwordConfirmation ? undefined : 'Password confirmation is required',
    };
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.values(newErrors).some((error) => error);
  };

  const runValidations = () => {
    const newErrors: Record<string, string | undefined> = {
      ...errors,
      email: email && !validator.isEmail(email) ? 'Invalid email' : undefined,
      password: password && password.length < 8 ? 'Password must be at least 8 characters' : undefined,
    };
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
    }
    setErrors(newErrors);
  };

  const submit = async () => {
    const checkErrors = runValidationsStrict();
    if (checkErrors) {
      return;
    }
    await registerUser({
      variables: { email, firstName, lastName, password, passwordConfirmation },
    }).catch(() => {});
  };

  return (
    <>
      <Input
        label="e-mail address"
        containerStyles={{ height: 100 }}
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        onBlur={() => runValidations()}
        onChange={() => setErrors({ ...errors, email: undefined })}
        inputMode="email"
      />
      <Input
        label="first name"
        containerStyles={{ height: 100 }}
        value={firstName}
        onChangeText={setFirstName}
        error={errors.firstName}
        onBlur={() => runValidations()}
        onChange={() => setErrors({ ...errors, firstName: undefined })}
      />
      <Input
        label="last name"
        containerStyles={{ height: 100 }}
        value={lastName}
        onChangeText={setLastName}
        error={errors.lastName}
        onBlur={() => runValidations()}
        onChange={() => setErrors({ ...errors, lastName: undefined })}
      />
      <Input
        label="password"
        containerStyles={{ height: 100 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        onBlur={() => runValidations()}
        onChange={() => setErrors({ ...errors, password: undefined })}
      />
      <Input
        label="password confirmation"
        containerStyles={{ height: 100 }}
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        error={errors.passwordConfirmation}
        onBlur={() => runValidations()}
        onChange={() => setErrors({ ...errors, passwordConfirmation: undefined })}
      />
      <View style={{ flex: 1 }} />
      <TextButton title="Sign up" onPress={() => submit()} loading={loading} />
    </>
  );
}

export default SignupForm;
