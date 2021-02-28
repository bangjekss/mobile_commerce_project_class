import {Button, Container, Content, Footer, Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {CartCard} from '../../component';
import {primary_color, surface_color} from '../style';

const cartScreen = () => {
  const {cart} = useSelector((state) => state.cartReducer);
  const renderTotal = () => {
    let total = 0;
    cart.forEach((value) => (total += value.price * value.quantity));
    return total;
  };
  // const [cek, setCek] = useState(true);

  return (
    <Container>
      <Content>
        <FlatList
          data={cart}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => <CartCard key={index} item={item} />}
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
            style={{
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
