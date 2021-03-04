import {Button, Container, Content, Footer, Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Dimensions, Image} from 'react-native';
import {background_color, primary_color, surface_color} from '../style';
import Gradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {getAddressAction} from '../../redux/action';

const ProfileScreen = ({navigation}) => {
  // console.log(navigation);
  const dispatch = useDispatch();
  const {id, username, email, roleID} = useSelector(
    (state) => state.authReducer,
  );
  useEffect(() => {
    dispatch(getAddressAction(id));
  }, []);
  return (
    <Container style={{backgroundColor: primary_color}}>
      <Content>
        <Gradient
          colors={[surface_color, primary_color]}
          locations={[0, 0.8]}
          style={{
            minHeight: Dimensions.get('screen').height / 4,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // maxHeight: Dimensions.get('screen').height / 10,
          }}>
          <View>
            <Image
              source={{
                uri:
                  'https://i.pinimg.com/564x/74/6b/5d/746b5dcc04139c4d97acce3a9d17a1af.jpg',
              }}
              style={{
                borderRadius: 100,
                height: Dimensions.get('screen').height / 6,
                width: Dimensions.get('screen').height / 6,
              }}
            />
          </View>
          <View
            style={{
              borderColor: surface_color,
              borderWidth: 1,
              padding: 4,
              borderRadius: 20,
            }}>
            <Text
              style={{color: surface_color, fontSize: 12, fontWeight: 'bold'}}>
              change
            </Text>
          </View>
        </Gradient>
        <View
          style={{
            backgroundColor: primary_color,
            paddingHorizontal: 20,
            // paddingVertical: 10,
          }}>
          <View style={{marginVertical: 10}}>
            <View style={{marginBottom: 3}}>
              <Text style={{fontSize: 13, color: 'gray'}}>Name</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View>
                <Text>{username}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    color: surface_color,
                    fontWeight: 'bold',
                  }}>
                  change
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginVertical: 10}}>
            <View style={{marginBottom: 3}}>
              <Text style={{fontSize: 13, color: 'gray'}}>Email</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View>
                <Text>{email}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    color: surface_color,
                    fontWeight: 'bold',
                  }}>
                  change
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <View style={{marginBottom: 3}}>
              <Text style={{fontSize: 13, color: 'gray'}}>Role ID</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View>
                <Text>{roleID}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    color: surface_color,
                    fontWeight: 'bold',
                  }}>
                  change
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Content>
      <Footer style={{backgroundColor: primary_color}}>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'row',
          }}>
          <Button
            onPress={() => {
              navigation.navigate('Address');
            }}
            style={{
              width: '80%',
              borderRadius: 100,
              justifyContent: 'center',
              backgroundColor: primary_color,
              borderWidth: 2,
              borderColor: surface_color,
            }}>
            <Text style={{color: surface_color}}>View Address</Text>
          </Button>
        </View>
      </Footer>
    </Container>
  );
};

export default ProfileScreen;
