import {useNavigation} from '@react-navigation/core';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import React, {useEffect, useMemo, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../themes/Colors';
import {CompletedOrders} from './CompletedOrders';
import {NewOrders} from './NewOrders';

type TabsParamList = {
  New: undefined;
  Pending: undefined;
  Completed: undefined;
};

const Tabs = createMaterialTopTabNavigator<TabsParamList>();

export function Orders() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Orders</Text>

      <Tabs.Navigator
        tabBar={props => <TabBar {...props} />}
        sceneContainerStyle={styles.navigatorScene}>
        <Tabs.Screen name="New" component={NewOrders} />
        <Tabs.Screen name="Pending" component={Pending} />
        <Tabs.Screen name="Completed" component={CompletedOrders} />
      </Tabs.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    color: colors.BLACK,
    fontSize: 24,
    fontFamily: 'Noto Sans JP',
    fontWeight: '700',
    lineHeight: 32,
    marginLeft: 24,
  },
  navigatorScene: {
    backgroundColor: '#F6F7F8',
  },
});

const tabsOrder = [
  'New',
  'Pending',
  'Completed',
] satisfies (keyof TabsParamList)[];

function TabBar(props: MaterialTopTabBarProps) {
  const position = props.position as Animated.AnimatedInterpolation<number>;
  const [tabsContainerWidth, setTabsContainerWidth] = useState(0);

  const translateX = useMemo(
    () =>
      position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, tabsContainerWidth / 3],
      }),
    [position, tabsContainerWidth],
  );

  return (
    <>
      <View style={tabBarStyles.wrapper}>
        <View
          onLayout={e => setTabsContainerWidth(e.nativeEvent.layout.width)}
          style={tabBarStyles.tabsContainer}>
          <Animated.View
            style={[tabBarStyles.movingPill, {transform: [{translateX}]}]}>
            <View style={tabBarStyles.movingPillContent} />
          </Animated.View>

          {tabsOrder.map(route => (
            <TabBarButton key={route} position={position} route={route} />
          ))}
        </View>
      </View>
    </>
  );
}

const tabBarStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    padding: 4,
    backgroundColor: colors.WHITE,
    borderRadius: 64,
    marginVertical: 20,
  },
  movingPill: {
    position: 'absolute',
    width: 100 / 3 + '%',
    height: '100%',
  },
  movingPillContent: {
    backgroundColor: colors.WHITE,
    width: '100%',
    height: '100%',
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
});

function useAnimatedValueCopy(
  animatedValue: Animated.AnimatedInterpolation<number>,
) {
  const [copy] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const id = animatedValue.addListener(({value}) => {
      copy.setValue(value);
    });

    return () => {
      animatedValue.removeListener(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedValue]);

  return copy;
}

type TabBarButtonProps = {
  position: Animated.AnimatedInterpolation<number>;
  route: keyof TabsParamList;
};

function TabBarButton(props: TabBarButtonProps) {
  const {route} = props;
  const navigation =
    useNavigation<MaterialTopTabNavigationProp<TabsParamList>>();

  const index = tabsOrder.indexOf(route);
  const selectedColor = '#3842B0';
  const unselectedColor = '#626A7A';

  const position = useAnimatedValueCopy(props.position);

  const color = useMemo(
    () =>
      position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [unselectedColor, selectedColor, unselectedColor],
        extrapolate: 'clamp',
      }),
    [index, position],
  );

  return (
    <TouchableOpacity
      style={tabBarButtonStyles.wrapper}
      onPress={() => navigation.navigate(route)}>
      <Animated.Text style={[tabBarButtonStyles.text, {color}]}>
        {route}
      </Animated.Text>
    </TouchableOpacity>
  );
}

const tabBarButtonStyles = StyleSheet.create({
  wrapper: {
    width: 100 / 3 + '%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Noto Sans JP',
    fontWeight: '500',
    fontSize: 16,
  },
});

function Pending() {
  return <View />;
}
