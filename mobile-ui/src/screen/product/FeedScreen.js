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
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCard} from '../../component';
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
            // backgroundColor: 'red',
            borderRadius: 50,
            color: surface_color,
            // width: '50%',
            // flex: 10,
            // height: ,
            padding: 10,
            justifyContent: 'center',
          }}
          name="bars"
          type="FontAwesome"
        />
      </Header>
      <Content style={{paddingTop: 20}}>
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
