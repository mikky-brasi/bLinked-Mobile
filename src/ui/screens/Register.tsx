import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
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

type Props = NativeStackScreenProps<AuthParamList, 'RegisterScreen'>;

const Register = ({navigation}: Props) => {
  const {loading} = useFirebaseAuth();

  const registerIntialValue = {
    email: '',
    fullName: '',
    phoneNumber: '',
  };

  const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not in correct format')
      .required('This field is required'),
    fullName: Yup.string().required('This field is required'),
    phoneNumber: Yup.string().required('This field is required'),
  });

  const handleContinue = () => {
    navigation.navigate(routes.VERIFY);
  };

  const onClickBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <View style={styles.statusContainer} />
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={onClickBack}>
          <Text style={{fontFamily: 'Nunito', fontSize: 12, color: '#5A5D82'}}>
            {'<'} Back
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareContentContainer}>
        <View style={styles.bodyContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/Logo-2.png')} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>Let's get you started</Text>
            <Text style={styles.text2}>First of, let's get to know you</Text>
          </View>
          <Formik
            initialValues={registerIntialValue}
            onSubmit={handleContinue}
            validationSchema={registerValidationSchema}>
            {({values, errors, touched, handleChange, handleSubmit}) => (
              <>
                <View style={{marginTop: 38}}>
                  <CustomInput
                    placeHolder="Full Name"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                  />
                  {errors.fullName && touched.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}
                </View>
                <View style={{marginTop: 38}}>
                  <CustomInput
                    placeHolder="Phone number"
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    type="phone-pad"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}
                </View>
                <View style={{marginTop: 38}}>
                  <CustomInput
                    placeHolder="Email address"
                    type="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
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
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  statusContainer: {
    width: units.width,
    height: units.height / 18.65,
  },
  backContainer: {
    marginTop: units.height / 74.63,
    marginLeft: units.width / 37.5,
    width: 120,
    height: 20,
  },
  keyboardAwareContentContainer: {
    flexGrow: 1,
  },
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
    marginTop: units.height / 25.62,
    flexGrow: 1,
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: units.height / 17.46,
  },
  text1: {
    fontFamily: 'Noto Sans JP',
    fontSize: 16,
    textAlign: 'center',
    color: '#626a7a',
    lineHeight: 20,
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
  emailText: {
    color: colors.DARKGRAY,
    fontSize: 16,
    marginBottom: units.height / 67,
  },
  buttonContainer: {
    marginTop: 'auto',
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
});
