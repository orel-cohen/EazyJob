import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, Linking, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';
import Deck from '../Swip/Deck'

export default class CallList extends React.Component {
    static navigationOptions = {
        title: 'Call List',
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
            name: '',
            phonenumber: '',
            //liked: this.props.params.liked,
        }
        console.log(this.props.navigation.state.params.liked);

    }






    render() {
        return false;
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