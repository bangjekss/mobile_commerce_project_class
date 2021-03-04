import {Button, Icon} from 'native-base';
import React, {useState, useEffect} from 'react';

import {View, Text, Dimensions} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {local} from '../../local_ip';
import {background_color, primary_color, surface_color} from '../screen/style';

const TransactionCard = ({item, navigation}) => {
  const {name, imagepath, quantity} = item.items[0];
  const renderDate = () => {
    let date = item.date;
    if (item.month == 1) date += ' Jan ' + item.year;
    if (item.month == 2) date += ' Feb ' + item.year;
    if (item.month == 3) date += ' Mar ' + item.year;
    if (item.month == 4) date += ' Apr ' + item.year;
    if (item.month == 5) date += ' May ' + item.year;
    if (item.month == 6) date += ' Jun ' + item.year;
    if (item.month == 7) date += ' Jul ' + item.year;
    if (item.month == 8) date += ' Aug ' + item.year;
    if (item.month == 9) date += ' Sep ' + item.year;
    if (item.month == 11) date += ' Nov ' + item.year;
    if (item.month == 12) date += ' Dec ' + item.year;
    return date;
  };
  const renderStatus = () => {
    let status;
    if (item.statusID == 1) status = 'Not Paid Yet';
    return status;
  };
  return (
    <View
      style={{
        backgroundColor: primary_color,
        elevation: 2,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(21, 35, 78, 0.1)',
        // height: Dimensions.get('screen').height / 5,
        padding: 20,
        marginVertical: 3,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Icon
              type="FontAwesome5"
              name="shopping-bag"
              style={{color: surface_color, fontSize: 18}}
            />
          </View>
          <View style={{marginLeft: 5}}>
            <Text>{renderDate()}</Text>
          </View>
        </View>
        <View
          style={{
            padding: 5,
            backgroundColor: 'rgba(20, 56, 92, 0.2)',
            borderRadius: 5,
          }}>
          <Text
            style={{color: surface_color, fontSize: 12, fontWeight: 'bold'}}>
            {renderStatus()}
          </Text>
        </View>
      </View>
      <Divider style={{marginVertical: 10}} />
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View>
          <Image
            source={{uri: `${local}${imagepath}`}}
            style={{
              height: Dimensions.get('screen').height / 18,
              width: Dimensions.get('screen').height / 18,
              borderRadius: 15,
            }}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{name}</Text>
          </View>
          <View>
            <Text style={{fontSize: 12, color: 'gray'}}>{quantity} item</Text>
          </View>
        </View>
      </View>
      <View>
        {item.items.length > 1 ? (
          <Text style={{fontSize: 12}}>
            +{item.items.length - 1} other products
          </Text>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <View>
          <View>
            <Text style={{fontSize: 12}}>Total</Text>
          </View>
          <View style={{paddingLeft: 15}}>
            <Text style={{fontWeight: 'bold'}}>
              Rp{item.totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>
        <View>
          <Button
            style={{
              borderRadius: 5,
              backgroundColor: surface_color,
              padding: 10,
              height: 30,
            }}>
            <Text style={{color: primary_color, fontWeight: 'bold'}}>
              re-buy
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;
