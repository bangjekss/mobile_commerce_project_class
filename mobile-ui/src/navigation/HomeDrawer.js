import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {HomeTab, ProfileStack} from '.';
import {Button, Container, Content, Footer, Text} from 'native-base';
import {primary_color, surface_color} from '../screen/style';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../redux/action';
import TransactionStack from './TransactionStack';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(logoutAction());
  };
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Home"
      drawerContent={(route) => {
        return (
          <DrawerContentScrollView
            {...route}
            contentContainerStyle={{
              backgroundColor: surface_color,
            }}>
            <Container style={{backgroundColor: primary_color}}>
              <Content>
                <DrawerItemList {...route} />
              </Content>
              <Footer
                style={{
                  backgroundColor: primary_color,
                  minHeight: Dimensions.get('screen').height / 12,
                  maxHeight: Dimensions.get('screen').height / 12,
                  flexDirection: 'row',
                }}>
                <Button
                  onPress={handleLogoutBtn}
                  danger
                  style={{
                    width: '50%',
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Text>logout</Text>
                </Button>
              </Footer>
            </Container>
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Home" component={HomeTab} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Transaction" component={TransactionStack} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

{
  /* <Drawer.Navigator
  initialRouteName="Home"
  drawerContent={(props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate('Login')}
        />
      </DrawerContentScrollView>
    );
  }}>
  <Drawer.Screen name="Home" component={Home} />
  <Drawer.Screen name="New Project" component={NewProject} />
</Drawer.Navigator>; */
}
