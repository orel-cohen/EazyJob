import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/Views/Login/Login'
import HomeScreen from './src/Views/HomeScreen/HomeScreen'
import Logo from './src/Views/Logo'
<<<<<<< HEAD
import CreateAd from './src/Views/CreateAd/CreateAd'
=======
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
import Ad from './src/Views/Ad/Ad'
import TagsList from './src/Views/Tags/TagsList'
import _Date from './src/Views/Date_Time/_Date'
import _Time from './src/Views/Date_Time/_Time'
import SignUp from './src/Views/SignUp/SignUp'
import Jobs from './src/Views/Swip/Jobs/Jobs'
import HowItWork from './src/Views/Help/HowItWork'
import AddAd from './src/Views/AddAd/AddAd'
<<<<<<< HEAD
import Profile from './src/Views/Profile/Profile'
import Contact_Us from './src/Contact_Us/Contact_Us'
=======
import Settings from './src/Views/Settings/Settings'
import HotJobs from './src/Views/HotJobs/HotJobs'
import Search from './src/Views/Search/Search'
import FavoriteJobs from './src/Views/FavoriteJobs/FavoriteJobs'
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd

const Routes = StackNavigator(
  {
    Login: { screen: Login },
    Settings: { screen: Settings },
    HomeScreen: { screen: HomeScreen },
<<<<<<< HEAD
    Logo:       { screen: Logo },
    CreateAd:   { screen: CreateAd },
    Ad:         { screen: Ad },
    TagsList:   { screen: TagsList },
    _Date:      { screen: _Date },
    _Time:      { screen: _Time },
    SignUp:     { screen: SignUp },
    Jobs:       { screen: Jobs },
    HowItWork:  { screen: HowItWork},
    AddAd:      { screen: AddAd},
    Profile:    { screen: Profile },
    Contact_Us: { screen: Contact_Us },
=======
    Logo: { screen: Logo },
    Ad: { screen: Ad },
    TagsList: { screen: TagsList },
    _Date: { screen: _Date },
    _Time: { screen: _Time },
    SignUp: { screen: SignUp },
    Jobs: { screen: Jobs },
    HotJobs: { screen: HotJobs },
    Search: { screen: Search },
    HowItWork: { screen: HowItWork },
    AddAd: { screen: AddAd },
    FavoriteJobs: { screen: FavoriteJobs },
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
  },
  { initialRouteName: 'HomeScreen' }
);

export default Routes;

