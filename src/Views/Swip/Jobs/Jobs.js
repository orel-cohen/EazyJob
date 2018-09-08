import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

import * as firebase from "firebase";

import Deck from '../Deck'

export default class Jobs extends React.Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            jobs: this.props.navigation.state.params.jobs
        }

        this.moveJob = this.moveJob.bind(this)
        userId = firebase.auth().currentUser.uid;

    }

    //call every time when we will take something from Deck
    renderCard(item) {
        return (
            <Card
                key={item.child("id").val()}
                title={item.child("title").val()}>
                <Text>
                    {item.child("bossid").val()}
                </Text>
                <Text>
                    title: {item.child("title").val()}
                </Text>
                <Text>
                    Date: {item.child("date").val()}
                </Text>
                <Text>
                    Where: {item.child("place").val()}
                </Text>
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor="#03A9F4"
                    title="Show More Details"
                />
            </Card>
        );
    }

    /*favoriteJob(item) {
        jobID = item.child("addid").val()
        ref = firebase.database().ref('users/').child(userId + '/favorite').push(jobID)
        ref.set(jobID)
        ref = firebase.database().ref('jobs/').child(jobID + '/favorite').push(userId)
        ref.set(userId)
    }*/

    moveJob(item, where) {
        jobID = item.child("addid").val()
        /*ref = firebase.database().ref('users/').child(userId + '/disliked').push(jobID)
        ref.set(jobID)
        ref = firebase.database().ref('jobs/').child(jobID + '/disliked').push(userId)
        ref.set(userId)*/

        ref = firebase.database().ref('users/').child(userId + '/' + where).child(jobID).set(jobID)

        ref = firebase.database().ref('jobs/').child(jobID + '/' + where).child(userId).set(userId)
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
        const jobsData = this.state.jobs;
        return (
            <View style={styles.container}>
                <Deck
                    data={jobsData}//{DATA}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.moveJob(job, 'favorite')}
                    onSwipeLeft={job => this.moveJob(job, 'disliked')}
                    keyProp="addid"
                />
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