import {Button, Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCart} from '../../component';
import {getProducts} from '../../redux/action';

const FeedScreen = ({navigation}) => {
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const dispatch = useDispatch();
  const {productList} = useSelector((state) => state.productReducer);
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={productList}
        renderItem={({item}) => (
          <ProductCart item={item} navigation={navigation} />
        )}
      />
      <Button onPress={() => navigation.jumpTo('Post')}>
        <Text>jump</Text>
      </Button>
    </View>
  );
};

export default FeedScreen;
