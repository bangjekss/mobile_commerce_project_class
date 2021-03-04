import {Container, Content, Header, Icon, Input, Item} from 'native-base';
import React, {useState, useEffect} from 'react';

import {View, Text, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {TransactionCard} from '../../component';
import {primary_color, surface_color} from '../style';

const TrasactionScreen = ({navigation}) => {
  const {transactionList} = useSelector((state) => state.transactionReducer);
  const [search, setSearch] = useState(null);

  return (
    <Container style={{backgroundColor: primary_color}}>
      <Header
        searchBar
        style={{
          alignItems: 'center',
          backgroundColor: primary_color,
        }}>
        <Item
          style={{
            backgroundColor: '#e2e2e2',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Icon name="search" style={{fontSize: 18}} />
          <Input placeholder="Search" onChangeText={(e) => setSearch(e)} />
        </Item>
        <Icon
          name="bars"
          type="FontAwesome5"
          style={{fontSize: 20, marginLeft: 10, color: surface_color}}
        />
      </Header>
      <Content>
        <View
          style={{
            padding: 20,
          }}>
          <FlatList
            data={transactionList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <TransactionCard item={item} navigation={navigation} />
            )}
          />
        </View>
      </Content>
    </Container>
  );
};

export default TrasactionScreen;
