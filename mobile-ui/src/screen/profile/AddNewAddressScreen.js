import {
  Container,
  Content,
  Text,
  View,
  Form,
  Item,
  Input,
  Label,
  Footer,
  Button,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNewAddressAction} from '../../redux/action';
import {primary_color, surface_color} from '../style';

const AddNewAddressScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {id, username} = useSelector((state) => state.authReducer);
  const [address, setAddress] = useState(null);
  const [label, setLabel] = useState('Home');
  const [receiver, setReceiver] = useState(username);
  const [phone, setPhone] = useState(null);
  // console.log(address, label, receiver, phone);
  const handleSaveBtn = async () => {
    const payload = {
      address,
      label,
      receiver,
      phone,
    };
    await dispatch(addNewAddressAction(id, payload));
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
            <Input placeholder="Mustofa" onChangeText={(e) => setReceiver(e)} />
          </Item>
          <Item stackedLabel>
            <Label>Phone</Label>
            <Input
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

export default AddNewAddressScreen;
