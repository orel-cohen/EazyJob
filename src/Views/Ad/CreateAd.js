import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView,Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import _Date from '../Date_Time/_Date'
import _Time from '../Date_Time/_Time'
import TagsList from '../Tags/TagsList'




export default class CreateAd extends React.Component {
    render(){
        return(
            <View>
                <Image style={styles.logoStyle}
                    source={require('../../Assets/logo.jpeg')}>
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