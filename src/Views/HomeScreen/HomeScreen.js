import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {MaterialIcons,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';

var username="empty";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) {}
        //this.getName = this.getName.bind(this);
        this.state={
            nameToDisplay: ""
        }
        //this.getName();
    }
   
    // getName()
    // {
        
    //     var database = firebase.database();
    //     var userId = firebase.auth().currentUser.uid;
    //     firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
    //         username = (snapshot.val() && snapshot.val().full_name) || 'Anonymous';
    //         console.log(username)
    //         //this.props.navigation.setParams({otherParam:username+'!'})
    //           // ...
    //     });
    //     //  get empty username, why?
    //     //  Alert.alert(username,"test");
    // }
    static navigationOptions = ({ navigation }) => {
        //header: (props)=>(title:name)
         const { params } = navigation.state;
        
         return {
           title: params ? 'Hi '+params.namePar : 'Welcome',
         }
    };
    render(){
        return(
            
            <View style={styles.mainStyle}>
                <View style={styles.lineStyle}>
                    <Text style={styles.textView}>Logo here</Text>
                </View>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=> this.props.navigation.navigate('Logo')}>
                        <MaterialIcons name="face" size={75} color="#ffffff" backgroundColor="#4286f4"/>
                        <Text style={styles.textView}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=> this.props.navigation.navigate('HotJobs')}>
                        <MaterialCommunityIcons name="emoticon-excited" size={75} color="#ffffff" title="My Jobs"/>
                        <Text style={styles.textView}>EazyJob</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=> this.props.navigation.navigate('TagsList')}>
                        <MaterialCommunityIcons name="mailbox" size={75} color="#ffffff" title="My Jobs"/>
                        <Text style={styles.textView}>Messege</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=> this.props.navigation.navigate('CreateAd')}>
                        <Entypo name="megaphone" size={75} color="#ffffff" backgroundColor="#4286f4" title="Post Ad"/>
                        <Text style={styles.textView}>Post{'\n'}EazyJob</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: '#3498db',
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        
    },
    lineStyle:{
        flex:1,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical:30
    },
    textView:{
        color:'#ffffff',
        textAlign: 'center'
    },
    buttonStyle: {
        flex:1,
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center',
        
    }
})