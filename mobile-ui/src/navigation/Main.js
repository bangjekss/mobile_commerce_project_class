import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {keepLoginAction} from '../redux/action';
import {AuthStack, HomeDrawer} from './';

const Main = () => {
  const dispatch = useDispatch();
  const {isLogin} = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(keepLoginAction());
  }, []);

  return <>{isLogin ? <HomeDrawer /> : <AuthStack />}</>;
};

export default Main;
