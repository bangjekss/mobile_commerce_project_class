import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FeedScreen, ProductScreen} from '../screen/product';

const Stack = createStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Detail" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default ProductStack;
