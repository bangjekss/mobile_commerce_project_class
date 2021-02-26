import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  View,
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import React, {useState, useEffect} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthModal} from '../../component';
import {loginAction} from '../../redux/action';
import {background_color, primary_color} from '..';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLoginBtn = () => {
    console.log(username, password);
    const payload = {
      username,
      password,
    };

    dispatch(loginAction(payload));
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <AuthModal />
      <Container>
        <Grid>
          <Row style={styles.headerContainer} size={30}>
            <View style={styles.logoContainer}>
              <Image
                source={{uri: 'https://i.imgur.com/vsF0jds.png'}}
                style={styles.logo}
              />
            </View>
          </Row>
          <Row style={styles.contentContainer} size={30}>
            <Col style={{justifyContent: 'space-between'}}>
              <View style={styles.formContainer}>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input onChangeText={(e) => setUsername(e)} />
                </Item>
                <Item floatingLabel style={{marginTop: 10}}>
                  <Label>Password</Label>
                  <Input onChangeText={(e) => setPassword(e)} secureTextEntry />
                </Item>
              </View>
              <View style={styles.btnFormContainer}>
                <Button
                  style={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderRadius: 50,
                  }}
                  onPress={() => navigation.replace('Register')}>
                  <Text style={{color: 'black'}}>Doesn't have an account?</Text>
                </Button>
                <Button
                  onPress={() => handleLoginBtn()}
                  style={{
                    backgroundColor: background_color,
                    minWidth: Dimensions.get('screen').width / 4,
                    justifyContent: 'center',
                    borderRadius: 50,
                  }}>
                  <Text style={{color: 'black'}}>Login </Text>
                </Button>
              </View>
            </Col>
          </Row>
          <Row size={10} style={{alignItems: 'center'}}>
            <Col>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'gray'}}>
                  ----------------- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; or
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -----------------
                </Text>
              </View>
            </Col>
          </Row>
          <Row size={30}>
            <Col>
              <View style={{alignSelf: 'center'}}>
                <Button
                  style={{
                    backgroundColor: '#1876F2',
                    minWidth: Dimensions.get('screen').width / 1.5,
                    justifyContent: 'center',
                    marginVertical: 4,
                    borderRadius: 50,
                  }}>
                  <Icon name="facebook" type="FontAwesome" />
                  <Text>Login with facebook</Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: '#323131',
                    minWidth: Dimensions.get('screen').width / 1.5,
                    justifyContent: 'center',
                    marginVertical: 4,
                    borderRadius: 50,
                  }}>
                  <Icon name="github" type="FontAwesome" />
                  <Text>Login with GitHub</Text>
                </Button>
              </View>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: primary_color,
  },
  headerContainer: {
    backgroundColor: background_color,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
  },
  logoContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: primary_color,
    borderRadius: 20,
  },
  logo: {
    height: Dimensions.get('screen').width / 5.5,
    width: Dimensions.get('screen').width / 1.3,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  formContainer: {
    marginTop: 30,
  },
  btnFormContainer: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default LoginScreen;
