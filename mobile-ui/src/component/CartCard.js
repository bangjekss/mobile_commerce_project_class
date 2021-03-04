import React, {useState, useEffect} from 'react';
import {
  Button,
  CheckBox,
  Container,
  Footer,
  Icon,
  ListItem,
  Text,
  View,
} from 'native-base';
import {Card} from 'react-native-elements';
import {Dimensions, StyleSheet} from 'react-native';
import {local} from '../../local_ip';
import {
  accent_color,
  background_color,
  primary_color,
  surface_color,
} from '../screen/style';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeIsCheckedCartAction,
  changeQtyCartAction,
  deleteCartAction,
} from '../redux/action';

const CartCard = ({item, navigation}) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.authReducer.id);
  // const {cart} = useSelector((state) => state.cartReducer);
  const [cek, setCek] = useState(true);
  useEffect(() => {
    if (item.checkID === 1) setCek(false);
    if (item.checkID === 2) setCek(true);
  }, []);

  // useEffect(() => {
  // }, [dispatch, cek]);

  const handleCheckBox = () => {
    setCek(!cek);
    const payload = {
      id: item.id,
      userID,
      checkID: cek ? 1 : 2,
    };
    dispatch(changeIsCheckedCartAction(payload));
  };

  const handleDecreaseBtn = () => {
    const {id, quantity} = item;
    const payload = {
      id,
      userID,
      quantity: quantity - 1,
    };
    dispatch(changeQtyCartAction(payload));
  };
  const handleIncreaseBtn = () => {
    const {id, quantity} = item;
    const payload = {
      id,
      userID,
      quantity: quantity + 1,
    };
    dispatch(changeQtyCartAction(payload));
  };
  const handleDeleteBtn = () => {
    const {id} = item;
    const payload = {
      id,
      userID,
    };
    dispatch(deleteCartAction(payload));
  };
  return (
    <Card
      containerStyle={{
        borderRadius: 25,
        marginVertical: 5,
        backgroundColor: background_color,
      }}
      wrapperStyle={{
        flexDirection: 'row',
        padding: 0,
      }}>
      <View
        style={{
          backgroundColor: primary_color,
          borderRadius: 25,
          padding: 10,
          boxSizing: 'border-box',
          width: '40%',
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').width / 2.7,
        }}>
        <Card.Image
          source={{
            uri: item.image ? `${local}${item.image[0].imagepath}` : null,
          }}
          style={styles.image}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Card.FeaturedTitle style={{color: 'black'}}>
              {item.name}
            </Card.FeaturedTitle>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <ListItem>
              <CheckBox
                color={surface_color}
                checked={cek}
                onPress={handleCheckBox}
              />
            </ListItem>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            // backgroundColor: 'white',
          }}>
          <Card.Title h5 style={{color: 'black'}}>
            Rp{item.price.toLocaleString()}
          </Card.Title>
          <Card.FeaturedSubtitle style={{color: 'black'}}>
            x {item.quantity}
          </Card.FeaturedSubtitle>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            width: '100%',
            marginVertical: 10,
          }}>
          <View>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
              Prize : Rp{(item.quantity * item.price).toLocaleString()}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <View>
              <Button
                disabled={item.quantity === 1}
                warning
                style={styles.qtyControlBtn}
                onPress={handleDecreaseBtn}>
                <Text style={{color: surface_color}}>-</Text>
              </Button>
            </View>
            <View style={{marginHorizontal: 7}}>
              <Text>{item.quantity}</Text>
            </View>
            <View>
              <Button
                warning
                style={styles.qtyControlBtn}
                onPress={handleIncreaseBtn}>
                <Text style={{color: surface_color}}>+</Text>
              </Button>
            </View>
          </View>
          <View>
            <Button warning style={styles.deleteBtn} onPress={handleDeleteBtn}>
              <Icon name="trash" style={{color: surface_color}} />
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: 10,
    flexDirection: 'row',
  },
  image: {
    height: Dimensions.get('screen').width / 3,
    width: Dimensions.get('screen').width / 3,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  paymentBtn: {
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: surface_color,
  },
  deleteBtn: {
    borderRadius: 10,
    marginHorizontal: 2,
    color: 'black',
    // backgroundColor: primary_color,
  },
  qtyControlBtn: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    // backgroundColor: surface_color,
  },
});

export default CartCard;
