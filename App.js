import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/Views/Login/Login'
import HomeScreen from './src/Views/HomeScreen/HomeScreen'
import Logo from './src/Views/Logo'
import Ad from './src/Views/Ad/Ad'
import TagsList from './src/Views/Tags/TagsList'
import _Date from './src/Views/Date_Time/_Date'
import _Time from './src/Views/Date_Time/_Time'
import SignUp from './src/Views/SignUp/SignUp'
import Jobs from './src/Views/Swip/Jobs/Jobs'
import HowItWork from './src/Views/Help/HowItWork'
import AddAd from './src/Views/AddAd/AddAd'
import MyAds from './src/Views/MyAds/MyAds'
import Profile from './src/Views/Profile/Profile'
import Settings from './src/Views/Settings/Settings'
import HotJobs from './src/Views/HotJobs/HotJobs'
import Search from './src/Views/Search/Search'
import FavoriteJobs from './src/Views/FavoriteJobs/FavoriteJobs'
import Contact_Us from './src/Views/Contact_Us/Contact_Us'


const Routes = StackNavigator(
  {
    Login:        { screen: Login },
    Settings:     { screen: Settings },
    HomeScreen:   { screen: HomeScreen },
    Logo:         { screen: Logo },
    Ad:           { screen: Ad },
    TagsList:     { screen: TagsList },
    MyAds:        { screen: MyAds },
    _Date:        { screen: _Date },
    _Time:        { screen: _Time },
    SignUp:       { screen: SignUp },
    Jobs:         { screen: Jobs },
    HowItWork:    { screen: HowItWork},
    AddAd:        { screen: AddAd},
    Profile:      { screen: Profile },
    HotJobs:      { screen: HotJobs },
    Search:       { screen: Search },
    FavoriteJobs: { screen: FavoriteJobs },
    Contact_Us:   { screen: Contact_Us}
  },
  { initialRouteName: 'Login' }
);

export default Routes;

