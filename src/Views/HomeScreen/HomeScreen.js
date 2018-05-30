import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';
import { Ionicons } from '@expo/vector-icons';

//import styles from './HomeScreenstyle'

var username = "empty";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) {}
        //this.getName = this.getName.bind(this);
        this.state={
            nameToDisplay: "",
            currUserID: this.props.navigation.state.params.currUserID,
        }
        //this.getName();
    }
   
    // getName()
    // {
        
    //     var database = firebase.database();

    ////////////////
    //     var userId = firebase.auth().currentUser.uid; getting the userID
    /////////////

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
                    {/*<Text style={styles.textView}>Logo here</Text>*/}
                    <Logo/>
                </View>
                <Text>{this.state.currUserID}</Text>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=> this.props.navigation.navigate('Profile', {currUserID: this.state.currUserID, isCurrUser: true})}>
                        <MaterialIcons name="face" size={75} color="#ffffff" backgroundColor="#4286f4"/>
                        <Text style={styles.textView}>Profile</Text>
                    </TouchableOpacity>
                   { <TouchableOpacity style={styles.buttonStyle} onPress={()=> this.props.navigation.navigate('Contact_Us', {currUserID: 'TEST'/*this.state.currUserID*/})}>
                        <MaterialCommunityIcons name="mailbox" size={75} color="#ffffff" title="My Jobs"/>
                        <Text style={styles.textView}>Contact Us</Text>
                        </TouchableOpacity>}
                
                
                
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('AddAd')}>
                        <Entypo name="pin" size={60} color="#ffffff" title="Add Ad" />
                        <Text style={styles.textView}>Add Ad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate()}>
                        <MaterialCommunityIcons name="worker" size={60} color="#ffffff" title="My Jobs" />
                        <Text style={styles.textView}>My Ads</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('HotJobs')}>
                        <MaterialCommunityIcons name="fire" size={60} color="#ffffff" backgroundColor="#4286f4" title="EazyJob" />
                        <Text style={styles.textView}>EazyJob</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Search')}>
                        <MaterialIcons name="location-searching" size={60} color="#ffffff" title="Search" />
                        <Text style={styles.textView}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('FavoriteJobs')}>
                        <MaterialCommunityIcons name="bookmark-check" size={60} color="#ffffff" title="Favorites" />
                        <Text style={styles.textView}>Favorites</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Settings')}>
                        <MaterialCommunityIcons name="settings" size={60} color="#ffffff" backgroundColor="#4286f4" title="Settings" />
                        <Text style={styles.textView}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: '#3498db',
        flex: 1,
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