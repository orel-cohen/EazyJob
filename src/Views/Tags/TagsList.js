import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import CustomMultiPicker from "react-native-multiple-select-list";
import { StackNavigator } from 'react-navigation';
import Firebase from '../../Firebase/Firebase';
import DismissKeyboard from "dismissKeyboard";
import * as firebase from "firebase";
//var { width, height } = Dimensions.get('window');

//order the list from addad.js
var userList = {
  "Renovations":"Renovations",
  "Security/Ushers":"Security/Ushers",
  "Bartender":"Bartender",
  "Animals (Keep or Trip)":"Animals (Keep or Trip)",
  "Babysitter":"Babysitter",
  "Working from home":"Working from home",
  "Shipments":"Shipments",
  "Volunteering (for free)":"Volunteering (for free)",
  "Inventory counts/arrangement":"Inventory counts/arrangement",
  "Porterage":"Porterage",
  "Private lessons":"Private lessons",
  "Translate Articles":"Translate Articles",
  "Gardening":"Gardening",
  "Cleaning":"Cleaning",
  "Kitchen":"Kitchen",
  "Events (moderator, clown)":"Events (moderator, clown)",
   "Waiters": "Waiters", 
   "Photographer":"Photographer",
    "DJ": "DJ",
    "MakeUp":"MakeUp",
  "Car owner":"Car owner",
  "Work in nights":"Work in nights",
  "Work in weekend":"Work in weekend",
  "Other":"Other"

}
var selectedItems=[];
var weDoIt=false;
export default class TagsList extends React.Component{
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
            } catch (error) {}
       
        this.signup = this.signup.bind(this);
        this.state={
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            fName: this.props.navigation.state.params.fullName,
            pNumber: this.props.navigation.state.params.pNum,
            //succesToCraete:false,
            //flag:false,
            itemToSub:[],
            favorite: ['0'],
            liked:['0'],
            disliked:['0'],
            ads:['0']
        }
       
 
    }
    static navigationOptions = {
        header: null // !!! Hide Header
      }
    async signup() {
       
            DismissKeyboard();
           
            try {
               
                //var succesToCraete=0;
                console.log("mail "+this.state.email+ "\n pass: "+this.state.password);
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(function(user) {
                    weDoIt=true;
                    console.log("we in!");
                    //succesToCraete=true;
                    //this.setState({flag:true});
                    //console.log(this.state.flag)
                    //console.log(succesToCraete+" in create");    
                });
               
                console.log("res: "+weDoIt);
                //true==true
                if(true==true){
                    var database = firebase.database();
                    console.log("succesToCreate");
                    //print the info
                    console.log("fname: "+this.state.fName)
                    var userId=firebase.auth().currentUser.uid;
                    console.log(userId)            
                    firebase.database().ref('users/'+ userId).set({
                       
                        full_name: this.state.fName,
                        email: this.state.email,
                        tags:this.state.itemToSub,
                        phone_num: this.state.pNumber,
                        //favorite: this.state.favorite,
                        //liked: this.state.liked,
                        //disliked:this.state.disliked,
                        //ads:this.state.ads
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
                Alert.alert("",errorCode);
                Alert.alert("",errorMessage);
                //delete account if DB not succes
            }
       
 
    }
    // if(selectedItems.length==0)
    //     {Alert.alert("Hi","Looks like you have not selected any options.")}else{
    //     }
    // }
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
                                /*if(res.length>7)
                                {
                                    Alert.alert('Hold On!','You can choose a maximum 7 options');
                                    res.splice(-1,1);
                                   
                                }*/
                                this.state.itemToSub=res;
                                selectedItems=res;
                               
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