import React from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../themes/Colors';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChartSvg from '../../assets/images/chart.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CHART_DEFAULT_SIZE = {width: 312, height: 88};

const earnings = Array.from({length: 6}, () => ({
  title: 'Ikeja GRA',
  amount: '$78,000',
  description: 'To Noona’s Kitchen, Lekki',
}));

export function Earnings() {
  const [chartWidth, setChartWidth] = React.useState(0);
  const chartSize = React.useMemo(() => {
    if (chartWidth === 0) {
      return CHART_DEFAULT_SIZE;
    }

    return {
      width: chartWidth,
      height:
        (chartWidth / CHART_DEFAULT_SIZE.width) * CHART_DEFAULT_SIZE.height,
    };
  }, [chartWidth]);

  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setChartWidth(width);
  };

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{paddingBottom: insets.bottom}}>
      <Text style={styles.title}>Earnings</Text>

      <View style={styles.mainCard}>
        <View style={styles.mainCardHeader}>
          <Text style={styles.timestamp}>LAST 7 DAYS</Text>

          <TouchableOpacity style={styles.mainCardElipsisButton}>
            <FeatherIcons name="more-vertical" size={16} />
          </TouchableOpacity>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.amount}>₦12,204,580</Text>
          <View style={styles.amountTagContainer}>
            <Text style={styles.amountTag}>+4.9%</Text>
          </View>
        </View>

        <View style={styles.graphic}>
          <View onLayout={onLayout} />
          <ChartSvg {...chartSize} />
        </View>
      </View>

      <View style={styles.allEarningsHeader}>
        <Text style={styles.allEarningsTitle}>All Earnings</Text>

        <TouchableOpacity style={styles.allEarningsElipsisButton}>
          <FeatherIcons name="more-vertical" size={16} />
        </TouchableOpacity>
      </View>

      {earnings.map((earning, index) => (
        <View key={index} style={styles.earningsCard}>
          <View style={styles.earningsCardHeader}>
            <Text style={styles.earningsCardTitle}>{earning.title}</Text>
            <Text style={styles.earningsCardAmount}>{earning.amount}</Text>
          </View>

          <Text style={styles.earningsCardDescription}>
            {earning.description}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },
  title: {
    color: colors.BLACK,
    fontSize: 24,
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    lineHeight: 32,
    marginLeft: 24,
  },

  mainCard: {
    marginTop: 22,
    paddingBottom: 20,
    marginHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    marginBottom: 8,
  },
  mainCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    marginTop: 8,
    marginLeft: 16,
    fontFamily: 'Noto Sans JP',
    color: '#626A7A',
    fontSize: 12,
    fontWeight: '500',
  },
  mainCardElipsisButton: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    marginLeft: 16,
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 20,
  },
  amountTagContainer: {
    marginLeft: 4,
    borderRadius: 20,
    backgroundColor: '#E2FFE1',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  amountTag: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 14,
    color: '#08AD04',
  },
  graphic: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 16,
  },

  allEarningsHeader: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  allEarningsTitle: {
    marginLeft: 16,
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 14,
  },
  allEarningsElipsisButton: {
    marginRight: 4,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  earningsCard: {
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
  },
  earningsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  earningsCardTitle: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 14,
    color: '#0E0842',
  },
  earningsCardAmount: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    fontSize: 14,
    color: '#08AD04',
  },
  earningsCardDescription: {
    fontFamily: 'Noto Sans JP',
    fontSize: 12,
    color: '#626A7A',
  },
});
