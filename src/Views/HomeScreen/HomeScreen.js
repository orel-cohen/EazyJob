import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {MaterialIcons,MaterialCommunityIcons,Entypo} from '@expo/vector-icons'
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
            } catch (error) {}
        //var user = firebase.auth().currentUser;
    }
    
    static navigationOptions = {
        //header: null // !!! Hide Header
        //title: "Welcome "+user.full_name
        
      }
    render(){
        return(
            
            <View style={styles.HomeScreen}>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('Logo')}>
                    <MaterialIcons name="face" size={100} color="#006064" backgroundColor="#4286f4"/>
                    <Text>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('SignUpForm')}>
                    <MaterialCommunityIcons name="emoticon-excited" size={100} color="#006064" title="My Jobs"/>
                    <Text>My EazyJob</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('TagsList')}>
                    <MaterialCommunityIcons name="mailbox" size={100} color="#006064" title="My Jobs"/>
                    <Text>Messege</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('Ad')}>
                    <Entypo name="megaphone" size={100} color="#006064" backgroundColor="#4286f4"/>
                    <Text>Post Ad</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    HomeScreen: {
        backgroundColor: '#90caf9',
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    ButtonView:{
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})