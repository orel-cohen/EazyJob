import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    KeyboardAvoidingView, 
    Button,
    TextInput, 
    TouchableOpacity,
    AppRegistry,
    dismissKeyboard,
    Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
//import { GoogleSignin } from 'react-native-google-signin';
import * as firebase from "firebase";
import DismissKeyboard from "dismissKeyboard";
import Firebase from '../../Firebase/Firebase'
import Logo from '../Logo'
import HomeScreen from '../HomeScreen/HomeScreen'



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
            } catch (error) {}//init DB
        this.getInitialView();//return if the user is connect already
        this.getInitialView = this.getInitialView.bind(this);
        this.state = {
            email: "",
            password: "",
            response: "",
            userLoaded: false,
            initialView: "null"
        };
        
        this.login = this.login.bind(this);
    }
    static navigationOptions = {
        header: null // !!! Hide Header
      }
      getInitialView() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.setState({
                    userLoaded: true,
                    initialView:"HomeScreen"})
              } else {
                // No user is signed in.
                this.setState({
                    userLoaded: false,
                    initialView:"Login"})
              }
        
    
        //   this.setState({
        //     initialView: initialView
        //   })
        });
    }
    
     async login() {

        DismissKeyboard();//down/close the keyboard
        if(this.state.email==""||this.state.password=="")
        {
            Alert.alert("Hi:)","For login you should fill out email & password\nor just SignUp:)")
        }else{
            try {
                await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                // var userId = firebase.auth().currentUser.uid;
                // var headerText;
                // firebase.database().ref('/users/'+userId).once("value").then(function(snapshot) {
                //     var data=snapshot.val();
                //     headerText= data.full_name || 'Anonymous';
                // });
                // Alert.alert(headerText);
                setTimeout(() => {
                    this.props.navigation.navigate('HomeScreen'/* ,{title:'Hi '+ headerText } */ )
                }, 1500);

            } catch (error) {
                
                Alert.alert("Houston, We Have a Problem!","User not found, check your data and try again..\nOr just SignUp:)")
            }
    }

    }
    
    render() {
        if (true){  //  this.state.userLoaded==false) {
        return(  
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                <Text style={styles.titleContainer}> EazyJob</Text> 
                <View style={styles.container}>
                    <TextInput
                        underlineColorAndroid='transparent' //for to hide underline
                        placeholder="email"
                        returnKeyType="next"
                        onSubmitEditing={()=> this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        //onChangeText={this.handleEmail}
                        onChangeText={(email) => this.setState({email})}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}/>
                    <TextInput
                        underlineColorAndroid='transparent' //for to hide underline
                        placeholder="password"
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        //onChangeText={this.handlePass}
                        onChangeText={(password) => this.setState({password})}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        ref={(input)=> this.passwordInput=input}
                    />

                    <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    
                </View>
                <Text 
                    onPress={()=> this.props.navigation.navigate('SignUpForm')}//this.signup}
                    style={styles.signupStyle}
                >
                Not a member? SignUp
                </Text>

            </KeyboardAvoidingView>
            
            
        );
    }else return <HomeScreen/>;
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex:1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flexDirection: 'column'
    },
    titleContainer: {
        paddingVertical:150, 
        fontSize: 30,
        fontWeight: 'bold',
        color:'#FFF'
        //alignContent: 'space-between',
    },
    container: {
        padding: 15,
        //alignItems:'center',
        //justifyContent:'flex-end',
       // flexDirection: 'column'
    },
    input: {
      width: 300,
      height: 45,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 20,
      color: '#FFF',
      paddingHorizontal: 10,
      
    },
    buttonText:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '700',
        paddingHorizontal: 20
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 14
    },
    signupStyle: {
        color: 'rgba(255,255,255,1)',
        fontWeight: '700',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    }

  });

  