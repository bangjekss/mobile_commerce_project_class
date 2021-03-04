import React, {useState, useEffect} from 'react';

import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStack, HomeDrawer} from '.';
import {keepLoginAction} from '../../src/redux/action';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepLoginAction());
  }, [dispatch]);
  const {isLogin} = useSelector((state) => state.authReducer);
  return <>{isLogin ? <HomeDrawer /> : <AuthStack />}</>;
};

export default Main;
