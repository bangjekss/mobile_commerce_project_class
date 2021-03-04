import {Container, Content, Header, Icon, Input, Item} from 'native-base';
import React, {useState, useEffect} from 'react';

import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../../src/redux/action';
import {primary_color, surface_color} from '../../../src/screen/style';
import ProductCard from '../../component/ProductCard';

const FeedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const {productList} = useSelector((state) => state.productReducer);
  return (
    <Container style={{backgroundColor: surface_color}}>
      <Header
        searchBar
        style={{backgroundColor: primary_color, alignItems: 'center'}}>
        <Item searchBar style={{backgroundColor: '#e2e2e2', borderRadius: 50}}>
          <Icon name="search" />
          <Input placeholder="Search" onChangeText={(e) => setSearch(e)} />
        </Item>
        <Icon
          onPress={() => navigation.toggleDrawer()}
          style={{
            borderRadius: 50,
            color: surface_color,
            padding: 10,
            justifyContent: 'center',
          }}
          name="bars"
          type="FontAwesome"
        />
      </Header>
      <Content style={{paddingVertical: 10}}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={productList}
          renderItem={({item}) => (
            <ProductCard item={item} navigation={navigation} />
          )}
        />
      </Content>
    </Container>
  );
};

export default FeedScreen;
