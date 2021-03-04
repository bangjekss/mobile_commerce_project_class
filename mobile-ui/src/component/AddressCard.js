import {Button, Container, Content, Icon, Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAddressAction} from '../redux/action';
import {primary_color, surface_color} from '../screen/style';

const AddressCard = ({item, navigation}) => {
  const userID = useSelector((state) => state.authReducer.id);
  const dispatch = useDispatch();
  const handleDeleteBtn = () => {
    dispatch(deleteAddressAction(item.id, userID));
  };
  // console
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 3,
        marginHorizontal: 20,
        backgroundColor: primary_color,
        borderWidth: 2,
        borderColor: 'rgba(20, 56, 92, 0.1)',
        borderRadius: 10,
        elevation: 5,
      }}>
      <View style={{marginBottom: 6}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}>
          Alamat {item.label}
        </Text>
      </View>
      <View style={{marginBottom: 3}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}>
          {item.receiver}
        </Text>
      </View>
      <View style={{marginBottom: 3}}>
        <Text style={{fontSize: 13}}>{item.phone}</Text>
      </View>
      <View>
        <Text style={{fontSize: 13}}>{item.address}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{width: '83%'}}>
          <Button
            onPress={() =>
              navigation.navigate('Change Address', {
                addressID: item.id,
                p_address: item.address,
                p_label: item.label,
                p_receiver: item.receiver,
                p_phone: item.phone,
              })
            }
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: 0,
              height: 35,
              borderRadius: 5,
              backgroundColor: primary_color,
              borderWidth: 2,
              borderColor: 'rgba(20, 56, 92, 0.1)',
            }}>
            <Text
              style={{fontSize: 14, color: surface_color, fontWeight: 'bold'}}>
              Change
            </Text>
          </Button>
        </View>
        <View style={{width: '16%'}}>
          <Button
            onPress={handleDeleteBtn}
            style={{
              width: '100%',
              justifyContent: 'center',
              height: 35,
              borderRadius: 5,
              backgroundColor: primary_color,
              borderWidth: 2,
              borderColor: 'rgba(20, 56, 92, 0.1)',
            }}>
            <Icon
              name="trash"
              type="FontAwesome5"
              style={{fontSize: 14, color: surface_color}}
            />
            {/* <Text>Change Address</Text> */}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AddressCard;
