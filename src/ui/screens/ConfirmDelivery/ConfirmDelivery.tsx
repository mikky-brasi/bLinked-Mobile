import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {ComponentPropsWithRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStoreIcon from '../../../assets/icons/app-store.svg';
import CloseIcon from '../../../assets/icons/close.svg';
import {MainNavigatorParamList} from '../../../navigation/MainNavigator';
import {routes} from '../../../navigation/routes';
import {colors} from '../../../themes/Colors';
import Loading from '../../components/Loading';

export function ConfirmDelivery() {
  const navigation =
    useNavigation<StackNavigationProp<MainNavigatorParamList>>();

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      {loading && <Loading />}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <CloseIcon />
      </TouchableOpacity>

      <AppStoreIcon style={styles.appStoreIcon} />

      <Text style={styles.title}>Deliver order</Text>

      <Text style={styles.description}>
        Please enter the 6 digit code sent to{' '}
        <Text style={styles.descriptionBold}>Joy Omo</Text> to confirm this
        delivery
      </Text>

      <OtpCode onLoadingChange={setLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  closeButton: {
    marginLeft: 24,
    marginTop: 16,
    backgroundColor: 'rgba(56, 66, 176, .1)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appStoreIcon: {
    alignSelf: 'center',
    marginTop: 36,
  },
  title: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 16,
  },
  description: {
    fontFamily: 'Noto Sans JP',
    paddingHorizontal: 40,
    textAlign: 'center',
    color: 'rgba(98, 106, 122, 1)',
    marginTop: 12,
  },
  descriptionBold: {
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
});

type OtpCodeProps = {
  onLoadingChange: (loading: boolean) => void;
};

function OtpCode(props: OtpCodeProps) {
  const {onLoadingChange} = props;
  const inputs = useOtpInputs();
  const valid = inputs.every(input => input.digit.length === 1);

  const navigation =
    useNavigation<StackNavigationProp<MainNavigatorParamList>>();

  const handleContinue = () => {
    onLoadingChange(true);

    setTimeout(() => {
      onLoadingChange(false);
      navigation.replace(routes.DELIVERYSUCCESS);
    }, 1000);
  };

  return (
    <>
      <View style={otpStyles.wrapper}>
        {inputs.map((input, index) => (
          <>
            <TextInput textAlign="center" selectTextOnFocus {...input.props} />

            {index !== inputs.length - 1 && (
              <View style={otpStyles.cellInputSeparator} />
            )}
          </>
        ))}
      </View>

      <TouchableOpacity
        key={!valid + ''}
        onPress={handleContinue}
        style={[
          otpStyles.submitButton,
          !valid && otpStyles.submitButtonDisabled,
        ]}>
        <Text style={otpStyles.submitButtonText}>Continue</Text>
      </TouchableOpacity>
    </>
  );
}

function useOtpInputs() {
  function focusRelative(index: number, offset: number) {
    const nextInput = inputs[index + offset];

    if (nextInput) {
      nextInput.props.ref.current?.focus();
    }
  }

  const inputs = Array.from({length: 6}, (_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOtpInput(index, focusRelative),
  );

  return inputs;
}

function useOtpInput(
  index: number,
  focusRelative: (index: number, offset: number) => void,
) {
  const [digit, setDigit] = useState('');
  const [focus, setFocus] = useState(false);

  return {
    digit,
    props: {
      ref: React.useRef<TextInput>(null),
      value: digit,
      keyboardType: 'number-pad',
      onChangeText: text => {
        if (text.length > 0 && !/^\d+$/.test(text)) {
          return;
        }

        setDigit(text);

        if (text.length === 1) {
          focusRelative(index, 1);
        }
      },
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: [otpStyles.cellInput, focus && otpStyles.cellInputFocused],
      maxLength: 1,
      onKeyPress: e => {
        if (e.nativeEvent.key === 'Backspace') {
          focusRelative(index, digit === '' ? -1 : 0);
          return;
        }
      },
    } satisfies ComponentPropsWithRef<typeof TextInput>,
  };
}

const otpStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 36,
  },
  cellInput: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FAFBFC',
    borderColor: '#DFE5ED',
    borderWidth: 1,
    color: 'rgba(56, 66, 176, 1)',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  cellInputFocused: {
    borderColor: 'rgba(56, 66, 176, 1)',
  },
  cellInputSeparator: {
    width: 8,
  },
  submitButton: {
    backgroundColor: 'rgba(56, 66, 176, 1)',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 76,
    marginHorizontal: 20,
    borderRadius: 32,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 16,
  },
});
