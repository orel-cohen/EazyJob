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
            Alert.alert("Hi:)\n"+"To login you should fill out email & password")
        }else{
            try {
                await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

                this.setState({
                    response: "Logged In!"
                });

                setTimeout(() => {
                    this.props.navigation.navigate('HomeScreen')
                }, 1500);

            } catch (error) {
                this.setState({
                    response: error.toString()
                })
                Alert.alert("Houston, We Have a Problem!\n"+ response)
            }
    }

    }
    
    render() {
        if (true){  //  this.state.userLoaded==false) {
        return(  
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                <Logo style={styles.loginContainer}/>
                <View style={styles.container}>
                    <TextInput
                        placeholder="email"
                        returnKeyType="next"
                        onSubmitEditing={()=> this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        //onChangeText={this.handleEmail}
                        onChangeText={(email) => this.setState({email})}
                        style={styles.input}/>
                    <TextInput
                        placeholder="password"
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        //onChangeText={this.handlePass}
                        onChangeText={(password) => this.setState({password})}
                        ref={(input)=> this.passwordInput=input}
                    />

                    <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
                <Button 
                    title="don't have account yet? SignUp"
                    onPress={()=> this.props.navigation.navigate('SignUpForm')}//this.signup}
                    
                />
            </KeyboardAvoidingView>
            
            
        );
    }else return <HomeScreen/>;
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'column'
    },
    formContainer: {
        //alignContent: 'space-between',
    },
    container: {
        padding: 15,
        alignItems:'center',
        justifyContent:'center',
       // flexDirection: 'column'
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

  });

  