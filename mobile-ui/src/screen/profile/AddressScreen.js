import {Button, Container, Content, Footer, Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {AddressCard} from '../../component';
import {primary_color, surface_color} from '../style';

const AddressScreen = ({navigation}) => {
  const {address} = useSelector((state) => state.authReducer);
  return (
    <Container style={{backgroundColor: primary_color, paddingTop: 20}}>
      <Content style={{flex: 1}}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={address}
          renderItem={({item}) => (
            <AddressCard item={item} navigation={navigation} />
          )}
        />
      </Content>
      <Footer style={{backgroundColor: primary_color}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            onPress={() => navigation.navigate('Add New Address')}
            style={{
              justifyContent: 'center',
              width: '80%',
              backgroundColor: primary_color,
              borderRadius: 100,
              borderColor: surface_color,
              borderWidth: 2,
            }}>
            <Text style={{color: surface_color}}>add new Address</Text>
          </Button>
        </View>
      </Footer>
    </Container>
  );
};

export default AddressScreen;
