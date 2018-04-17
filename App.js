import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/Views/Login/Login'
import HomeScreen from './src/Views/HomeScreen/HomeScreen'
import Logo from './src/Views/Logo'
import CreateAd from './src/Views/Ad/CreateAd'
import Ad from './src/Views/Ad/Ad'
import TagsList from './src/Views/Tags/TagsList'
import _Date from './src/Views/Date_Time/_Date'
import _Time from './src/Views/Date_Time/_Time'
import SignUpForm from './src/Views/SignUp/SignUpForm'

const Routes = StackNavigator(
  {
    Login:      { screen: Login },
    HomeScreen: { screen: HomeScreen },
    Logo:       { screen: Logo },
    CreateAd:   { screen: CreateAd },
    Ad:         { screen: Ad },
    TagsList:   { screen: TagsList },
    _Date:   { screen: _Date },
    _Time:   { screen: _Time },
    SignUpForm:  { screen: SignUpForm }
  },
  { initialRouteName: 'Login'}
);

export default Routes;

