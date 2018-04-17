import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {MaterialIcons,MaterialCommunityIcons,Entypo} from '@expo/vector-icons'
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase'

var username="empty";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) {}
        this.getName = this.getName.bind(this);
        this.state={
            nameToDisplay: ""
        }
        this.getName();
    }
    
    getName()
    {
        
        var database = firebase.database();
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
            username = (snapshot.val() && snapshot.val().full_name) || 'Anonymous';
            console.log(username)
              // ...
        });
        //  get empty username, why?
        //  Alert.alert(username,"test");
    }
    static navigationOptions = {
        title: username // !!! Hide Header
      }
    render(){
        return(
            
            <View style={styles.HomeScreen}>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('Logo')}>
                    <MaterialIcons name="face" size={100} color="#ffffff" backgroundColor="#4286f4"/>
                    <Text style={styles.textView}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('SignUpForm')}>
                    <MaterialCommunityIcons name="emoticon-excited" size={100} color="#ffffff" title="My Jobs"/>
                    <Text style={styles.textView}>My EazyJob</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('TagsList')}>
                    <MaterialCommunityIcons name="mailbox" size={100} color="#ffffff" title="My Jobs"/>
                    <Text style={styles.textView}>Messege</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonView} onPress={()=> this.props.navigation.navigate('CreateAd')}>
                    <Entypo name="megaphone" size={100} color="#ffffff" backgroundColor="#4286f4"/>
                    <Text style={styles.textView}>Post Ad</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    HomeScreen: {
        backgroundColor: '#3498db',
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    ButtonView:{
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textView:{
        color:'#ffffff'
    }
})