import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'native-base';
import {Card, ListItem, Icon} from 'react-native-elements';
import {Dimensions, Image, ScrollView, StyleSheet} from 'react-native';
import {local} from '../../local_ip';
import {background_color, primary_color, surface_color} from '../screen/style';

const ProductCart = ({item, navigation}) => {
  return (
    <Card
      containerStyle={{
        borderRadius: 25,
        marginVertical: 5,
        padding: 0,
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
        }}>
        <Card.Image
          source={{
            uri:
              item.image.length > 0 ? `${local}${item.image[0].imagepath}` : '',
            // uri: item.image,
          }}
          style={styles.image}
        />
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          alignItems: 'flex-start',
          // borderRadius: 25,
          boxSizing: 'border-box',
        }}>
        <Card.FeaturedTitle style={{color: 'black'}}>
          {item.name}
        </Card.FeaturedTitle>
        <Card.Title h5 style={{color: 'black'}}>
          Rp{item.price.toLocaleString()}
        </Card.Title>
        <Text>{item.description}</Text>
        <View
          style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 15}}>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate('Detail', {id: item.id, name: item.name})
            }>
            <Text>details</Text>
          </Button>
          <Button style={styles.btn}>
            <Text>buy</Text>
          </Button>
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
  },
  btn: {
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: surface_color,
  },
});

export default ProductCart;
