import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';

import { COLORS } from '../../styles/colors';

function Input(
  props: React.ComponentProps<typeof TextInput> & {
    label?: string;
    error?: string;
    containerStyles?: StyleProp<ViewStyle>;
  },
) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <View style={props.containerStyles}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        style={[
          styles.input,
          focused ? styles.inputFocused : null,
          props.error ? styles.inputError : null,
          props.style,
        ]}
        onFocus={(e) => {
          props.onFocus?.(e);
          setFocused(true);
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          setFocused(false);
        }}
        selectionColor={COLORS.black}
        cursorColor={COLORS.black}
        secureTextEntry={props.secureTextEntry && hidden}
      />
      {!!(focused && props.value?.length && !props.secureTextEntry) && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.inputClear, { top: props.label ? 33 : 7 }]}
          onPress={() => props.onChangeText?.('')}
        >
          <AntDesign name="closecircle" size={20} color={COLORS.gray['300']} />
        </TouchableOpacity>
      )}
      {props.secureTextEntry && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.inputClear, { top: props.label ? 33 : 7 }]}
          onPress={() => setHidden(!hidden)}
        >
          <Ionicons name={hidden ? 'eye' : 'eye-off'} size={20} color={COLORS.gray['300']} />
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
    paddingTop: 0,
    paddingBottom: 0,
    height: 48,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 22,
    borderWidth: 2,
    borderColor: 'transparent',
    textAlignVertical: 'center',
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
    right: 8,
    padding: 6,
  },
});

export default Input;
