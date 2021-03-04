import {Button, Input, Item, Label} from 'native-base';
import React, {useState, useEffect} from 'react';

import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginAction} from '../../../src/redux/action';
import {primary_color} from '../../../src/screen/style';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLoginBtn = () => {
    const data = {
      username,
      password,
    };
    dispatch(loginAction(data));
    alert('successfully login');
  };
  return (
    <View style={{padding: 30}}>
      <View>
        <View>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input onChangeText={(e) => setUsername(e)} />
          </Item>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input onChangeText={(e) => setPassword(e)} secureTextEntry />
          </Item>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          style={{
            backgroundColor: primary_color,
            padding: 15,
            marginHorizontal: 5,
          }}
          onPress={handleLoginBtn}>
          <Text>Login</Text>
        </Button>
        <Button
          // onPress={() => navigation.replace('Register')}
          style={{
            backgroundColor: primary_color,
            padding: 15,
            marginHorizontal: 5,
          }}
          onPress={handleLoginBtn}>
          <Text>Doesn't has an account?</Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
