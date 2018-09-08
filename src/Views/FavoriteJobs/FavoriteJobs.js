
import React from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons, Entypo, } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';


const DATA = [
    { "bossId": "x1PQdlBeCafCByhrUPcvF4Elv693", "title": "Private Baby Porterage", "city": "Bnei Brak - Givat Shmuel", "pay": "200", "date": "17-06-2018", "start": "14:50" },
    { "bossId": "TL0RQUso3rQWqXZIOwR8UocN5YT2", "title": "Haim", "city": "Beer Sheva Area", "pay": "35", "date": "21-06-20118", "start": "15:30" },
    { "bossId": "TL0RQUso3rQWqXZIOwR8UocN5YT2", "title": "Dog Walker", "city": "Haifa Area", "pay": "50", "date": "15-06-2018", 'start': "12:27" },
]

export default class FavoriteJobs extends React.Component {
    static navigationOptions = {
        title: 'My Favorite Jobs',
    };
    constructor(props) {
        super(props);
        console.disableYellowBox = true
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            myFavoiteJobs: [],
            jobsID: [],
            currentUserId: firebase.auth().currentUser.uid,
            test: '',
        }

        this.loadData = this.loadData.bind(this)
        this.loadJobs = this.loadJobs.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.showDetails = this.showDetails.bind(this)
        this.moveJob = this.moveJob.bind(this)
    }
    //componentWillMount
    async componentDidMount() {
        jobID = ''
        await this.loadData();
    }
    async loadData() {
        let uid = this.state.currentUserId
        let jobIDArray = []
        try {
            let value = await firebase.database().ref('users/').child(uid).child("favorite").once('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.val() != "0") {
                        jobID = childSnapshot.val()
                        jobIDArray.push(jobID);
                    }
                })
            })
            console.log('jobIDArray: ', jobIDArray)
            this.setState({ jobsID: jobIDArray })
            await this.loadJobs()

        } catch (error) {
            console.log('caught error', e)
        }
    }

    async loadJobs() {
        let jobIDArray = this.state.jobsID
        let myJobsArray = [];
        try {
            await jobIDArray.map(async (id) => {
                let value = await firebase.database().ref('jobs/' + id).once('value', snapshot => {
                    const va = snapshot.val();
                    console.log('va: ', va);
                    myJobsArray.push(va);
                    console.log('myJobsArray: ', myJobsArray)
                    this.setState({ myFavoiteJobs: myJobsArray })

                    return false;
                })
            })

        }
        catch (e) {
            console.log('caught error', e);
        }
    }

   /* async GetFavoriteID(){
        await firebase.database().ref('users/').child("TL0RQUso3rQWqXZIOwR8UocN5YT2").child("favorite").once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                jobID = childSnapshot.val();
                console.log(jobID);
                this.state.jobsID.push(jobID);
            })
        })
        return jobsID;
    }
    async FindDetails() {*/

    // "where" refers to where to do the operation - "liked" or "disliked"
    async moveJob(job, where) {
        uid = this.state.currentUserId
        jobID = job.addid

        ref = firebase.database().ref('users/').child(uid + '/' + where).child(jobID).set(jobID)
        ref = firebase.database().ref('users/').child(uid + '/favorite').child(jobID).remove()

        ref = firebase.database().ref('jobs/').child(jobID + '/' + where).child(uid).set(uid)
        ref = firebase.database().ref('jobs/').child(jobID + '/favorite').child(uid).remove()

        let jobs = this.state.myFavoiteJobs
        let index = jobs.indexOf(job)
        console.log('index: ', index)
        if (index != -1) {
            jobs.splice(index, 1)
        }
        this.setState({
            myFavoiteJobs: jobs,
        })
    }

    async showDetails(job) {
        let id = job.addid + ''
        console.log('id: ', id)
        this.props.navigation.navigate('Ad', { adID: id })
    }

    renderItem(job) {
        const { item, index } = job
        console.log('job: ', job)
        console.log('itemID: ', item.addid)
        console.log('index: ', index)
        return (
            <View key={index}>
                <View style={styles.cardStyle}>
                    <View style={styles.containerStyle}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTextStyle}>
                                Title: {item.title}
                            </Text>
                            <Text style={styles.headerTextStyle}>
                                Publish By: {item.bossName/*() => this.props.getBossName(item)*/}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTextStyle}>
                                City: {item.city}
                            </Text>
                            <Text style={styles.headerTextStyle}>
                                Pay: {item.pay}
                            </Text>
                            <Text style={styles.headerTextStyle}>
                                Date: {item.date}
                            </Text>
                            <Text style={styles.headerTextStyle}>
                                Start Time: {item.start}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={styles.headerContainer}>
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <Button
                                        onPress={() => this.moveJob(item, 'disliked')}
                                        backgroundColor='red'
                                        title='Bye!'
                                        icon={{ name: 'close' }}

                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        onPress={() => this.showDetails(item)}
                                        backgroundColor='#3498db'
                                        title='Details'
                                        icon={{ name: 'menu' }}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        onPress={() => this.moveJob(item, 'liked')}
                                        backgroundColor='green'
                                        title='Work!'
                                        width='33%'
                                        icon={{ name: 'check' }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const jobsArray = this.state.myFavoiteJobs
        console.log('jobsArray: ', jobsArray)
        return (
            <View>
                <ScrollView horizontal={false}>
                    {jobsArray.length > 0 && <FlatList
                        data={jobsArray}
                        renderItem={this.renderItem}
                        // renderNoMoreCards={this.renderNoMoreCards}
                        keyExtractor={(item, index) => { `key-${item.addid}` }}
                    />}
                </ScrollView>
            </View>
        );
    }

};

const styles = {
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
        width: '33%',
        height: 40
    }
};