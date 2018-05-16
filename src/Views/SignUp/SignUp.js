import React, {Component} from 'react';
import { Button, ScrollView, Text, View, TextInput, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import * as firebase from "firebase";
import { StackNavigator } from 'react-navigation';
import Firebase from '../../Firebase/Firebase';
import TagsList from '../Tags/TagsList';
import DismissKeyboard from "dismissKeyboard";
import SignUpView from './SignUpView'

export default class SignU extends React.Component {
    render(){
      return(
      <SignUpView/>
  )}
  }
