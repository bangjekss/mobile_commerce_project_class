import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';
import {ProductStack} from '.';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let icon;
          if (route.name === 'Post') icon = 'plus';
          if (route.name === 'Feed') icon = 'shopping-bag';
          if (route.name === 'Cart') icon = 'shopping-cart';
          return (
            <Icon
              name={icon}
              type="FontAwesome"
              style={{color, fontSize: 18}}
            />
          );
        },
      })}>
      <Tab.Screen name="Feed" component={ProductStack} />
      <Tab.Screen name="Post" component={ProductStack} />
      <Tab.Screen name="Cart" component={ProductStack} />
    </Tab.Navigator>
  );
};

export default HomeTab;
