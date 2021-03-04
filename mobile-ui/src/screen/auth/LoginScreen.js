import {
  Button,
  Container,
  Icon,
  Input,
  Item,
  Label,
  Text,
  View,
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthModal} from '../../component';
import {loginAction} from '../../redux/action';
import {background_color, primary_color} from '../style';
import Spinkit from 'react-native-spinkit';
import {API_LOADING_FAILED} from '../../redux/type';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.authReducer);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLoginBtn = () => {
    const payload = {
      username,
      password,
    };
    if (
      username === null ||
      username === '' ||
      password === null ||
      password === ''
    ) {
      return dispatch({
        type: API_LOADING_FAILED,
        payload: 'The fields must filled',
      });
    } else {
      dispatch(loginAction(payload));
    }
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
                {isLoading ? (
                  <Button
                    disabled={isLoading}
                    onPress={() => handleLoginBtn()}
                    style={{
                      backgroundColor: background_color,
                      minWidth: Dimensions.get('screen').width / 4,
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Spinkit
                      color={primary_color}
                      size={25}
                      type="ChasingDots"
                    />
                  </Button>
                ) : (
                  <Button
                    onPress={() => handleLoginBtn()}
                    style={{
                      backgroundColor: background_color,
                      minWidth: Dimensions.get('screen').width / 4,
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'black'}}>Login</Text>
                  </Button>
                )}
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
