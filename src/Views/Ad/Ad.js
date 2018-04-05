import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

export default class Ad extends React.Component {
  render(){
    return(
        <View>
            <Image style={styles.logoStyle}
                source={require('../Assets/logo.jpeg')}>
            </Image>
        </View>
        

    );
}
}
  
const styles = StyleSheet.create({
logoStyle: {
    alignContent:'center',
    justifyContent: 'center',
    width: 120,
    height: 140,
  },
  
})