import {
  Button,
  Container,
  Content,
  Footer,
  Header,
  Icon,
  Input,
  Item,
  Text,
  View,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {CartCard} from '../../component';
import {primary_color, surface_color} from '../style';

const cartScreen = ({navigation}) => {
  const {cart} = useSelector((state) => state.cartReducer);
  const renderTotal = () => {
    let total = 0;
    cart.forEach((value) => {
      if (value.checkID === 2) return (total += value.price * value.quantity);
    });
    return total;
  };
  const handleCheckOutBtn = () => {
    navigation.navigate('Checkout');
  };
  return (
    <Container>
      <Content style={{paddingVertical: 10}}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={cart}
          renderItem={({item}) => <CartCard item={item} />}
        />
      </Content>
      <Footer
        style={{
          backgroundColor: surface_color,
          maxHeight: Dimensions.get('screen').height / 18,
          minHeight: Dimensions.get('screen').height / 18,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '60%', paddingHorizontal: 20}}>
          <Text style={{color: primary_color, fontWeight: 'bold'}}>
            Total : Rp{renderTotal().toLocaleString()}
          </Text>
        </View>
        <View style={{width: '40%'}}>
          <Button
            disabled={renderTotal() === 0}
            onPress={handleCheckOutBtn}
            style={{
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: primary_color,
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text style={{color: surface_color}}>Check out</Text>
          </Button>
        </View>
      </Footer>
    </Container>
  );
};

export default cartScreen;
