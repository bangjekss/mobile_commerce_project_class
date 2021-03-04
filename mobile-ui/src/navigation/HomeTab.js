import {Icon} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {surface_color} from '../screen/style';
import {CartStack, ProductStack} from '.';
import {PostScreen} from '../screen/post';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  const {cart} = useSelector((state) => state.cartReducer);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: surface_color,
        inactiveTintColor: 'gray',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let icon;
          if (route.name === 'Post') icon = 'plus';
          if (route.name === 'Feed') icon = 'shopping-bag';
          if (route.name === 'Cart') icon = 'shopping-cart';
          return <Icon name={icon} type="FontAwesome" style={{color}} />;
        },
      })}>
      <Tab.Screen name="Feed" component={ProductStack} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{tabBarBadge: cart.length >= 1 ? cart.length : null}}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
