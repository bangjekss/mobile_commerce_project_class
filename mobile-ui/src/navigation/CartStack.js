import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {CartScreen, CheckoutScreen} from '../screen/cart';
import {background_color} from '../screen/style';

const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName="Cart" headerMode="float">
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
