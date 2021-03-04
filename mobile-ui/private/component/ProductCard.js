import {Button} from 'native-base';
import React, {useState, useEffect} from 'react';

import {View, Text, Dimensions, Image} from 'react-native';
import {local} from '../../local_ip';
import {
  background_color,
  primary_color,
  surface_color,
} from '../../src/screen/style';

const ProductCard = ({item, navigation}) => {
  // nama // harga // description // gambar
  return (
    <View
      style={{
        backgroundColor: background_color,
        // height: Dimensions.get('screen').height / 5,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 20,
        flexDirection: 'row',
      }}>
      <View style={{padding: 10}}>
        <Image
          source={{uri: `${local}${item.image[0].imagepath}`}}
          style={{
            borderRadius: 20,
            height: Dimensions.get('screen').height / 6,
            width: Dimensions.get('screen').height / 6,
          }}
        />
      </View>
      <View style={{flex: 1, padding: 10}}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
        </View>
        <View style={{marginVertical: 5}}>
          <Text style={{fontWeight: 'bold'}}>
            Rp{item.price.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text>{item.description}</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Button
            onPress={() => navigation.navigate('Detail Product', {id: item.id})}
            style={{
              backgroundColor: surface_color,
              borderRadius: 15,
              padding: 10,
            }}>
            <Text style={{color: primary_color, fontWeight: 'bold'}}>
              Detail
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
