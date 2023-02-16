import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OrderAmountCard} from './OrderAmountCard';
import {OrderItem} from './OrderItem';

const items = Array.from({length: 3}, () => null);

export function NewOrders() {
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <OrderAmountCard />

          <Text style={styles.title}>New Orders (5)</Text>
        </>
      }
      data={items}
      renderItem={() => <OrderItem status="new" />}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={<SafeAreaView edges={['bottom']} />}
    />
  );
}

function ItemSeparatorComponent() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 14,
    color: '#343841',
    marginHorizontal: 16,
    marginTop: 36,
    marginBottom: 16,
  },
  separator: {
    height: 8,
  },
});
