import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {DetailProductScreen, FeedScreen} from '../screen/product';

const Stack = createStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Product List" component={FeedScreen} />
      <Stack.Screen name="Detail Product" component={DetailProductScreen} />
    </Stack.Navigator>
  );
};

export default ProductStack;
