import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, Alert,View, } from 'react-native';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as firebase from "firebase";
import { StackNavigator } from 'react-navigation';
import Firebase from '../../Firebase/Firebase';
import DismissKeyboard from "dismissKeyboard";
//var { width, height } = Dimensions.get('window');

var userList = {
  "123":"Berman",
  "124":"Waitress",
  "125":"Private lessons",
  "126":"With a car",
  "127":"No car",
  "127":"Working from home",
  "129":"Work at night",
  "130":"Work in the morning",
  "131":"Gardening",
  "132":"Babysitter",
  "133":"Porterage",
  "134":"Warehouse workers",
  "135":"Craftsmanship",
  "136":"Shipments",
  "137":"Salesmanship",
  "138":"Cleanliness",
  "139":"Cookery",
  "140":"Fast food",
  "141":"test"

}
var selectedItems=[];
export default class TagsList extends React.Component{
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
            } catch (error) {}
        
        this.signup = this.signup.bind(this);
        this.state={
            email: '',//this.props.navigation.state.params.email,
            password: '', //this.props.navigation.state.params.password,
            fName: '',//this.props.navigation.state.params.fName,
            pNumber: '',//this.props.navigation.state.params.pNum,
            succesToCraete:false
        }
        
    }
    static navigationOptions = {
        header: null // !!! Hide Header
      }
      async signup() {
        if(selectedItems.length==0)
        {Alert.alert("Hi","Looks like you have not selected any options.")}else{
            DismissKeyboard();
            var database = firebase.database();
            try {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(function(user) {
                    this.setState({
                        succesToCraete:true
                    })
                });
                if(succesToCraete==true){
                    var userId=firebase.auth().currentUser.uid;            
                    firebase.database().ref('users/'+ userId).set({
                        full_name: this.state.fName,
                        email: this.state.email,
                        //profile_picture : imageUrl
                        phone_num: this.state.pNumber
                    });
                    Alert.alert('Welcome:)','Now you can start counting \nmoney for the weekend.. ;D');
                    //TODO : TIMEOUT? FOR WHAT??
                    setTimeout(() => {
                        this.props.navigation.navigate('HomeScreen')
                    }, 1500);
                }
                

            } catch (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(errorCode.toString());
                Alert.alert(errorMessage.toString());
                // ...
                // this.setState({
                //     response: error.toString()
                // })
                // Alert.alert(
                //     '!'+ errorMessage)
            }
        }

    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.mainView}>
                <ScrollView style={styles.tagsView}>
                    {/* <View style={styles.tagsTest}/> */}
                    <CustomMultiPicker
                        options={userList}
                        search={true} // should show search bar?
                        multiple={true} //
                        placeholder={"Search"}
                        placeholderTextColor={'#fff'}
                        returnValue={"label"} // label or value
                        callback={(res)=>
                            { 
                                if(res.length>7)
                                {
                                    Alert.alert('Hold On!','You can choose a maximum 7 options');
                                    res.splice(-1,1);

                                }
                                this.state.itemToSub=res;
                                console.log(this.state.itemToSub);
                                selectedItems=res;
                                console.log(selectedItems)
                            }} // callback, array of selected items
                        rowBackgroundColor={"#fff"}
                        rowHeight={40}
                        rowRadius={5}
                        iconColor={"#5d5f63"}
                        iconSize={30}
                        selectedIconName={"ios-checkmark-circle-outline"}
                        unselectedIconName={"ios-radio-button-off-outline"}
                        scrollViewHeight={1000}
                        selected={[]} // list of options which are selected by default
                        />
                </ScrollView>
                <TouchableOpacity style={styles.buttonView} onPress={this.signup}>
                    <Text style={styles.textView}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'stretch',
        paddingTop:24
        
    },
    tagsView:{
        backgroundColor:'#3498db',
        //flex:1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    buttonView:{
        backgroundColor:'#ffffff',
        paddingVertical:15,

    },
    textView:{
        color:'#3498db',
        fontWeight: '700',
        textAlign: 'center',
        fontSize:15

    }
    // tagsTest:{
    //     backgroundColor:'#3498db'
    // }
});