import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef} from 'react';
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
import {colors} from '../../../themes/Colors';
import {useRelativeLayout} from '../../hooks/useLayout';

export function OrderDetailsBottomSheet() {
  const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  useEffect(() => {
    bottomSheetRef.current?.expand();
  });

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

          <View style={styles.tag}>
            <Text style={styles.tagText}>New</Text>
          </View>
        </View>

        <Timeline />

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

        <View style={styles.orderAmountContainer}>
          <Text style={styles.orderAmountLabel}>Order amount</Text>

          <Text style={styles.orderAmount}>₦4,700.00</Text>
        </View>

        <Pressable style={styles.startRideButton}>
          <Text style={styles.startRideText}>Start ride</Text>
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
    paddingHorizontal: 12,
    paddingVertical: 1,
    borderRadius: 22,
    backgroundColor: '#FCE3E5',
  },
  tagText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#F25A68',
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

function Timeline() {
  const parentRef = useRef<View>(null);

  const dot1Ref = useRef<View>(null);
  const [dot1Layout, onSetDot1Layout] = useRelativeLayout(dot1Ref, parentRef);

  const dot2Ref = useRef<View>(null);
  const [dot2Layout, onSetDot2Layout] = useRelativeLayout(dot2Ref, parentRef);

  let data:
    | {
        height: number;
        dashes: null[];
        spacing: number;
        top: number;
        left: number;
      }
    | undefined;

  if (dot1Layout && dot2Layout) {
    const height = dot2Layout.y - (dot1Layout.y + dot1Layout.height) - 4;
    const spacing = 8;
    const dashes = new Array(Math.max(0, Math.floor(height / spacing))).fill(
      null,
    );

    data = {
      top: dot1Layout.y + dot1Layout.height + 2,
      left: dot1Layout.x + dot1Layout.width / 2 - 1.5,
      height,
      dashes,
      spacing,
    };
  }

  return (
    <View ref={parentRef} style={timelineStyles.timelineContainer}>
      <View style={timelineStyles.timelineItem}>
        <View
          ref={dot1Ref}
          style={[
            timelineStyles.timelineItemDot,
            timelineStyles.timelineItemDotGreen,
          ]}
          onLayout={onSetDot1Layout}
        />

        <View style={timelineStyles.timelineContent}>
          <Text style={timelineStyles.itemFrom}>
            From Joy Omo
            <Text style={timelineStyles.itemId}> 09029144116</Text>
          </Text>

          <Text style={timelineStyles.itemAddress}>
            4 Isolo Ire-Akari Estate, Lagos Nigeria
          </Text>
        </View>
      </View>

      <View style={timelineStyles.timelineItemSeparator} />

      <View style={timelineStyles.timelineItem}>
        <View
          ref={dot2Ref}
          style={[
            timelineStyles.timelineItemDot,
            timelineStyles.timelineItemDotViolet,
          ]}
          onLayout={onSetDot2Layout}
        />

        <View style={timelineStyles.timelineContent}>
          <Text style={timelineStyles.itemAddress}>
            4 Isolo Ire-Akari Estate, Lagos Nigeria
          </Text>
        </View>
      </View>

      {data && (
        <View
          style={[
            timelineStyles.dottedLineContainer,
            {
              height: data.height,
              top: data.top,
              left: data.left,
            },
          ]}>
          {data.dashes.map((_, index) => (
            <View key={index} style={timelineStyles.dottedLine} />
          ))}
        </View>
      )}
    </View>
  );
}

const timelineStyles = StyleSheet.create({
  itemAddress: {
    fontFamily: 'Noto Sans JP',
    fontSize: 14,
    color: 'rgba(98, 106, 122, 1)',
  },
  timelineContainer: {
    marginTop: 20,
    marginBottom: 36,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timelineItemDot: {
    top: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginLeft: 16,
  },
  timelineItemDotGreen: {
    backgroundColor: 'rgba(39, 174, 96, 1)',
    borderColor: 'rgba(237, 250, 240, 1)',
  },
  timelineItemDotViolet: {
    backgroundColor: 'rgba(56, 66, 176, 1)',
    borderColor: 'rgba(218, 222, 255, 1)',
  },
  timelineContent: {
    paddingLeft: 12,
  },
  itemFrom: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 16,
    color: 'rgba(14, 8, 66, 1)',
    marginBottom: 4,
  },
  itemId: {
    fontFamily: 'Noto Sans JP',
    color: 'rgba(98, 106, 122, 1)',
    fontWeight: '400',
  },
  timelineItemSeparator: {
    height: 36,
  },
  dottedLineContainer: {
    position: 'absolute',
    width: 3,
    paddingHorizontal: 1,
  },
  dottedLine: {
    backgroundColor: 'rgba(225, 225, 235, 1)',
    width: 1,
    flexGrow: 1,
    marginVertical: 2,
  },
});
