import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {Ref} from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';

export type CustomNumberInputProps = Pick<
  TextInputProps,
  'onKeyPress' | 'selectTextOnFocus' | 'maxLength' | 'onBlur'
> & {
  value: string;
  placeHolder?: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  type: KeyboardTypeOptions;
  inputRef?: Ref<TextInput>;
};

const CustomNumberInput = (props: CustomNumberInputProps) => {
  const {placeHolder, type, inputRef, ...restProps} = props;

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        placeholder={placeHolder}
        style={styles.input}
        keyboardType={type}
        autoCapitalize="none"
        selectionColor={'#0F112B'}
        {...restProps}
      />
    </View>
  );
};

export default CustomNumberInput;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
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
    paddingLeft: 4,
    fontSize: 27,
    flex: 1,
    fontFamily: 'Museo Sans',
    color: '#0F112B',
  },
});
