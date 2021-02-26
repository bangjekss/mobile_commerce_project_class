import React, {useState, useEffect} from 'react';
import {Button} from 'react-native';
import {useSelector} from 'react-redux';
import {Home, AuthStack} from './';

const Main = () => {
  const {isLogin} = useSelector((state) => state.authReducer);
  return <>{isLogin ? <Home /> : <AuthStack />}</>;
};

export default Main;
