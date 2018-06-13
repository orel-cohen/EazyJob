import React from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons, Entypo, } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';
import { Button } from 'react-native-elements'


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

export default class FavoriteJobs extends React.Component {
    static navigationOptions = {
        title: 'My Favorite Jobs',
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
            myFavoiteJobs: [],
            jobsID: []

        }
    }
    async componentWillMount() {
        console.log("1");
        jobID = '';
        try {
            console.log("2");
            //var currentUser = firebase.auth().currentUser.uid;
            await firebase.database().ref('users/').child("TL0RQUso3rQWqXZIOwR8UocN5YT2").child("favorite").once('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    jobID = childSnapshot.val();
                    console.log(jobID);
                    this.state.jobsID.push(jobID);
                })
            })
            console.log("123123"+this.state.jobsID);

            /*try {
                console.log("123");
                this.state.jobsID.forEach(profile => {
                    console.log(profile);
                    firebase.database().ref('jobs/' + profile).once('value', snapshot => {
                        this.state.myFavoiteJobs.push(snapshot);
                        console.log(this.state.myFavoiteJobs);
                    })
                });
                console.log("done" + this.state.myFavoiteJobs);
            } catch (error) {
                console.log(error.toString())
            }*/
        } catch (error) {
            console.log(error.toString())
        }
    }
    async FindDetails() {

    }
    renderItem(item) {
        return (
            <View style={styles.cardStyle}>
                <View style={styles.containerStyle}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTextStyle}>Title: </Text>
                        <Text style={styles.headerTextStyle}>Publish By: </Text>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTextStyle}>City: </Text>
                        <Text style={styles.headerTextStyle}>Pay: </Text>
                        <Text style={styles.headerTextStyle}>Date: </Text>
                        <Text style={styles.headerTextStyle}>Start Time: </Text>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <View style={styles.headerContainer}>
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button
                                    backgroundColor='red'
                                    title='Bye!'
                                    icon={{ name: 'close' }}

                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    backgroundColor='#3498db'
                                    title='Details'
                                    icon={{ name: 'menu' }}
                                >
                                </Button>
                            </View>
                            <View style={styles.button}>
                                <Button backgroundColor='green'
                                    title='Work!'
                                    width='33%'
                                    icon={{ name: 'check' }}
                                >
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <ScrollView horizontal={false}>
                    <FlatList
                        data={DATA}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                    // renderNoMoreCards={this.renderNoMoreCards}
                    />
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