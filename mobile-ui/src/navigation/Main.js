import React, {useState, useEffect} from 'react';
import {Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {keepLoginAction} from '../redux/action';
import {AuthStack, HomeTab} from './';

const Main = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepLoginAction());
  }, []);
  const {isLogin} = useSelector((state) => state.authReducer);

  return <>{isLogin ? <HomeTab /> : <AuthStack />}</>;
};

export default Main;
