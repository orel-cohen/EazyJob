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
<<<<<<< HEAD
    "Renovations": "Renovations",
    "Security": "Security/Ushers",
    "Bartender": "Bartender",
    "Animals": "Animals (Keep or Trip)",
    "Babysitter": "Babysitter",
    "Home": "Working from home",
    "Shipments": "Shipments",
    "Volunteering": "Volunteering (for free)",
    "Inventory": "Inventory counts/arrangement",
    "Porterage": "Porterage",
    "Private": "Private lessons",
    "Translate": "Translate Articles",
    "Gardening": "Gardening",
    "Cleaning": "Cleaning",
    "Kitchen": "Kitchen",
    "Events": "Events (moderator, clown) ",
    "Waiters": "Waiters",
    "Photographer": "Photographer",
    "DJ": "DJ",
    "MakeUp": "MakeUp",
    "Car": "Car owner",
    "Night": "Work in nights",
    "Weekend": "Work in weekend"

}
var selectedItems = [];
var weDoIt = false;
export default class TagsList extends React.Component {
=======
  "Renovations":"Renovations",
  "Security":"Security/Ushers",
  "Bartender":"Bartender",
  "Animals":"Animals (Keep or Trip)",
  "Babysitter":"Babysitter",
  "Home":"Working from home",
  "Shipments":"Shipments",
  "Volunteering":"Volunteering (for free)",
  "Inventory":"Inventory counts/arrangement",
  "Porterage":"Porterage",
  "Private":"Private lessons",
  "Translate":"Translate Articles",
  "Gardening":"Gardening",
  "Cleaning":"Cleaning",
  "Kitchen":"Kitchen",
  "Events":"Events (moderator, clown) ",
   "Waiters": "Waiters", 
   "Photographer":"Photographer",
    "DJ": "DJ",
    "MakeUp":"MakeUp",
  "Car":"Car owner",
  "Night":"Work in nights",
  "Weekend":"Work in weekend",
  "Other":"Other"

}
var selectedItems=[];
var weDoIt=false;
export default class TagsList extends React.Component{
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
<<<<<<< HEAD
        } catch (error) { }

        this.signup = this.signup.bind(this);
        this.state = {
=======
            } catch (error) {}
       
        this.signup = this.signup.bind(this);
        this.state={
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            fName: this.props.navigation.state.params.fullName,
            pNumber: this.props.navigation.state.params.pNum,
            //succesToCraete:false,
            //flag:false,
<<<<<<< HEAD
            itemToSub: [],
            favorite: ['0'],
            liked: ['0'],
            disliked: ['0'],
            ads: ['0']
        }


    }
    static navigationOptions = {
        header: null // !!! Hide Header
    }
    async signup() {

        DismissKeyboard();

        try {

            //var succesToCraete=0;
            console.log("mail " + this.state.email + "\n pass: " + this.state.password);
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(function (user) {
                    weDoIt = true;
=======
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
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
                    console.log("we in!");
                    //succesToCraete=true;
                    //this.setState({flag:true});
                    //console.log(this.state.flag)
                    //console.log(succesToCraete+" in create");    
                });
<<<<<<< HEAD

            console.log("res: " + weDoIt);
            //true==true
            if (true == true) {
                var database = firebase.database();
                console.log("succesToCreate");
                //print the info
                console.log("fname: " + this.state.fName)
                var userId = firebase.auth().currentUser.uid;
                console.log(userId)
                firebase.database().ref('users/' + userId).set({

                    full_name: this.state.fName,
                    email: this.state.email,
                    tags: this.state.itemToSub,
                    phone_num: this.state.pNumber,
                    favorite: this.state.favorite,
                    liked: this.state.liked,
                    disliked: this.state.disliked,
                    ads: this.state.ads
                });
                Alert.alert('Welcome:)', 'Now you can start counting \nmoney for the weekend.. ;D');
                //TODO : TIMEOUT? FOR WHAT??
                setTimeout(() => {
                    this.props.navigation.navigate('HomeScreen')
                }, 1500);
            }

        } catch (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert("", errorCode);
            Alert.alert("", errorMessage);
            //delete account if DB not succes
        }


=======
               
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
       
 
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
    }
    // if(selectedItems.length==0)
    //     {Alert.alert("Hi","Looks like you have not selected any options.")}else{
    //     }
    // }
<<<<<<< HEAD
    render() {
        const { navigate } = this.props.navigation;
        return (
=======
    render(){
        const { navigate } = this.props.navigation;
        return(
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
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
<<<<<<< HEAD
                        callback={(res) => {
                            /*if(res.length>7)
                            {
                                Alert.alert('Hold On!','You can choose a maximum 7 options');
                                res.splice(-1,1);
                               
                            }*/
                            this.state.itemToSub = res;
                            selectedItems = res;

                        }} // callback, array of selected items
=======
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
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
                        rowBackgroundColor={"#fff"}
                        rowHeight={40}
                        rowRadius={5}
                        iconColor={"#5d5f63"}
                        iconSize={30}
                        selectedIconName={"ios-checkmark-circle-outline"}
                        unselectedIconName={"ios-radio-button-off-outline"}
                        scrollViewHeight={1000}
                        selected={[]} // list of options which are selected by default
<<<<<<< HEAD
                    />
=======
                        />
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
                </ScrollView>
                <TouchableOpacity style={styles.buttonView} onPress={this.signup}>
                    <Text style={styles.textView}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
<<<<<<< HEAD
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: 24

    },
    tagsView: {
        backgroundColor: '#3498db',
=======
    mainView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'stretch',
        paddingTop:24
        
    },
    tagsView:{
        backgroundColor:'#3498db',
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
        //flex:1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
<<<<<<< HEAD
    buttonView: {
        backgroundColor: '#ffffff',
        paddingVertical: 15,

    },
    textView: {
        color: '#3498db',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 15
=======
    buttonView:{
        backgroundColor:'#ffffff',
        paddingVertical:15,

    },
    textView:{
        color:'#3498db',
        fontWeight: '700',
        textAlign: 'center',
        fontSize:15
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5

    }
    // tagsTest:{
    //     backgroundColor:'#3498db'
    // }
});