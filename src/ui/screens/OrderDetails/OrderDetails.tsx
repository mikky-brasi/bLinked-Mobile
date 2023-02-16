import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackBoldIcon from '../../../assets/icons/back-bold.svg';
import mapImage from './map.png';
import {OrderDetailsBottomSheet} from './OrderDetailsBottomSheet';

export function OrderDetails() {
  const navigation = useNavigation();

  return (
    <>
      <Image source={mapImage} style={styles.map} />

      <SafeAreaView edges={['top']} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <BackBoldIcon />
      </TouchableOpacity>

      <OrderDetailsBottomSheet />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FAFBFC',
    borderColor: '#DFE5ED',
    borderWidth: 1,
    marginTop: 16,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
