import {Button, Input, Item, Label, Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthModal} from '../../component';
import {loginAction} from '../../redux/action';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLoginBtn = () => {
    console.log('ea');
    const payload = {username, password};
    dispatch(loginAction(payload));
  };

  return (
    <View>
      <AuthModal />
      <Item stackedLabel>
        <Label>Username</Label>
        <Input onChangeText={(e) => setUsername(e)} />
      </Item>
      <Item stackedLabel>
        <Label>Password</Label>
        <Input onChangeText={(e) => setPassword(e)} secureTextEntry />
      </Item>
      <Button onPress={() => handleLoginBtn()}>
        <Text>Login</Text>
      </Button>
      <Button>
        <Text>Create account</Text>
      </Button>
    </View>
  );
};

export default LoginScreen;
