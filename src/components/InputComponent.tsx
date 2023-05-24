import {useState} from 'react';
import {TextInput, StyleSheet, Platform} from 'react-native';
import {Colors} from '../utils/Colors';

export default function InputComponent({
  placeholder,
  limitAmount,
  onTextChanged,
  initValue = '',
  isMultiline = false,
}) {
  const [inputVallue, setItemGroupName] = useState(initValue);

  function onTextChange(text: string) {
    setItemGroupName(text);
    onTextChanged(text);
  }
  
  // 
  return (
    <TextInput
      multiline={isMultiline}
      maxLength={limitAmount}
      autoCapitalize={'sentences'}
      value={inputVallue}
      placeholder={placeholder}
      placeholderTextColor={Colors.tabBarInactiveColor}
      style={[styles.inputStyle, {minHeight: isMultiline ? 50 : 48}]}
      onChangeText={text => {
        onTextChange(text);
      }}
    />
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.buttonColor,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,    
  },
});
