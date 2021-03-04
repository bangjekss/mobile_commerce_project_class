import React, {useState, useEffect} from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {local} from '../../local_ip';

const CheckoutCard = ({item}) => {
  // console.log(item.imagepath);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 10,
      }}>
      <View style={{flex: 30, flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={{uri: `${local}${item.image[0].imagepath}`}}
          style={{
            height: Dimensions.get('screen').width / 5,
            width: Dimensions.get('screen').width / 5,
          }}
        />
      </View>
      <View style={{flex: 70}}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.name}</Text>
        </View>
        <View style={{marginTop: 3}}>
          <Text style={{fontWeight: 'normal', fontSize: 12}}>
            {item.quantity} item
          </Text>
        </View>
        <View
          style={{marginTop: 3, flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={{fontWeight: 'bold', fontSize: 13}}>
            Rp{item.price.toLocaleString()}
          </Text>
          <Text style={{fontSize: 12}}>/item</Text>
        </View>
      </View>
    </View>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({});
