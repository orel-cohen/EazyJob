import React, { Component } from 'react';
import { View, Animated, StyleSheet,Dimensions, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Button, Rating } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Ratings extends React.Component {
    static navigationOptions = {
        title: 'Rating',
    };
    
    constructor(props) {
        super(props);
        console.disableYellowBox = true
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            pendingUsers : [],
            pendingJobs : [],
            currentUserId : firebase.auth().currentUser.uid,
            ratings : []
        }

        this.loadPendingWorkers = this.loadPendingWorkers.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.initialRating = this.initialRating.bind(this)
        this.RateUser = this.RateUser.bind(this)
    }

    async componentDidMount() {
        await this.loadPendingWorkers();
    }

    async loadPendingWorkers() {
        let uid = this.state.currentUserId
        let users = []
        let jobs = []
        let _ratings = []

        let va = await firebase.database().ref().once('value', snapshot => {
            let jobIds = []
            let userIds = []
            let userSnapshot = snapshot.child('users')
            let jobSnapshot = snapshot.child('jobs')

            snapshot.child('users').child(uid).child('toRate').forEach(childSnapshot => {

                let userId = childSnapshot.child('ratedUserId').val()
                let jobId = childSnapshot.child('jobId').val()

                if(childSnapshot.val() != "0") {
                    let user = userSnapshot.child(userId).val()
                    let job = jobSnapshot.child(jobId).val()
                    jobs.push(job)
                    users.push(user)
                    _ratings.push(0)
                }
            })
        })

        this.setState({
            pendingUsers: users,
            pendingJobs: jobs,
            ratings: _ratings,
        })
    }

    initialRating(score, index) {
        console.log('index: ', index)
        let rateArray = this.state.ratings
        rateArray[index] = score
        this.setState({ratings : rateArray})
        console.log(rateArray)

        let user = this.state.pendingUsers[index]
        let job = this.state.pendingJobs[index]
        
        firebase.database().ref('users/').child(user.userId + '/isRated').child(job.addid).child('rate').set(score)
        firebase.database().ref('users/').child(this.state.currentUserId + '/isRated').child(job.addid).child('rate').set(score)
    }

    async RateUser(index) {
        let users = this.state.pendingUsers
        let jobs = this.state.pendingJobs
        let newRating = this.state.ratings[index]
        
        let user = this.state.pendingUsers[index]
        let job = this.state.pendingJobs[index]

        users.splice(index, 1)
        jobs.splice(index, 1)
        this.setState({
            pendingUsers : users,
            pendingJobs : jobs,
        })

        let sum = 0
        let amount = 0
        let va = await firebase.database().ref('users/').child(user.userId).once('value', snapshot => {
            sum = snapshot.child('rating/sum').val()
            amount = snapshot.child('rating/amount').val()
        })
        sum = sum + newRating
        amount++

        var updates = {}
        updates['users/' + user.userId + '/rating/sum'] = sum
        updates['users/' + user.userId + '/rating/amount'] =amount
        firebase.database().ref().update(updates)

        firebase.database().ref('users/').child(user.userId + '/isRated').child(job.addid).child('raterId').set(this.state.currentUserId)
        firebase.database().ref('users/').child(user.userId + '/isRated').child(job.addid).child('jobId').set(job.addid)
        firebase.database().ref('users/').child(user.userId + '/toRate').child(this.state.currentUserId).remove()

        firebase.database().ref('users/').child(this.state.currentUserId + '/isRated').child(job.addid).child('raterId').set(this.state.currentUserId)
        firebase.database().ref('users/').child(this.state.currentUserId + '/isRated').child(job.addid).child('jobId').set(job.addid)
        firebase.database().ref('users/').child(this.state.currentUserId + '/toRate').child(user.userId ).remove()
        //ref = firebase.database().ref('users/').child(uid + '/' + where).child(jobID).set(jobID)
        //ref = firebase.database().ref('jobs/').child(jobID + '/favorite').child(uid).remove()

    }

    renderItem(worker) {
        const { item, index } = worker
        let job = this.state.pendingJobs
        return(
            <View key={index}>
                <View>
                    <Text>
                        job: {job[index].title}
                    </Text>
                    <Text>
                        user: {item.full_name}
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Rating
                        //showRating
                        type="star"
                        fractions={0}
                        //startingValue={0}
                        ratingCount={5}
                        //readonly
                        imageSize={(SCREEN_WIDTH/10)}
                        onFinishRating={(score) => this.initialRating(score, index)}
                        style={{ paddingVertical: 10 }}
                    />

                    <Button
                        title="Rate User"
                        onPress={() => this.RateUser(index)}
                    />
                </View>
            </View>
        )
    }

    render() {
        let users = this.state.pendingUsers
        return (
            <View >
                <ScrollView horizontal={false}>
                    {users.length > 0 && <FlatList
                        data={users}
                        extraData={this.state}
                        renderItem={this.renderItem}
                        keyExtractor={(worker, index) => { `key-${worker.userId}` }}
                    // renderNoMoreCards={this.renderNoMoreCards}
                    />}
                </ScrollView>
            

                {/*<View>
                    <Button
                        title="Confirm Workers"
                        onPress={() => this.confirmWorkers()}
                    />
                </View>*/}
            </View>
        )
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