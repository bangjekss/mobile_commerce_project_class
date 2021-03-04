import {
  Container,
  Content,
  Text,
  View,
  Item,
  Input,
  Label,
  Footer,
  Button,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeAddressAction} from '../../redux/action';
import {primary_color, surface_color} from '../style';

const ChangeAddressScreen = ({navigation, route}) => {
  const {addressID, p_address, p_label, p_receiver, p_phone} = route.params;
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.authReducer.id);
  const [address, setAddress] = useState(p_address);
  const [label, setLabel] = useState(p_label);
  const [receiver, setReceiver] = useState(p_receiver);
  const [phone, setPhone] = useState(p_phone);
  const handleSaveBtn = async () => {
    const payload = {
      address,
      label,
      receiver,
      phone,
    };
    await dispatch(changeAddressAction(addressID, userID, payload));
    navigation.replace('Address');
  };
  return (
    <Container style={{backgroundColor: primary_color}}>
      <Content
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          margin: 20,
          backgroundColor: primary_color,
          borderWidth: 2,
          borderColor: 'rgba(20, 56, 92, 0.1)',
          borderRadius: 10,
          elevation: 5,
          maxHeight: Dimensions.get('screen').height / 2.3,
        }}>
        <View>
          <Item stackedLabel>
            <Label>Address</Label>
            <Input
              value={address}
              placeholder="jln. abc..."
              onChangeText={(e) => setAddress(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Label</Label>
            <Input
              placeholder="Home"
              value={label}
              onChangeText={(e) => setLabel(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Receiver</Label>
            <Input
              placeholder="Rina"
              value={receiver}
              onChangeText={(e) => setReceiver(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Phone</Label>
            <Input
              value={phone}
              placeholder="ex: 1234..."
              onChangeText={(e) => setPhone(e)}
            />
          </Item>
        </View>
      </Content>
      <Footer style={{backgroundColor: primary_color}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            onPress={handleSaveBtn}
            style={{
              justifyContent: 'center',
              width: '80%',
              backgroundColor: surface_color,
              borderRadius: 100,
              // borderColor: surface_color,
              // borderWidth: 2,
            }}>
            <Text style={{color: primary_color}}>save</Text>
          </Button>
        </View>
      </Footer>
    </Container>
  );
};

export default ChangeAddressScreen;
