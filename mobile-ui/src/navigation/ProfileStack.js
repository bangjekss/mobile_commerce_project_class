import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  AddNewAddressScreen,
  AddressScreen,
  ChangeAddressScreen,
  ProfileScreen,
} from '../screen/profile';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main Profile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen
        name="Add New Address"
        component={AddNewAddressScreen}
        options={{title: 'New Address'}}
      />
      <Stack.Screen name="Change Address" component={ChangeAddressScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
