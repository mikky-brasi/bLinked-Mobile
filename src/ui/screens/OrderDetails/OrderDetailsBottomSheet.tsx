import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SmsIcon from '../../../assets/icons/sms.svg';
import WhatsappIcon from '../../../assets/icons/whatsapp.svg';
import memojiSrc from '../../../assets/images/memoji.png';
import {MainNavigatorParamList} from '../../../navigation/MainNavigator';
import {routes} from '../../../navigation/routes';
import {colors} from '../../../themes/Colors';
import {OrderStatusTag} from '../../components/OrderStatusTag';
import {OrderTimeline} from '../../components/OrderTimeline';

type OrderDetailsBottomSheetProps = {
  status: 'new' | 'pending';
};

export function OrderDetailsBottomSheet(props: OrderDetailsBottomSheetProps) {
  const {status} = props;
  const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const navigation =
    useNavigation<StackNavigationProp<MainNavigatorParamList>>();

  let mainButton: {
    title: string;
    onPress?: () => void;
  };

  switch (status) {
    case 'new':
      mainButton = {
        title: 'Start ride',
      };
      break;
    case 'pending':
      mainButton = {
        title: 'Deliver order',
        onPress: () => navigation.navigate(routes.CONFIRMDELIVERY),
      };
      break;
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      containerStyle={styles.bottomSheetContent}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetHandleIndicator}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}>
      <BottomSheetView onLayout={handleContentLayout}>
        <View style={styles.orderDetailsHeader}>
          <Text style={styles.orderDetailsTitle}>Order details</Text>

          <OrderStatusTag status={status} style={styles.tag} />
        </View>

        <OrderTimeline style={styles.timeline} status={status} />

        {status !== 'pending' && (
          <>
            <Text style={styles.customerDetailsTitle}>Customer details</Text>

            <View style={styles.customerDetailsContainer}>
              <View style={styles.customerImageContainer}>
                <Image source={memojiSrc} style={styles.customerImage} />
              </View>

              <Text style={styles.customerTitle}>Assurance Uwangue</Text>

              <View style={styles.contactButton}>
                <WhatsappIcon />
              </View>

              <View style={styles.contactButtonSeparator} />

              <View style={styles.contactButton}>
                <SmsIcon />
              </View>
            </View>
          </>
        )}

        <View style={styles.orderAmountContainer}>
          <Text style={styles.orderAmountLabel}>Order amount</Text>

          <Text style={styles.orderAmount}>₦4,700.00</Text>
        </View>

        <Pressable style={styles.startRideButton} onPress={mainButton.onPress}>
          <Text style={styles.startRideText}>{mainButton.title}</Text>
        </Pressable>

        <SafeAreaView edges={['bottom']} />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    borderRadius: 0,
  },
  bottomSheetBackground: {
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  bottomSheetHandleIndicator: {
    backgroundColor: '#7A7978',
    opacity: 0.1,
    width: 40,
  },
  orderDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  orderDetailsTitle: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 16,
    color: colors.BLACK,
    marginHorizontal: 16,
    flexGrow: 1,
  },
  tag: {
    marginRight: 16,
  },
  timeline: {
    marginTop: 20,
    marginBottom: 36,
  },
  customerDetailsTitle: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 16,
    color: colors.BLACK,
    marginHorizontal: 16,
  },
  customerDetailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  customerImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ACADED',
  },
  customerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  } satisfies ImageStyle,
  customerTitle: {
    fontFamily: 'Noto Sans JP',
    fontSize: 14,
    marginLeft: 12,
    flexGrow: 1,
  },
  contactButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(56, 66, 176, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonSeparator: {
    width: 12,
  },
  orderAmountContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  orderAmountLabel: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 14,
    color: '#3842B0',
  },
  orderAmount: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 18,
    color: '#0F112B',
  },
  startRideButton: {
    backgroundColor: '#3842B0',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  startRideText: {
    color: colors.WHITE,
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 16,
  },
});
