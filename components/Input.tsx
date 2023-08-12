import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';

import { COLORS } from '../styles/colors';

function Input(
  props: React.ComponentProps<typeof TextInput> & {
    label?: string;
    error?: string;
    containerStyles?: StyleProp<ViewStyle>;
  },
) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={props.containerStyles}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        style={[
          styles.input,
          props.error ? styles.inputError : null,
          focused ? styles.inputFocused : null,
          props.style,
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {!!(focused && props.value?.length) && (
        <TouchableOpacity
          style={[styles.inputClear, { top: props.label ? 39 : 13 }]}
          onPress={() => props.onChangeText?.('')}
        >
          <AntDesign name="closecircle" size={20} color={COLORS.gray['300']} />
        </TouchableOpacity>
      )}
      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 22,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: COLORS.plum['500'],
  },
  inputError: {
    borderColor: COLORS.error,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: COLORS.white,
  },
  error: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.error,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputClear: {
    position: 'absolute',
    right: 12,
  },
});

export default Input;
