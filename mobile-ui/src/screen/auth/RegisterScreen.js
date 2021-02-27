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
import {useDispatch, useSelector} from 'react-redux';
import {AuthModal} from '../../component';
import {registerAction} from '../../redux/action';
import {background_color, primary_color} from '../style';
import {API_LOADING_FAILED} from '../../redux/type';
import Spinkit from 'react-native-spinkit';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.authReducer);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCPassword] = useState(null);

  const handleRegisBtn = () => {
    const payload = {
      username,
      email,
      password,
    };
    if (
      username === null ||
      username === '' ||
      email === null ||
      email === '' ||
      password === null ||
      password === ''
    ) {
      return dispatch({
        type: API_LOADING_FAILED,
        payload: 'The fields must filled',
      });
    } else {
      if (password !== cpassword) {
        return dispatch({
          type: API_LOADING_FAILED,
          payload: 'Password does not match',
        });
      } else {
        return dispatch(registerAction(payload));
      }
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <AuthModal />
      <Container>
        <Grid>
          <Row style={styles.headerContainer} size={35}>
            <View style={styles.logoContainer}>
              <Image
                source={{uri: 'https://i.imgur.com/vsF0jds.png'}}
                style={styles.logo}
              />
            </View>
          </Row>
          <Row style={styles.contentContainer} size={65}>
            <Col style={{justifyContent: 'flex-start'}}>
              <View style={styles.formContainer}>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input onChangeText={(e) => setUsername(e)} />
                </Item>
                <Item floatingLabel style={{marginTop: 10}}>
                  <Label>Email</Label>
                  <Input onChangeText={(e) => setEmail(e)} />
                </Item>
                <Item floatingLabel style={{marginTop: 10}}>
                  <Label>Password</Label>
                  <Input onChangeText={(e) => setPassword(e)} secureTextEntry />
                </Item>
                <Item floatingLabel style={{marginTop: 10}}>
                  <Label>Confirm Password</Label>
                  <Input
                    onChangeText={(e) => setCPassword(e)}
                    secureTextEntry
                  />
                </Item>
              </View>
              <View style={styles.btnFormContainer}>
                <Button
                  style={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderRadius: 50,
                  }}
                  onPress={() => navigation.replace('Login')}>
                  <Text style={{color: 'black'}}>Have an account?</Text>
                </Button>
                {isLoading ? (
                  <Button
                    disabled={isLoading}
                    onPress={handleRegisBtn}
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
                    onPress={handleRegisBtn}
                    style={{
                      backgroundColor: background_color,
                      minWidth: Dimensions.get('screen').width / 4,
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'black'}}>Register</Text>
                  </Button>
                )}
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
    marginVertical: 50,
  },
  btnFormContainer: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default RegisterScreen;
