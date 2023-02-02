import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  value: string;
  placeHolder: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  type?: KeyboardTypeOptions;
};

const CustomInput = ({
  value,
  placeHolder,
  onChangeText,
  secure,
  type,
}: Props) => {
  const [showPassword, setShowPassword] = useState(secure);

  const handleIcon = () => {
    setShowPassword(!showPassword);
  };

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
      />
      {secure && (
        <TouchableOpacity onPress={handleIcon}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={25}
            color={colors.GRAY}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 18,
    flex: 1,
    fontFamily: 'Museo Sans',
    paddingVertical: 8,
  },
  icon: {
    marginRight: units.width / 16,
  },
});
