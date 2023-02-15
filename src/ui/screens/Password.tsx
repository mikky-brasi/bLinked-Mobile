import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useFirebaseAuth from '../../services/firebase/auth';
import Loading from '../components/Loading';
import {routes} from '../../navigation/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthParamList} from '../../navigation/AuthNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PasswordProps = NativeStackScreenProps<AuthParamList, 'PasswordScreen'>;

const Password = ({navigation}: PasswordProps) => {
  const insets = useSafeAreaInsets();
  const {loading} = useFirebaseAuth();

  const registerInitialValue = {
    password: '',
    rePassword: '',
  };

  const registerValidationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be a minimum of 6 characters')
      .required('This field is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords are not the same')
      .required('This field is required'),
  });

  const handleContinue = () => {
    navigation.navigate(routes.LOGIN);
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {loading && <Loading />}

      <KeyboardAwareScrollView>
        <View style={styles.bodyContainer}>
          <Text style={styles.text1}>
            Create a password for your{'\n'}bLinked account.
          </Text>

          <Formik
            initialValues={registerInitialValue}
            onSubmit={handleContinue}
            validationSchema={registerValidationSchema}>
            {({values, errors, touched, handleChange, handleSubmit}) => (
              <>
                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeHolder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secure
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <Text style={styles.passwordStrength}>Password strength</Text>
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeHolder="Confirm Password"
                    value={values.rePassword}
                    onChangeText={handleChange('rePassword')}
                    secure
                  />
                  {errors.rePassword && touched.rePassword && (
                    <Text style={styles.errorText}>{errors.rePassword}</Text>
                  )}
                </View>

                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Continue"
                    onPress={handleSubmit}
                    backColor="#3842B0"
                    fontColor="#FFFFFF"
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  bodyContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  text1: {
    fontFamily: 'Noto Sans JP',
    fontSize: 16,
    textAlign: 'center',
    color: '#626a7a',
    lineHeight: 26,
  },
  emailText: {
    color: colors.DARKGRAY,
    fontSize: 16,
    marginBottom: units.height / 67,
  },
  buttonContainer: {
    marginTop: units.height / 10.94,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: units.height / 25,
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
    color: colors.PURPLE,
    textDecorationLine: 'underline',
    textDecorationColor: colors.PURPLE,
    textDecorationStyle: 'solid',
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 14,
  },
  passwordStrength: {
    color: '#737A91',
    marginTop: 4,
  },
  inputWrapper: {
    marginTop: 32,
  },
});
