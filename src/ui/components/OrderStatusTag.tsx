import React from 'react';
import {
  TextStyle,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';

type OrderStatusTagProps = {
  status: 'new' | 'pending' | 'fulfilled';
  style?: StyleProp<ViewStyle>;
};

export function OrderStatusTag(props: OrderStatusTagProps) {
  const {status} = props;

  let tagData: {
    textStyle: TextStyle;
    containerStyle: TextStyle;
    text: string;
  };
  switch (status) {
    case 'new':
      tagData = {
        textStyle: styles.tagTextNew,
        containerStyle: styles.tagNew,
        text: 'New',
      };
      break;
    case 'pending':
      tagData = {
        textStyle: styles.tagTextPending,
        containerStyle: styles.tagPending,
        text: 'Enroute Dropoff',
      };
      break;
    case 'fulfilled':
      tagData = {
        textStyle: styles.tagTextFulfilled,
        containerStyle: styles.tagFulfilled,
        text: 'Fulfilled',
      };
      break;
  }

  return (
    <View style={[styles.tag, tagData.containerStyle, props.style]}>
      <Text style={[styles.tagText, tagData.textStyle]}>{tagData.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  tagPending: {
    backgroundColor: 'rgba(233, 238, 255, 1)',
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
  tagTextPending: {
    color: 'rgba(23, 82, 255, 1)',
  },
});
