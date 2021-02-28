import {
  Button,
  Container,
  Content,
  Footer,
  Header,
  Icon,
  Input,
  Item,
  Text,
  View,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCart} from '../../component';
import {getProducts} from '../../redux/action';
import {background_color, primary_color, surface_color} from '../style';

const FeedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {productList} = useSelector((state) => state.productReducer);
  const [search, setSearch] = useState('');
  useEffect(() => {
    dispatch(getProducts(search));
  }, [dispatch, search]);
  return (
    <Container style={{backgroundColor: surface_color}}>
      <Header searchBar style={{backgroundColor: primary_color}}>
        <Item searchBar style={{backgroundColor: '#e2e2e2'}}>
          <Icon name="search" />
          <Input placeholder="Search" onChangeText={(e) => setSearch(e)} />
          {/* <Icon name="" /> */}
        </Item>
      </Header>
      <Content style={{paddingTop: 20}}>
        <FlatList
          // ListHeaderComponentStyle={{backgroundColor: primary_color}}
          // ListHeaderComponent={
          //   <SearchBar
          //     // style={{backgroundColor: primary_color}}
          //     placeholder="search"
          //   />
          // }
          keyExtractor={(item) => item.id.toString()}
          data={productList}
          renderItem={({item}) => (
            <ProductCart item={item} navigation={navigation} />
          )}
        />
      </Content>
    </Container>
  );
};

export default FeedScreen;
