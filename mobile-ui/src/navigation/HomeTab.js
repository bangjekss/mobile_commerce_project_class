import {Button, Text, View, Icon} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCartAction, logoutAction} from '../redux/action';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {surface_color} from '../screen/style';
import {ProductStack} from '.';

const Tab = createBottomTabNavigator();
const Post = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <View>
      <Text>Post</Text>
      <Button onPress={handleLogout}>
        <Text>logout</Text>
      </Button>
    </View>
  );
};
const Cart = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <View>
      <Text>Cart</Text>
      <Button onPress={handleLogout}>
        <Text>logout</Text>
      </Button>
    </View>
  );
};

const HomeTab = () => {
  const lenght = useSelector((state) => state.cartReducer.cart.length);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: surface_color,
        inactiveTintColor: 'gray',
      }}
      screenOptions={({route}) => ({
        // tabBarBadge: () => {

        // },
        tabBarIcon: ({color}) => {
          let icon;
          if (route.name === 'Post') icon = 'plus';
          if (route.name === 'Feed') icon = 'shopping-bag';
          if (route.name === 'Cart') icon = 'shopping-cart';
          return <Icon name={icon} type="FontAwesome" style={{color}} />;
        },
      })}>
      <Tab.Screen name="Feed" component={ProductStack} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{tabBarBadge: lenght}}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
