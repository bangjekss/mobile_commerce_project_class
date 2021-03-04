import {Text, View} from 'native-base';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import reducer from './src/redux/reducer';
// import reducer from './private/redux/reducer';
// latian
import {Main} from './src/navigation';
// import {Main} from './private/navigation';

const store = configureStore({
  reducer,
});

const didMount = () => {};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Main />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
