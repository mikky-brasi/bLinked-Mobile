import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from './routes';
import Main from '../ui/screens/Main';
import Login from '../ui/screens/Login';
import LoginMain from '../ui/screens/LoginMain';
import Register from '../ui/screens/Register';
import Verify from '../ui/screens/Verify';
import Password from '../ui/screens/Password';
import {BackButton} from '../ui/components/BackButton';
import {colors} from '../themes/Colors';

export type AuthParamList = {
  [K in typeof routes.MAIN]: undefined;
} & {
  [K in typeof routes.LOGINMAIN]: undefined;
} & {
  [K in typeof routes.LOGIN]: undefined;
} & {
  [K in typeof routes.REGISTER]: undefined;
} & {
  [K in typeof routes.VERIFY]: undefined;
} & {
  [K in typeof routes.PASSWORD]: undefined;
};

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, headerMode: 'screen'}}>
      <Stack.Screen name={routes.MAIN} component={Main} />
      <Stack.Group>
        <Stack.Screen name={routes.LOGINMAIN} component={LoginMain} />
        <Stack.Screen name={routes.LOGIN} component={Login} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={routes.REGISTER}
          component={Register}
          options={{
            headerLeft: () => <BackButton />,
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name={routes.VERIFY}
          component={Verify}
          options={{
            headerLeft: () => <BackButton />,
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name={routes.PASSWORD}
          component={Password}
          options={{
            headerLeft: () => <BackButton />,
            headerShadowVisible: true,
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgb(249, 249, 253)',
              shadowColor: 'rgb(234, 235, 246)',
              shadowOffset: {
                height: 1,
                width: 0,
              },
            },
            headerTitle: 'Create Password',
            headerTitleStyle: {
              color: colors.BLACK,
              fontSize: 16,
              fontWeight: '700',
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
