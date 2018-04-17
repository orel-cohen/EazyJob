import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as firebase from "firebase";
import { StackNavigator } from 'react-navigation';
import Firebase from '../../Firebase/Firebase'


userList = {
  "123":"Tom",
  "124":"Michael",
  "125":"Christin",
  "126":"Test",
  "127":"Orel"

}
export default class test extends React.Component{
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
            } catch (error) {}

        
    }
    static navigationOptions = {
        header: null // !!! Hide Header
      }
    render(){
        return(
            <View style={styles.tagsView}>
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
                    selected={[1,2]} // list of options which are selected by default
                    />
            </View>
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