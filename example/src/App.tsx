import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Alert,
  ColorSchemeName,
  useColorScheme,
  Modal,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import overrideColorScheme from 'react-native-override-color-scheme';
import DateTimePicker from 'react-native-modal-datetime-picker';
import themes from './themes';
import Spacer from './components/Spacer';
import Picker from './components/Picker';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>();
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    overrideColorScheme.setScheme(colorScheme);
  }, [colorScheme]);

  const systemColorScheme = useColorScheme();

  const theme = useMemo(() => {
    if (colorScheme) {
      return colorScheme === 'dark' ? themes.dark : themes.light;
    }
    return systemColorScheme === 'dark' ? themes.dark : themes.light;
  }, [colorScheme, systemColorScheme]);

  const showAlert = useCallback(() => {
    Alert.alert('Breathe', 'It will be okay 🌱✨');
  }, []);

  const handleColorSchemeChange = useCallback((itemValue: string) => {
    switch (itemValue) {
      case 'light':
      case 'dark':
        setColorScheme(itemValue);
        break;

      default:
        setColorScheme(undefined);
        break;
    }
  }, []);

  const toggleTimePicker = useCallback(() => {
    setTimePickerVisible((visible) => !visible);
  }, []);

  const toggleDatePicker = useCallback(() => {
    setDatePickerVisible((visible) => !visible);
  }, []);

  const toggleModal = useCallback(() => {
    setModalVisible((visible) => !visible);
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View>
        <Text style={{ color: theme.colors.text }}>Theme:</Text>
        <Picker
          selectedValue={colorScheme || ''}
          theme={theme}
          onValueChange={handleColorSchemeChange}
        />
      </View>
      <Spacer height={50} />
      <Button title="Show alert" onPress={showAlert} />
      <Spacer />
      <Button title="Show time picker" onPress={toggleTimePicker} />
      <Spacer />
      <Button title="Show date picker" onPress={toggleDatePicker} />
      <Spacer />
      <Button title="Show modal with scrollbars" onPress={toggleModal} />
      <DateTimePicker
        mode="time"
        isDarkModeEnabled={theme.isDark}
        isVisible={timePickerVisible}
        onConfirm={toggleTimePicker}
        onCancel={toggleTimePicker}
      />
      <DateTimePicker
        isDarkModeEnabled={theme.isDark}
        isVisible={datePickerVisible}
        onConfirm={toggleDatePicker}
        onCancel={toggleDatePicker}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <SafeAreaView
          style={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ScrollView
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalScrollViewContainer}
          >
            {Array(100)
              .fill(0)
              .map((_, i) => (
                <Text key={i} style={{ color: theme.colors.text }}>
                  Line {i}
                </Text>
              ))}
          </ScrollView>
          <Button title="Hide modal" onPress={toggleModal} />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalScrollView: {
    width: '100%',
  },
  modalScrollViewContainer: {
    paddingHorizontal: 20,
  },
});
