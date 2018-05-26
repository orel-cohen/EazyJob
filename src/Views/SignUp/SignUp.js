import React, {Component} from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import * as firebase from "firebase";
import { StackNavigator } from 'react-navigation';
import Firebase from '../../Firebase/Firebase';
import TagsList from '../Tags/TagsList';
import DismissKeyboard from "dismissKeyboard";
 
export default class SignUp extends React.Component{
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
            } catch (error) {}
        this.transferData=this.transferData.bind(this);
        this.state = {
            email: "",
            emailValdate:true,
            password: "",
            passwordValdate:true,
            fName:"",
            fNameValdate:true,
            pNumber:"",
            pNumberValdate:true,
            response: "",
            succesToCraete:false,
        };
    }
    static navigationOptions = ({ navigation }) => {
        //header: (props)=>(title:name)
         const { params } = navigation.state;
         //console.log(this.state.selectedSub)
        //console.log(this.props.navigation.getParam())
        //  return {
        //     title:params ? params.x : 'none'
        //  }
    };
    validate(text,type)
    {
        fName= /^([A-Z]|[a-z])([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/
        pass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        e_mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        pNumber=/^([05][0-9]{9})$/
        if (type=='email'){
            if(e_mail.test(text)){
                this.setState({
                    emailValdate:true,
                })
            }else{
                this.setState({
                    emailValdate:false,
                })
            }
        }
        else if (type=='password'){
            if(pass.test(text)){
                this.setState({
                    passwordValdate:true,
                })
            }else{
                this.setState({
                    passwordValdate:false,
                })
            }
        }
        else if (type=='fName'){
            if(fName.test(text)){
                this.setState({
                    fNameValdate:true,
                })
            }else{
                this.setState({
                    fNameValdate:false,
                })
            }
        }
        else if (type=='pNumber'){
            if(pNumber.test(text)){
                this.setState({
                    pNumberValdate:true,
                })
            }else{
                this.setState({
                    pNumberValdate:false,
                })
            }
        }
    }
   
    render(){
        return(
            <View style={styles.container}>
 
                <TextInput
                style={[styles.input,
                !this.state.emailValdate? styles.error:null]}
                placeholder="Email"
                returnKeyType="next"
                //onSubmitEditing={()=> this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(email) =>{ this.setState({email}); this.validate(email,'email')}}/>
 
                <TextInput
                style={[styles.input,
                !this.state.fNameValdate? styles.error:null]}
                placeholder="Full Name"
                returnKeyType="next"
                //onSubmitEditing={()=> this.passwordInput.focus()}
                //keyboardType=""
                //autoCapitalize="none"
                //autoCorrect={false}
                onChangeText={(fName) =>{ this.setState({fName}); this.validate(fName,'fName')}}/>
 

 
                <TextInput
                style={[styles.input,
                !this.state.pNumberValdate? styles.error:null]}
                placeholder="Phone Number"
                returnKeyType="next"
                //onSubmitEditing={()=> this.passwordInput.focus()}
                keyboardType="phone-pad"
                //autoCapitalize="none"
                //autoCorrect={false}
                onChangeText={(pNumber) =>{ this.setState({pNumber}); this.validate(pNumber,'pNumber')}}/>
 
                <TextInput
                style={[styles.input,
                !this.state.passwordValdate? styles.error:null]}
                placeholder="Password"
                returnKeyType="go"
                secureTextEntry
                ref={(input)=> this.passwordInput=input}
                onChangeText={(password) =>{ this.setState({password}); this.validate(password,'password')}}/>
                <Text> *Password with minimum eight characters at least 1 letter and 1 number  </Text>
                <Button
                onPress = {this.transferData}
                 title = 'Continue'/>
                </View>
        );
    }
    async transferData()
    {
        if(this.state.password!="" && this.state.fName!="" && this.state.email!="" && this.state.pNumber!="")
        {
            if(this.state.emailValdate==true && this.state.fNameValdate==true && this.state.passwordValdate && this.state.pNumberValdate==true)
            {
                setTimeout(() => {
                this.props.navigation.navigate('TagsList',{email:this.state.email,pNum:this.state.pNumber,password:this.state.password,fullName:this.state.fName})
            }, 100);
            }else{
                Alert.alert("Hi, littele problem","One or more of the data you entered is invalid");
            }
        }else{
            Alert.alert("Hi, littele problem","One or more empty fields");
        }
       
         
    }
    //onPress = () => {
    //    Alert.alert("OK")
//this.props.navigation.navigate('SignUpTags')
        //validation
    //}
 
}
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3498db',
        padding: 15,
        alignItems:'center',
        justifyContent:'flex-end',
    },
    input: {
      width: 300,
      height: 45,
      backgroundColor: 'rgba(255,255,255,0.8)',
      marginBottom: 12,
      color: 'rgba(0,0,0,1)',
      paddingHorizontal: 10,
    },
    buttonText:{
       color: 'rgba(0,0,0,1)',
        textAlign: 'center',
        fontWeight: '700'
       
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 15
    },  
    TextStyle:{
     fontSize: 23,
     textAlign: 'center',
     color: '#000',
  },
  error:{
    borderWidth:2,
    borderColor:'red'
    }
  });