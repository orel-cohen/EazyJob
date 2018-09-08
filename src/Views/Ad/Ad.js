import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons, EvilIcons, Entypo } from '@expo/vector-icons';

import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';

export default class Ad extends React.Component {
  static navigationOptions = {
    title: 'Ad',
  };
  constructor(props) {
    super(props);
    console.disableYellowBox = true
    try {
      Firebase.initialise();
    } catch (error) { }
    this.state = {
      bossName: "",
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
      favorite: [],
      liked: [],
      disliked: [],
      adID: this.props.navigation.state.params.adID,
    }
  }
  async componentWillMount() {
    var jobProfile = null;
    let id = this.state.adID
    console.log('this.state.adID: ',id)
    try {
      await firebase.database().ref('jobs/').child(id).once('value', snapshot => {
        jobProfile = snapshot.val();
        console.log('jobProfile: ',jobProfile)
        /*console.log("Author: " + jobProfile.bossId);
        this.state.bossId = jobProfile.bossId;
        console.log("Title: " + jobProfile.city);
        console.log("asdasd: " + this.state.bossId);*/
        this.setState({
          bossName: jobProfile.bossName,
          title: jobProfile.title,
          pay: jobProfile.pay,
          city: jobProfile.city,
          place: jobProfile.place,
          date: jobProfile.date,
          start: jobProfile.start,
          end: jobProfile.end,
          tag1: jobProfile.tag1,
          tag2: jobProfile.tag2,
          tag3: jobProfile.tag3,
          image: jobProfile.image,
          remarks: jobProfile.remarks,
          //favorite: jobProfile.favorite,
          //liked: jobProfile.liked,
          //disliked: jobProfile.disliked,
        })
        console.log(this.state)
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
          <Text> Remarks: </Text>
          <Text> {'   ' + this.state.remarks}</Text>
          <EvilIcons name="like" size={30} />
          <Text> {this.state.liked}</Text>
        </View>
      </View>
    );
  }
}