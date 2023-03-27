import React, {useRef} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {useRelativeLayout} from '../hooks/useLayout';

type Props = {
  style?: StyleProp<ViewStyle>;
  status: 'new' | 'pending' | 'fulfilled';
  compact?: boolean;
};

export function OrderTimeline(props: Props) {
  const {status, compact} = props;
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
    <View ref={parentRef} style={props.style}>
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
          {!compact && (
            <Text style={timelineStyles.itemFrom}>
              From Joy Omo
              <Text style={timelineStyles.itemId}> 09029144116</Text>
            </Text>
          )}

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
            <View
              key={index}
              style={[
                timelineStyles.dottedLine,
                status === 'pending' &&
                  index < data!.dashes.length / 2 &&
                  timelineStyles.dottedLineFulfilled,
                status === 'fulfilled' && timelineStyles.dottedLineFulfilled,
              ]}
            />
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
  dottedLineFulfilled: {
    backgroundColor: 'rgba(56, 66, 176, 1)',
  },
});
