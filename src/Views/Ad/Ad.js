import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons, EvilIcons, Entypo } from '@expo/vector-icons';

import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';

export default class Ad extends React.Component {
<<<<<<< HEAD
  render(){
    return(
    <AdView/>
)}
=======
  static navigationOptions = {
    title: 'Ad',
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
      bossId: "",
      title: "",
      pay: "",
      city: "",
      place: "",
      date: "",
      start: "",
      end: "",
      tag1: "",
      tag2: "",
      tag3: "",
      image: "",
      remarks: "",
      favorite: "",
      liked: "",
      disliked: "",
    }
  }
  async componentWillMount() {
    var jobProfile = null;
    try {
      await firebase.database().ref('jobs/').child("-LDpVhPlyOxQ1KJcvVGL").once('value', snapshot => {
        var jobProfile = snapshot.val();
        /*console.log("Author: " + jobProfile.bossId);
        this.state.bossId = jobProfile.bossId;
        console.log("Title: " + jobProfile.city);
        console.log("asdasd: " + this.state.bossId);*/
        this.state.bossId = jobProfile.bossId;
        this.state.title = jobProfile.title;
        this.state.pay = jobProfile.pay;
        this.state.city = jobProfile.city;
        this.state.place = jobProfile.place;
        this.state.date = jobProfile.date;
        this.state.start = jobProfile.start;
        console.log("ssss: " + jobProfile.start);
        console.log(this.state.start);
        this.state.end = jobProfile.end;
        this.state.tag1 = jobProfile.tag1;
        this.state.tag2 = jobProfile.tag2;
        this.state.tag3 = jobProfile.tag3;
        this.state.image = jobProfile.image;
        this.state.remarks = jobProfile.remarks;
        this.state.liked = jobProfile.liked;
      })
    } catch (error) {
      console.log(error.toString())
    }
  }
  ///////////////////////////////////////////////
  ////need to fix: 
  ////the time (start +end)
  ////count likes
  ////user taking the user and put his name there
  //// put next to the boss name button that go to his profile
  ////image
  ////////////////////////////////////////////////
  render() {
    return (

      <View>
        <View>
          <Text> {this.state.title}</Text>
        </View>
        <View>
          <Text> Posted BY: {this.state.bossId}</Text>
        </View>
        <View>
          <Text> Salary:  {this.state.pay}</Text>
          <Text> City: {this.state.city}</Text>
          <Text> Place/Address:  {this.state.place}</Text>
          <Text> Date: {this.state.date}</Text>
          <Text> Start Time: {this.state.start}</Text>
          <Text> End Time: {this.state.end}</Text>
        </View>
        <View>
          <Text> Tags: </Text>
          <Text> {'   ' + this.state.tag1}</Text>
          <Text> {'   ' +this.state.tag2}</Text>
          <Text> {'   ' +this.state.tag3}</Text>
          <Text> {this.state.image}</Text>
          <Text> Remarks: {this.state.remarks}</Text>
          <EvilIcons name="like" size={30} />
          <Text> {this.state.liked}</Text>
        </View>
      </View>
    );
  }
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
}