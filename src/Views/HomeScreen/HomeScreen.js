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
    static navigationOptions = {
        title: 'Welcome ',
    };

    constructor(props) {
        console.disableYellowBox = true
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }
        //this.getName = this.getName.bind(this);
        this.state = {
            fullName: '',
            nameToDisplay: "",
            //currUserID: firebase.auth().currentUser.uid,
        }
        //this.getName();


    }
    async componentDidMount() {
        jobID = '';
        await this.MyAdsID();

    }

    async MyAdsID() {
        //var currentUser = firebase.auth().currentUser.uid;
        let name = ''
        try {
            let value = await firebase.database().ref('users/').child(firebase.auth().currentUser.uid).child("full_name").once('value', async (snapshot) => {
                const va = snapshot.val();
                console.log("1" + va);
                console.log('uid: ',firebase.auth().currentUser.uid)
                // this.state.jobsID.push(jobID);
                name=va;
                this.state.fullName=va;
            this.setState({ fullName: va })

            })
           // console.log("2" + name);
            //this.setState({ fullName: jobIDArray })
            //console.log("3" + this.state.fullName);

        }
        catch (e) {
            console.log('caught error', e);
            // Handle exceptions Working from home
        }
        //console.log("done!!!" + this.state.jobsID);
    }
    //////////////////////////////////////////////////////
    //put full name name//<Text>{this.state.currUserID}</Text>
    ////////////////////////////////////////////
    render() {
        return (

            <View style={styles.mainStyle}>
                <View style={styles.lineStyle}>
                    {/*<Text style={styles.textView}>Logo here</Text>*/}
                </View>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Profile', { currUserID: firebase.auth().currentUser.uid, isCurrUser: true })}>
                        <MaterialIcons name="face" size={50} color="#ffffff" backgroundColor="#4286f4" />
                        <Text style={styles.textView}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('AddAd',{ userName: this.state.fullName })}>
                        <Entypo name="pin" size={50} color="#ffffff" title="Add Ad" />
                        <Text style={styles.textView}>Add Ad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('MyAds')}>
                        <MaterialCommunityIcons name="worker" size={50} color="#ffffff" title="My Jobs" />
                        <Text style={styles.textView}>My Ads</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('HotJobs')}>
                        <MaterialCommunityIcons name="fire" size={50} color="#ffffff" backgroundColor="#4286f4" title="EazyJob" />
                        <Text style={styles.textView}>EazyJob</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Search')}>
                        <MaterialIcons name="location-searching" size={50} color="#ffffff" title="Search" />
                        <Text style={styles.textView}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('FavoriteJobs')}>
                        <MaterialCommunityIcons name="bookmark-check" size={50} color="#ffffff" title="Favorites" />
                        <Text style={styles.textView}>Favorites</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Ratings')}>
                        <MaterialIcons name="rate-review" size={50} color="#ffffff" backgroundColor="#4286f4" title="Rate" />
                        <Text style={styles.textView}>Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Settings')}>
                        <MaterialCommunityIcons name="settings" size={50} color="#ffffff" backgroundColor="#4286f4" title="Settings" />
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
    lineStyle: {
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 30
    },
    textView: {
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center',

    }
})