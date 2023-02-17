import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import {routes} from './routes';
import {Earnings} from '../ui/screens/Earnings';
import {BackButton} from '../ui/components/BackButton';
import {Orders} from '../ui/screens/Orders/Orders';
import {OrderDetails} from '../ui/screens/OrderDetails/OrderDetails';
import {ConfirmDelivery} from '../ui/screens/ConfirmDelivery/ConfirmDelivery';
import {DeliverySuccess} from '../ui/screens/DeliverySuccess/DeliverySuccess';

export type MainNavigatorParamList = {
  [K in typeof routes.HOMETAB]: undefined;
} & {
  [K in typeof routes.EARNINGS]: undefined;
} & {
  [K in typeof routes.ORDERS]: undefined;
} & {
  [K in typeof routes.ORDERDETAILS]: {status: 'new' | 'pending'};
} & {
  [K in typeof routes.CONFIRMDELIVERY]: undefined;
} & {
  [K in typeof routes.DELIVERYSUCCESS]: undefined;
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
          cardStyle: {
            backgroundColor: '#F6F7F8',
          },
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={routes.ORDERS}
        component={Orders}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
          headerStyle: {
            backgroundColor: '#F6F7F8',
          },
          cardStyle: {
            backgroundColor: '#F6F7F8',
          },
          headerTitle: '',
        }}
      />
      <Stack.Screen name={routes.ORDERDETAILS} component={OrderDetails} />
      <Stack.Screen
        name={routes.CONFIRMDELIVERY}
        component={ConfirmDelivery}
        options={{presentation: 'transparentModal'}}
      />
      <Stack.Screen
        name={routes.DELIVERYSUCCESS}
        component={DeliverySuccess}
        options={{presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
}
