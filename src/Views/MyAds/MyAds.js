import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';
import Deck from '../Swip/Deck'

const DATA = [
    { id: 1, text: 'Job #1', boss: 'Boss #1', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 2, text: 'Job #2', boss: 'Boss #2', dStart: '01/01/0001', place: 'Home', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 3, text: 'Job #3', boss: 'Boss #3', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 4, text: 'Job #4', boss: 'Boss #4', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
    { id: 5, text: 'Job #5', boss: 'Boss #5', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 6, text: 'Job #6', boss: 'Boss #6', dStart: '01/01/0001', place: 'Home', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 11, text: 'Job #3', boss: 'Boss #3', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 111, text: 'Job #4', boss: 'Boss #4', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
    { id: 1111, text: 'Job #5', boss: 'Boss #5', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 222, text: 'Job #6', boss: 'Boss #6', dStart: '01/01/0001', place: 'Home', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 7, text: 'Job #7', boss: 'Boss #7', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 8, text: 'Job #8', boss: 'Boss #8', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];
const MyAdsData = [];

export default class MyAds extends React.Component {
    static navigationOptions = {
        title: 'My Ads',
    };
    constructor(props) {
        super(props);
        //console.ignoredYellowBox = [
        //  'Setting a timer'
        //];
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            myJobs: [],
            jobsID: []

        }
    }

    async componentWillMount() {
        console.log("1");
        jobID = '';
        try {
            console.log("2");
            //var currentUser = firebase.auth().currentUser.uid;
            await firebase.database().ref('users/').child("TL0RQUso3rQWqXZIOwR8UocN5YT2").child("ads").once('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    jobID = childSnapshot.child("ads").val();
                    this.state.jobsID.push(jobID);
                    console.log(this.state.jobsID);
                })
            })
            try {
                console.log("123");
                this.state.jobsID.forEach(profile => {
                    console.log(profile);
                     firebase.database().ref('jobs/' + profile).once('value', snapshot => {
                        this.state.myJobs.push(snapshot);
                        console.log(this.state.myJobs);
                    })
                });
                console.log("done" + this.state.myJobs);
            } catch (error) {
                console.log(error.toString())
            }        } catch (error) {
            console.log(error.toString())
        }
        //console.log("done"+ this.state.myJobs);
    }

    //call every time when we will take something from Deck
    renderItem(item) {
        return (
            <View>
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor="#03A9F4"
                    title="Show More Details"
                />
            </View>
        );
    }



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

    render() {
        return (
            <View>
                <ScrollView horizontal={false}>
                    <FlatList
                        data={this.state.myJobs}
                        renderItem={this.renderItem}
                        keyExtractor={item.state.myJobs.addid.val}
                    // renderNoMoreCards={this.renderNoMoreCards}
                    />
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

});