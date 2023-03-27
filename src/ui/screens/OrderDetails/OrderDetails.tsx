import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackBoldIcon from '../../../assets/icons/back-bold.svg';
import {MainNavigatorParamList} from '../../../navigation/MainNavigator';
import mapImage from './map.png';
import {OrderDetailsBottomSheet} from './OrderDetailsBottomSheet';

type Props = StackScreenProps<MainNavigatorParamList, 'OrderDetailsScreen'>;

export function OrderDetails(props: Props) {
  const {route} = props;
  const {status} = route.params;
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

      <OrderDetailsBottomSheet status={status} />
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
