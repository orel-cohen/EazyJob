import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';
import Deck from '../Swip/Deck'

const MyAdsData = [];

export default class MyAds extends React.Component {
    static navigationOptions = {
        title: 'My Ads',
    };
    constructor(props) {
        super(props);
        console.disableYellowBox = true
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            myJobs: [],
            jobsID: [],
            currentUserID: firebase.auth().currentUser.uid
        }
        this.MyAdsID = this.MyAdsID.bind(this)
        this.MyAdsDetails = this.MyAdsDetails.bind(this)
        this.renderItem = this.renderItem.bind(this)
        //this.renderNoMoreCards = this.renderNoMoreCards.bind(this)
    }

    async componentDidMount() {
        jobID = '';
        await this.MyAdsID();

    }

    async MyAdsID() {
        var uid = this.state.currentUserID;
        console.log('uid: ', uid)
        let jobIDArray = []
        try {
            let value = await firebase.database().ref('users/').child(uid).child("ads").once('value', async (snapshot) => {
                snapshot.forEach(childSnapshot => {
                    if(childSnapshot.val() != "0") {
                        jobID = childSnapshot.val();
                        console.log('jobID: ', jobID)
                        // this.state.jobsID.push(jobID);
                        jobIDArray.push(jobID)
                    }
                })

            })
            this.setState({ jobsID: jobIDArray })
            await this.MyAdsDetails();
        }
        catch (e) {
            console.log('caught error', e);
            // Handle exceptions
        }
        //console.log("done!!!" + this.state.jobsID);
    }
    async MyAdsDetails() {
        //var currentUser = firebase.auth().currentUser.uid;
        let jobIDArray = this.state.jobsID;
        let myJobsArray = []
        console.log('jobIDArray: ', jobIDArray)
        try {
            await jobIDArray.map(async (profile) => {
                let value = await firebase.database().ref('jobs/' + profile).once('value', snapshot => {
                    const va = snapshot.val();
                    myJobsArray.push(snapshot.val())
                    this.setState({ myJobs: myJobsArray })

                    return false;
                })
            });

        }
        catch (e) {
            console.log('caught error', e);
            // Handle exceptions
        }
        console.log("done!!!!!!!!!!!" + this.state.myJobsArray);
    }
    //call every time when we will take something from Deck
    renderItem(job) {
        const { item, index } = job
        return (
            <View key={index}>
                <Text>
                    Title: {item.title}
                </Text>
                <Text>
                    Date: {item.date}
                </Text>
                <Text>
                    likes: {item.liked.length}
                </Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            backgroundColor='#3498db'
                            title='Details'
                            icon={{ name: 'menu' }}
                            onPress={()=> this.props.navigation.navigate('Ad', {adID: item.addid})}
                        >
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button
                            backgroundColor='#3498db'
                            title='Liked List!'
                            onPress={()=> this.props.navigation.navigate('CallList', {userLikes: item.liked, adId: item.addid})}/>
                    </View>
                </View>
            </View>
        );
    }


/*
//option whenn there is no ads
    renderNoMoreCards() {
        return (
            <Card title="No More Hot Jobs For You">
                <Text style={{ marginBottom: 10 }}>
                    Wait For The Job Call
                </Text>
                <Button
                    backgroundColor="#03A9F4"
                    title="Works You're Waiting For"
                />
            </Card>
        );
    }
*/
    render() {
        const jobsArray = this.state.myJobs.length > 0 ? this.state.myJobs : []
        //console.log('new job array',jobsArray)
        return (
            <View>
                <ScrollView horizontal={false}>
                    {jobsArray.length > 0 && <FlatList
                        data={jobsArray}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => { `key-${item.addid}` }}
                    // renderNoMoreCards={this.renderNoMoreCards}
                    />}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderWidth: 1,
        padding: 5,
        width: '50%',
        height: 40
    }
});