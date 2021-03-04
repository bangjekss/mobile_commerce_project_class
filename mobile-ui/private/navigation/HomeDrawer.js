import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState, useEffect} from 'react';

import {View, Text} from 'react-native';
import {HomeTab} from '.';

const Drawer = createDrawerNavigator();

const ProfileStack = () => {
  return <Text>profile</Text>;
};

const HomeDrawer = () => {
  return (
    <Drawer.Navigator drawerPosition="right">
      <Drawer.Screen name="Home" component={HomeTab} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Logout" component={HomeTab} />
      {/* <Drawer.Screen name="Logout" /> */}
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
