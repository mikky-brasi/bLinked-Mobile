import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MainNavigatorParamList} from '../../../navigation/MainNavigator';
import {routes} from '../../../navigation/routes';
import {colors} from '../../../themes/Colors';
import {OrderStatusTag} from '../../components/OrderStatusTag';

type OrderItemProps = {
  status: 'new' | 'pending' | 'fulfilled';
};

export function OrderItem(props: OrderItemProps) {
  const {status} = props;
  const navigation =
    useNavigation<StackNavigationProp<MainNavigatorParamList>>();

  let handlePress: (() => void) | undefined;
  if (status !== 'fulfilled') {
    handlePress = () => navigation.navigate(routes.ORDERDETAILS, {status});
  }

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.title}>Order #15285046</Text>
        <Text style={styles.amount}>₦4,700.00</Text>
      </View>

      <Text style={styles.description}>
        From <Text style={styles.descriptionBold}>Online Store</Text>
      </Text>

      <View style={styles.footer}>
        <Text style={styles.timestamp}>4mins ago</Text>

        <OrderStatusTag status={status} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    backgroundColor: colors.WHITE,
    padding: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    color: '#0E0842',
  },
  amount: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    color: '#5A5D82',
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#5C5C80',
  },
  descriptionBold: {
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    alignItems: 'center',
  },
  timestamp: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: '#5C5C80',
  },
});
