import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import BackIcon from '../../assets/icons/back.svg';

export function BackButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.wrapper}>
      <BackIcon />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  backText: {
    fontFamily: 'Nunito',
    fontSize: 12,
    color: '#5A5D82',
    marginLeft: 4,
  },
});
