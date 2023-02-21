import {StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import React, {Ref, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomButton from '../components/CustomButton';
import {Formik, useField} from 'formik';
import * as Yup from 'yup';
import useFirebaseAuth from '../../services/firebase/auth';
import Loading from '../components/Loading';
import {routes} from '../../navigation/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthParamList} from '../../navigation/AuthNavigator';
import LogoSvg from '../../assets/images/Logo.svg';

const verifyValidationSchema = Yup.object({
  number0: Yup.string().required('This field is required'),
  number1: Yup.string().required('This field is required'),
  number2: Yup.string().required('This field is required'),
  number3: Yup.string().required('This field is required'),
  number4: Yup.string().required('This field is required'),
  number5: Yup.string().required('This field is required'),
});

type VerifyFormValues = Yup.InferType<typeof verifyValidationSchema>;

type VerifyProps = NativeStackScreenProps<AuthParamList, 'VerifyScreen'>;

const Verify = ({navigation}: VerifyProps) => {
  const {loading} = useFirebaseAuth();

  const verifyInitialValue = {
    number0: '',
    number1: '',
    number2: '',
    number3: '',
    number4: '',
    number5: '',
  } satisfies VerifyFormValues;

  const handleContinue = () => {
    navigation.navigate(routes.PASSWORD);
  };

  const [inputRefs, focusOnRelative] = useOtpInputs();

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}

      <KeyboardAwareScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.logoContainer}>
            <LogoSvg width={127} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>
              Enter the 6-digit confirmation code sent{'\n'}to 0810-089-5940 via
              SMS. started
            </Text>
            <Text style={styles.text2}>OTP Verification</Text>
          </View>
          <View>
            <Formik
              initialValues={verifyInitialValue}
              onSubmit={handleContinue}
              validationSchema={verifyValidationSchema}>
              {({handleSubmit}) => (
                <>
                  <View style={styles.verifyContainer}>
                    {inputRefs.map((ref, index) => (
                      <OtpCellInput
                        index={index}
                        inputRef={ref}
                        onFocusOnRelative={relativeIndex =>
                          focusOnRelative(index, relativeIndex)
                        }
                        key={index}
                      />
                    ))}
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      title="Continue"
                      onPress={handleSubmit}
                      backColor="#3842B0"
                      fontColor="#FFFFFF"
                    />
                  </View>
                  <View style={styles.loginContainer}>
                    <Text style={styles.signInText}>
                      Resend code in{' '}
                      <Text style={{color: colors.PURPLE}}>{'(1:17)'}</Text>
                    </Text>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  title: {
    color: colors.BLACK,
    fontSize: 36,
    fontWeight: '600',
  },
  bodyContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: units.height / 30.4,
  },
  text1: {
    fontFamily: 'Noto Sans JP',
    fontSize: 16,
    textAlign: 'center',
    color: '#626a7a',
    lineHeight: 26,
  },
  text2: {
    marginTop: units.height / 58.64,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#1d242e',
    textAlign: 'center',
  },
  verifyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 92,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: units.height / 41.05,
  },
  line: {
    height: 1,
    width: units.width / 3.5,
    backgroundColor: colors.GRAY,
  },
  errorText: {
    color: colors.ORANGE,
    marginTop: units.height / 101,
  },
  signInText: {
    color: '#737A91',
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 16,
  },
});

function useOtpInputs() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refs = Array.from({length: 6}, () => useRef<TextInput>(null));
  const focusOnRelative = (index: number, relativeIndex: number) => {
    const element = refs[index + relativeIndex]?.current;
    if (!element) {
      return false;
    }

    element.focus();
    return true;
  };

  return [refs, focusOnRelative] as const;
}

type OtpCellInputProps = {
  inputRef: Ref<TextInput>;
  index: number;
  onFocusOnRelative: (relativeIndex: number) => void;
};

function OtpCellInput(props: OtpCellInputProps) {
  const {index, onFocusOnRelative} = props;
  const name = `number${index}`;

  const [fieldProps] = useField(name);

  const handleChange = (text: string) => {
    fieldProps.onChange(name)(text);

    if (text.trim() !== '') {
      onFocusOnRelative(1);
    }
  };

  return (
    <CustomNumberInput
      value={fieldProps.value}
      onChangeText={handleChange}
      key={index}
      type="phone-pad"
      inputRef={props.inputRef}
      selectTextOnFocus
      onKeyPress={e => {
        if (e.nativeEvent.key === 'Backspace') {
          onFocusOnRelative(fieldProps.value === '' ? -1 : 0);
          return;
        }
      }}
      onBlur={fieldProps.onBlur(name)}
      maxLength={1}
    />
  );
}
