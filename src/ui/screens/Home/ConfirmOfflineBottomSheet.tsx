import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, {RefObject, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {OrderTimeline} from '../../components/OrderTimeline';

type Props = {
  bottomSheetRef: RefObject<BottomSheetModal>;
  onConfirm: () => void;
  withPendingOrder?: boolean;
};

export function ConfirmOfflineBottomSheet(props: Props) {
  const {bottomSheetRef, onConfirm, withPendingOrder} = props;

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop
          {...backdropProps}
          pressBehavior="close"
          opacity={0.6}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      index={0}
      snapPoints={animatedSnapPoints}
      containerStyle={styles.bottomSheetContent}
      handleIndicatorStyle={styles.bottomSheetHandleIndicator}
      contentHeight={animatedContentHeight}
      handleHeight={animatedHandleHeight}>
      <BottomSheetView onLayout={handleContentLayout}>
        <Text style={styles.title}>
          {!withPendingOrder && 'Are you sure about this?'}
          {withPendingOrder && 'You’ve got an ongoing delivery'}
        </Text>

        <Text style={styles.description}>
          Going offline means available orders will no long be assigned to you
          until you are back online
        </Text>

        {withPendingOrder && <OrderSummary />}

        <View style={styles.footer}>
          {!withPendingOrder && (
            <>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => bottomSheetRef.current?.close()}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <View style={styles.buttonsSeparator} />

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}>
                <Text style={styles.confirmText}>Yes, go offline</Text>
              </TouchableOpacity>
            </>
          )}

          {withPendingOrder && (
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Complete order</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{paddingBottom: insets.bottom}} />
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    borderRadius: 0,
  },
  bottomSheetHandleIndicator: {
    backgroundColor: '#7A7978',
    opacity: 0.1,
    width: 40,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: 48,
    fontFamily: 'Noto Sans JP',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  description: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Noto Sans JP',
    fontSize: 14,
    paddingHorizontal: 48,
    marginTop: 12,
    color: 'rgba(98, 106, 122, .8)',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 32,
  },
  cancelButton: {
    borderColor: 'rgba(56, 66, 176, 1)',
    borderWidth: 1,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cancelText: {
    fontFamily: 'Noto Sans JP',
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(56, 66, 176, 1)',
    paddingVertical: 16,
  },
  buttonsSeparator: {
    width: 16,
  },
  confirmButton: {
    backgroundColor: 'rgba(56, 66, 176, 1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    flex: 1,
  },
  confirmText: {
    fontFamily: 'Noto Sans JP',
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
});

function OrderSummary() {
  return (
    <View style={summaryStyles.wrapper}>
      <View style={summaryStyles.container}>
        <View style={summaryStyles.header}>
          <Text style={summaryStyles.headerText}>Now</Text>
          <Text style={summaryStyles.headerAmount}>₦4,700.00</Text>
        </View>

        <OrderTimeline status="new" compact />
      </View>
    </View>
  );
}

const summaryStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
    marginTop: 24,
    borderRadius: 8,
  },
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(47, 128, 237, 1)',
    height: 32,
    marginBottom: 12,
  },
  headerText: {
    fontFamily: 'Noto Sans JP',
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  headerAmount: {
    fontFamily: 'Noto Sans JP',
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
});
