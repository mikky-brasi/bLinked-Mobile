import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import {routes} from './routes';
import {Earnings} from '../ui/screens/Earnings';
import {BackButton} from '../ui/components/BackButton';

export type MainNavigatorParamList = {
  [K in typeof routes.HOMETAB]: undefined;
} & {
  [K in typeof routes.EARNINGS]: undefined;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.HOMETAB} component={HomeNavigator} />
      <Stack.Screen
        name={routes.EARNINGS}
        component={Earnings}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
          headerStyle: {
            backgroundColor: '#F6F7F8',
          },
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
