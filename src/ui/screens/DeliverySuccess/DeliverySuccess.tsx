import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainNavigatorParamList} from '../../../navigation/MainNavigator';
import {colors} from '../../../themes/Colors';
import {OrderStatusTag} from '../../components/OrderStatusTag';
import {OrderTimeline} from '../../components/OrderTimeline';
import successImageSrc from './success.png';

export function DeliverySuccess() {
  const navigation =
    useNavigation<StackNavigationProp<MainNavigatorParamList>>();

  return (
    <SafeAreaView style={styles.wrapper}>
      <Image source={successImageSrc} style={styles.image} />

      <Text style={styles.title}>Delivery completed</Text>

      <Text style={styles.description}>
        Your delivery to <Text style={styles.descriptionBold}>Joy Omo</Text> has
        been successfully completed
      </Text>

      <OrderSummary />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('HomeTabScreen')}>
        <Text style={styles.buttonText}>Go home</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    alignSelf: 'center',
    marginTop: 80,
    width: 105,
    height: 105,
  },
  title: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Noto Sans JP',
    paddingHorizontal: 52,
    textAlign: 'center',
    color: 'rgba(98, 106, 122, 1)',
    marginTop: 12,
  },
  descriptionBold: {
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  button: {
    backgroundColor: colors.PURPLE,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 32,
    marginHorizontal: 20,
    marginTop: 'auto',
  },
  buttonText: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});

function OrderSummary() {
  return (
    <View style={summaryStyles.wrapper}>
      <View style={summaryStyles.header}>
        <Text style={summaryStyles.title}>Order Summary</Text>

        <OrderStatusTag status="fulfilled" />
      </View>

      <OrderTimeline status="fulfilled" />

      <View style={summaryStyles.footer}>
        <Text style={summaryStyles.amountLabel}>Order amount</Text>

        <Text style={summaryStyles.amount}>₦4,700.00</Text>
      </View>
    </View>
  );
}

const summaryStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 44,
    marginBottom: 32,
    backgroundColor: 'rgba(245, 248, 255, .5)',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 28,
    marginTop: 48,
  },
  amountLabel: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 14,
    color: 'rgba(56, 66, 176, 1)',
  },
  amount: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 18,
    color: 'rgba(15, 17, 43, 1)',
  },
});
