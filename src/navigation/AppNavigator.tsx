import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import {StoreState} from '../context/store';
import {MainNavigator} from './MainNavigator';

const AppNavigator = () => {
  const isLogin = useSelector<StoreState>(selector => selector.user.isLogin);

  return (
    <NavigationContainer>
      {isLogin ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
