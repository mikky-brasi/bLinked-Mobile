import {KeyboardTypeOptions, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';

type CustomNumberInputProps = {
  value: string;
  placeHolder?: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  type: KeyboardTypeOptions;
};

const CustomNumberInput = ({
  value,
  placeHolder,
  onChangeText,
  secure,
  type,
}: CustomNumberInputProps) => {
  const [showPassword] = useState(secure);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeHolder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={type}
        secureTextEntry={showPassword}
        autoCapitalize="none"
        selectionColor={'#0F112B'}
      />
    </View>
  );
};

export default CustomNumberInput;

const styles = StyleSheet.create({
  container: {
    width: units.width / 8.33,
    marginHorizontal: units.width / 50,
    borderBottomWidth: 2,
    borderBottomColor: colors.DARRWHITE,
    borderBottomRadius: 10,
    shadowColor: colors.LIGHTGREY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    paddingLeft: units.width / 100,
    fontSize: 27,
    flex: 1,
    fontFamily: 'Museo Sans',
    color: '#0F112B',
  },
  icon: {
    marginRight: units.width / 16,
  },
});
