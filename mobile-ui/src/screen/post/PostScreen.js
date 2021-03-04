import {Input} from 'native-base';
import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {uploadProductAction} from '../../redux/action';

const PostScreen = () => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryID, setCategoryID] = useState(0);
  const handleCamera = async () => {
    try {
      const response = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
      });
      setPhoto(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGallery = async () => {
    try {
      const response = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });
      setPhoto(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = () => {
    dispatch(
      uploadProductAction({name, price, description, categoryID, photo}),
    );
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <Image
        source={{uri: photo ? photo.path : ''}}
        style={styles.imageStyle}
      />
      <Input placeholder="Name" onChangeText={(e) => setName(e)} />
      <Input placeholder="price" onChangeText={(e) => setPrice(parseInt(e))} />
      <Input
        placeholder="description"
        onChangeText={(e) => setDescription(e)}
      />
      <Input
        placeholder="categoryID"
        onChangeText={(e) => setCategoryID(parseInt(e))}
      />
      <Button title="Open Camera" onPress={handleCamera} />
      <Button title="Open Gallery" onPress={handleGallery} />
      <Button title="Upload" onPress={handleUpload} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageStyle: {
    height: 300,
    width: Dimensions.get('screen').width,
  },
});

export default PostScreen;
