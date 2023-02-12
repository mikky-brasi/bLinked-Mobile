import React from 'react';
import {Image, SafeAreaView, View, Text, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';
import {routes} from '../../navigation/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthParamList} from '../../navigation/AuthNavigator';
import LogoSvg from '../../assets/images/Logo.svg';

type Props = NativeStackScreenProps<AuthParamList, 'MainScreen'>;

const Main = ({navigation}: Props) => {
  const GotoRegister = () => {
    navigation.navigate(routes.REGISTER);
  };

  const GotoLogin = () => {
    navigation.navigate(routes.LOGINMAIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.logoContainer}>
          <LogoSvg />
        </View>
        <View style={styles.deliverContainer}>
          <Image source={require('../../assets/images/deliver.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Welcome to bLinked</Text>
          <Text style={styles.baseText}>
            Trusted by millions of companies,{'\n'}For fast delivery nationwide
          </Text>
        </View>
        <View style={styles.buttonContainer1}>
          <CustomButton
            title="Create account"
            onPress={GotoRegister}
            backColor="#3842B0"
            fontColor="#ffffff"
          />
        </View>
        <View style={styles.buttonContainer2}>
          <CustomButton
            title="Login to bLinked"
            onPress={GotoLogin}
            backColor="#ECEFFE"
            fontColor="#3842B0"
          />
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            By continuing with the service above, you agree to{'\n'} bLinked's{' '}
            <Text style={styles.blueText}>Terms of services</Text> and{' '}
            <Text style={styles.blueText}>privacy policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  bodyContainer: {
    width: '100%',
    paddingHorizontal: units.width / 10.7,
    marginTop: units.height / 9.23,
    flex: 1,
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliverContainer: {
    marginTop: units.height / 17.27,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
  },
  textContainer: {
    marginTop: units.height / 36.23,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteContainer: {
    marginTop: units.height / 20.52,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  buttonContainer1: {
    marginTop: units.height / 17.84,
  },
  buttonContainer2: {
    marginTop: units.height / 51.21,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#24272D',
  },
  baseText: {
    marginTop: 10,
    fontSize: 16,
    color: '#626A7A',
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  noteText: {
    color: '#A2A9B4',
    lineHeight: 16,
    fontSize: 10,
    textAlign: 'center',
  },
  blueText: {
    color: colors.PURPLE,
    lineHeight: 16,
  },
});
