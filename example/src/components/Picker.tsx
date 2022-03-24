import { Picker as RNPicker } from '@react-native-picker/picker';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import type { Theme } from '../themes';

interface Props {
  selectedValue: string;
  onValueChange: (value: string) => void;
  theme: Theme;
}

function Picker({ selectedValue, onValueChange, theme }: Props) {
  const pickerBackground = theme.isDark ? '#222' : '#f5f5f5';

  return (
    <View
      style={
        Platform.OS === 'android'
          ? [styles.pickerWrapper, { backgroundColor: pickerBackground }]
          : null
      }
    >
      <RNPicker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        dropdownIconColor={pickerBackground}
      >
        <RNPicker.Item label="Light" value="light" color={theme.colors.text} />
        <RNPicker.Item label="Dark" value="dark" color={theme.colors.text} />
        <RNPicker.Item
          label="System Default"
          value=""
          color={theme.colors.text}
        />
      </RNPicker>
      {Platform.OS === 'android' ? (
        <View
          style={[styles.pickerIcon, { borderTopColor: theme.colors.text }]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    position: 'relative',
    borderRadius: 4,
  },
  picker: {
    width: 200,
  },
  pickerIcon: {
    position: 'absolute',
    top: '50%',
    right: 20,
    width: 0,
    height: 0,
    marginTop: -2.5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 0,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

export default Picker;
