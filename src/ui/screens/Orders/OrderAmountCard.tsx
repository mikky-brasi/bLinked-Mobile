import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function OrderAmountCard() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Order amount</Text>
      <Text style={styles.amount}>₦12,204,580</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#F5F8FF',
    borderColor: '#3842B0',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 14,
    color: '#626A7A',
    marginBottom: 2,
  },
  amount: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 22,
    color: '#0E0842',
  },
});
