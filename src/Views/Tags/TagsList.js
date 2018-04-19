import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as firebase from "firebase";
import { StackNavigator } from 'react-navigation';
import Firebase from '../../Firebase/Firebase'


userList = {
  "123":"Tom",
  "124":"Michael",
  "125":"Christin",
  "126":"Test",
  "127":"Orel",
  "127":"Tom1",
  "129":"Michael1",
  "130":"Christin1",
  "131":"Test1",
  "132":"Orel1",
  "133":"Tom2",
  "134":"Michael2",
  "135":"Christin2",
  "136":"Test2",
  "137":"Orel2"

}
export default class test extends React.Component{
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
            } catch (error) {}

        
    }
    static navigationOptions = {
        //header: null // !!! Hide Header
      }
    render(){
        return(
            <ScrollView style={styles.tagsView}>
                {/* <View style={styles.tagsTest}/> */}
                <CustomMultiPicker
                    options={userList}
                    search={true} // should show search bar?
                    multiple={true} //
                    placeholder={"Search"}
                    placeholderTextColor={'#fff'}
                    returnValue={"label"} // label or value
                    callback={(res)=>{ console.log(res) }} // callback, array of selected items
                    rowBackgroundColor={"#fff"}
                    rowHeight={40}
                    rowRadius={5}
                    iconColor={"#5d5f63"}
                    iconSize={30}
                    selectedIconName={"ios-checkmark-circle-outline"}
                    unselectedIconName={"ios-radio-button-off-outline"}
                    scrollViewHeight={300}
                    selected={[]} // list of options which are selected by default
                    />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    tagsView:{
        backgroundColor:'#3498db',
        flex:1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    // tagsTest:{
    //     backgroundColor:'#3498db'
    // }
});