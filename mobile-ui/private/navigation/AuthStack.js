import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';

const Stack = createStackNavigator();

import {View, Text} from 'react-native';
import {LoginScreen, RegisterScreen} from '../screen/auth';

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
