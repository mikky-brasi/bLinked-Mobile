import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../themes/Colors';

type OrderItemProps = {
  status: 'new' | 'pending' | 'fulfilled';
};

export function OrderItem(props: OrderItemProps) {
  const {status} = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Order #15285046</Text>
        <Text style={styles.amount}>₦4,700.00</Text>
      </View>

      <Text style={styles.description}>
        From <Text style={styles.descriptionBold}>Online Store</Text>
      </Text>

      <View style={styles.footer}>
        <Text style={styles.timestamp}>4mins ago</Text>

        <View
          style={[
            styles.tag,
            status === 'new' && styles.tagNew,
            status === 'fulfilled' && styles.tagFulfilled,
          ]}>
          <Text
            style={[
              styles.tagText,
              status === 'new' && styles.tagTextNew,
              status === 'fulfilled' && styles.tagTextFulfilled,
            ]}>
            {status === 'new' && 'New'}
            {status === 'fulfilled' && 'Fulfilled'}
          </Text>
        </View>
      </View>
    </View>
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
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 1,
    borderRadius: 22,
  },
  tagNew: {
    backgroundColor: '#FCE3E5',
  },
  tagFulfilled: {
    backgroundColor: '#E2FFE1',
  },
  tagText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
  },
  tagTextNew: {
    color: '#F25A68',
  },
  tagTextFulfilled: {
    color: '#08AD04',
  },
});
