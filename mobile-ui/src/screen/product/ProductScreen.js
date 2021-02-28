import {View, Text, Container, Footer, Button} from 'native-base';
import {Dimensions, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-web-swiper';
import {local} from '../../../local_ip';
import {background_color, primary_color, surface_color} from '../style';
import {Divider} from 'react-native-elements';
import {addToCartAction, changeQtyCartAction} from '../../redux/action';

const ProductScreen = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const userID = useSelector((state) => state.authReducer.id);
  const {productList} = useSelector((state) => state.productReducer);
  const {cart} = useSelector((state) => state.cartReducer);
  const product = productList.find((value) => value.id === id);
  console.log(userID);
  const handleBuyBtn = () => {
    const existProduct = cart.find((value) => value.productID === id);
    console.log(route.params);
    if (existProduct) {
      const payload = {
        userID,
        id: existProduct.id,
        quantity: existProduct.quantity + qty,
      };
      dispatch(changeQtyCartAction(payload));
      alert('qty changed');
      return navigation.goBack();
    } else {
      const payload = {
        userID,
        productID: id,
        quantity: qty,
      };
      dispatch(addToCartAction(payload));
    }
  };
  return (
    <Container style={{flex: 1, backgroundColor: primary_color}}>
      <View
        style={{
          flex: 1,
          backgroundColor: background_color,
          elevation: 5,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        }}>
        <Swiper controlsEnabled={true}>
          {product.image.map((value, index) => {
            return (
              <Image
                key={index}
                source={{uri: `${local}/${value.imagepath}`}}
                style={{
                  flex: 1,
                  resizeMode: 'contain',
                }}
              />
            );
          })}
        </Swiper>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 20}}>
        <View>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 10}}>
            {product.name}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
            Rp{product.price.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text style={{color: 'gray', textAlign: 'right'}}>
            {product.category}
          </Text>
        </View>
        <View>
          <Divider style={{backgroundColor: 'gray', marginVertical: 20}} />
        </View>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Description
          </Text>
          <Text>{product.description}</Text>
        </View>
      </View>
      <Footer
        style={{
          backgroundColor: primary_color,
          alignItems: 'center',
          height: Dimensions.get('screen').height / 12,
          paddingVertical: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            maxWidth: '70%',
          }}>
          <Button
            onPress={handleBuyBtn}
            style={{
              borderRadius: 10,
              backgroundColor: surface_color,
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text>Buy</Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '30%',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <Button
              style={{borderRadius: 50, backgroundColor: surface_color}}
              disabled={qty === 1}
              onPress={() => setQty(qty - 1)}>
              <Text>-</Text>
            </Button>
          </View>
          <View>
            <Text>{qty}</Text>
          </View>
          <View>
            <Button
              style={{borderRadius: 50, backgroundColor: surface_color}}
              onPress={() => setQty(qty + 1)}>
              <Text>+</Text>
            </Button>
          </View>
        </View>
      </Footer>
    </Container>
  );
};

export default ProductScreen;
