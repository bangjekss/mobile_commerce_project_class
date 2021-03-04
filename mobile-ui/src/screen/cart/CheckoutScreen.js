import {Button, Container, Content, Icon} from 'native-base';
import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {CheckoutCard} from '../../component';
import {checkoutAction} from '../../redux/action';
import {background_color, primary_color, surface_color} from '../style';

const CheckoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {address, id} = useSelector((state) => state.authReducer);
  const {cart} = useSelector((state) => state.cartReducer);
  const cartChecked = cart.filter((value) => value.checkID === 2);
  // console.log(cartChecked);
  const renderTotal = () => {
    let total = 0;
    cartChecked.forEach((value) => (total += value.quantity * value.price));
    return total;
  };
  const handlePaymentBtn = async () => {
    const payload = {
      items: cartChecked,
      userID: id,
    };
    await dispatch(checkoutAction(payload));
    navigation.goBack();
    navigation.navigate('Feed');
  };
  return (
    <Container style={{backgroundColor: surface_color}}>
      <Content>
        <View style={{backgroundColor: primary_color, paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 0.5,
              borderColor: 'rgba(0,0,0,0.2)',
            }}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>Billing</Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: surface_color,
                }}>
                Change
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: 10}}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  textTransform: 'capitalize',
                }}>
                alamat {address[0].label}
              </Text>
            </View>
            <View style={{marginVertical: 3}}>
              <Text style={{fontSize: 12}}>
                {address[0].receiver} ({address[0].phone})
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>{address[0].address}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: primary_color,
            paddingHorizontal: 20,
            marginTop: 10,
            paddingVertical: 15,
          }}>
          <View
            style={{
              paddingBottom: 10,
              borderBottomWidth: 0.5,
              borderColor: 'rgba(0,0,0,0.2)',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Product</Text>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <FlatList
                data={cartChecked}
                renderItem={({item}) => <CheckoutCard item={item} />}
              />
            </View>
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                style={{
                  width: '100%',
                  backgroundColor: primary_color,
                  elevation: 5,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  borderWidth: 2,
                  borderColor: surface_color,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="truck"
                    type="FontAwesome5"
                    style={{color: surface_color, fontSize: 20}}
                  />
                  <Text style={{color: surface_color, fontWeight: 'bold'}}>
                    Shipping
                  </Text>
                </View>
                <Icon
                  name="caret-right"
                  type="FontAwesome5"
                  style={{color: surface_color, fontSize: 20}}
                />
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: primary_color,
            paddingHorizontal: 20,
            marginTop: 10,
            paddingVertical: 15,
          }}>
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              onPress={handlePaymentBtn}
              style={{
                width: '100%',
                backgroundColor: primary_color,
                elevation: 5,
                borderRadius: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderWidth: 2,
                borderColor: surface_color,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="tags"
                  type="FontAwesome5"
                  style={{color: surface_color, fontSize: 20}}
                />
                <Text style={{color: surface_color, fontWeight: 'bold'}}>
                  Promo
                </Text>
              </View>
              <Icon
                name="caret-right"
                type="FontAwesome5"
                style={{color: surface_color, fontSize: 20}}
              />
            </Button>
          </View>
        </View>
        <View
          style={{
            backgroundColor: primary_color,
            paddingHorizontal: 20,
            marginTop: 10,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Total</Text>
            <Text style={{fontWeight: 'bold', paddingLeft: 10, fontSize: 16}}>
              Rp{renderTotal().toLocaleString()}
            </Text>
          </View>
          <View>
            <Button
              onPress={handlePaymentBtn}
              style={{
                backgroundColor: surface_color,
                elevation: 5,
                borderRadius: 10,
                paddingHorizontal: 20,
              }}>
              <Text style={{color: primary_color, fontWeight: 'bold'}}>
                Payment
              </Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
