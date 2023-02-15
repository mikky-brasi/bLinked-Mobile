import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import {StoreState} from '../context/store';

const AppNavigator = () => {
  const isLogin = useSelector<StoreState>(selector => selector.user.isLogin);

  return (
    <NavigationContainer>
      {isLogin ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
