import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {TransactionScreen} from '../screen/transaction';

const Stack = createStackNavigator();

const TransactionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transaction List"
        component={TransactionScreen}
        options={{title: 'Transactions'}}
      />
      <Stack.Screen name="Transaction Detail" component={TransactionScreen} />
    </Stack.Navigator>
  );
};

export default TransactionStack;
