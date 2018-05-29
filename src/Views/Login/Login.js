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
    Alert,
    Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
//import { GoogleSignin } from 'react-native-google-signin';
import * as firebase from "firebase";
import DismissKeyboard from "dismissKeyboard";
import Firebase from '../../Firebase/Firebase';
import Logo from '../Logo';
import HomeScreen from '../HomeScreen/HomeScreen';


var provider = new firebase.auth.GoogleAuthProvider();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }//init DB
        this.getInitialView();//return if the user is connect already
        this.getInitialView = this.getInitialView.bind(this);
        this.state = {
            email: "",
            password: "",
            emailValdate: true,
            passwordValdate: true,
            response: "",
            userLoaded: false,
            initialView: "null"
        };

        this.login = this.login.bind(this);
<<<<<<< HEAD
        this.signInWithGoogle=this.signInWithGoogle.bind(this);
    }
    signInWithGoogle()
    {
=======
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
    }
    signInWithGoogle() {
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
        console.log("we in!");
        //Alert.alert("Hi:)","SignUp with Google is currently unavailable and will be available soon")

        // firebase.auth().signInWithPopup(provider).then(function(result) {
        //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        //     // ...
        //   }).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     Alert.alert(errorMessage);
        //     // ...
        //   });
    }
    validate(text, type) {
        pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        e_mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (type == 'email') {
            if (e_mail.test(text)) {
                this.setState({
                    emailValdate: true,
                })
            } else {
                this.setState({
                    emailValdate: false,
                })
            }
        }
        else if (type == 'password') {
            if (pass.test(text)) {
                this.setState({
                    passwordValdate: true,
                })
            } else {
                this.setState({
                    passwordValdate: false,
                })
            }
        }
    }

    static navigationOptions = {
        header: null // !!! Hide Header
<<<<<<< HEAD
      }

      getInitialView() {
=======
    }

    getInitialView() {
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.setState({
                    userLoaded: true,
                    initialView: "HomeScreen"
                })
            } else {
                // No user is signed in.
                this.setState({
                    userLoaded: false,
                    initialView: "Login"
                })
            }


            //   this.setState({
            //     initialView: initialView
            //   })
        });
    }

    async login() {

        DismissKeyboard();//down/close the keyboard
        if (this.state.email == "" || this.state.password == "") {
            Alert.alert("Hi:)", "For login you should fill out email & password\nor just SignUp:)")
        } else {
            try {
                await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                // var userId = firebase.auth().currentUser.uid;
                // var headerText;
                // firebase.database().ref('/users/'+userId).once("value").then(function(snapshot) {
                //     var data=snapshot.val();
                //     headerText= data.full_name || 'Anonymous';
                // });
                var database = firebase.database();
                var userId = firebase.auth().currentUser.uid;
<<<<<<< HEAD
                var username="empty"
                firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
                    username = (snapshot.val() && snapshot.val().full_name) || 'Anonymous';
                    //console.log(username+" login")
                    //this.props.navigation.setParams({otherParam:username+'!'})
                      // ...
                });
                setTimeout(() => {
                    this.props.navigation.navigate('HomeScreen' ,{currUserID: userId}  )
=======
                var username = "empty"
                firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
                    username = (snapshot.val() && snapshot.val().full_name) || 'Anonymous';
                    console.log(username + " login")
                    //this.props.navigation.setParams({otherParam:username+'!'})
                    // ...F
                });
                setTimeout(() => {
                    this.props.navigation.navigate('HomeScreen', { namePar: username })
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
                }, 1500);

            } catch (error) {

                Alert.alert("Houston, We Have a Problem!", "User not found, check your data and try again..\nOr just SignUp:)")
            }
        }

    }

    render() {
        const { navigate } = this.props.navigation;
<<<<<<< HEAD
        if (true){  //  this.state.userLoaded==false) {
        return(  
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                <Text style={styles.titleContainer}> EazyJob</Text> 
                <View style={styles.container}>
                    <TextInput
                        style={[styles.input,
                        !this.state.emailValdate? styles.error:null]}
                        underlineColorAndroid='transparent' //for to hide underline
                        placeholder="email"
                        returnKeyType="next"
                        onSubmitEditing={()=> this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        //onChangeText={this.handleEmail}
                        onChangeText={(email) =>{ this.setState({email}); this.validate(email,'email')}}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        />
                    <TextInput
                        style={[styles.input,
                        !this.state.passwordValdate? styles.error:null]}
                        underlineColorAndroid='transparent' //for to hide underline
                        placeholder="password"
                        returnKeyType="go"
                        secureTextEntry
                        //onChangeText={this.handlePass}
                        onChangeText={(password) =>{ this.setState({password}); this.validate(password,'password')}}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        ref={(input)=> this.passwordInput=input}
                    />

                    <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    
                </View>
                <Text 
                    onPress={()=> this.props.navigation.navigate('SignUpForm',{selectedSub:"none"})}//this.signup}
                    style={styles.signupStyle}
                >
                Not a member? SignUp
                </Text>
                <TouchableOpacity onPress={this.signInWithGoogle}>
                    <Image 
                    source={require('../../Assets/google.png')}/>
                </TouchableOpacity>
                       
            </KeyboardAvoidingView>
            
            
        );
    }else return <HomeScreen/>;
=======
        if (true) {  //  this.state.userLoaded==false) {
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                    <Text style={styles.titleContainer}> EazyJob</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input,
                            !this.state.emailValdate ? styles.error : null]}
                            underlineColorAndroid='transparent' //for to hide underline
                            placeholder="email"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            //onChangeText={this.handleEmail}
                            onChangeText={(email) => { this.setState({ email }); this.validate(email, 'email') }}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                        />
                        <TextInput
                            style={[styles.input,
                            !this.state.passwordValdate ? styles.error : null]}
                            underlineColorAndroid='transparent' //for to hide underline
                            placeholder="password"
                            returnKeyType="go"
                            secureTextEntry
                            //onChangeText={this.handlePass}
                            onChangeText={(password) => { this.setState({ password }); this.validate(password, 'password') }}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            ref={(input) => this.passwordInput = input}
                        />

                        <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>

                    </View>
                    <Text
                        onPress={() => this.props.navigation.navigate('SignUp', { selectedSub: "none" })}//this.signup}
                        style={styles.signupStyle}
                    >
                        Not a member? SignUp
                </Text>
                    <TouchableOpacity onPress={this.signInWithGoogle}>
                        <Image
                            source={require('../../Assets/google.png')} />
                    </TouchableOpacity>

                </KeyboardAvoidingView>


            );
        } else return <HomeScreen />;
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flexDirection: 'column'
    },
    titleContainer: {
        paddingVertical: 150,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF'
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
    buttonText: {
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
    },
    error: {
        borderWidth: 2,
        borderColor: 'red'
    }
});

