import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView, 
  Image,
} from 'react-native';
//import * as firebase from "firebase";
//import Firebase from '../../Firebase/Firebase';
import { StackNavigator } from 'react-navigation';
//import _Date from '../Date_Time/_Date'
//import _Time from '../Date_Time/_Time'
//import TagsList from '../Tags/TagsList'
import email from 'react-native-email'
import Firebase from '../../Firebase/Firebase';
import * as firebase from "firebase";

export default class Contact_Us extends React.Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            title: '',
            message: '',
            currUserID: firebase.auth().currentUser.uid,
          };
    }

    saveTitle = (inputText) => {
        this.setState({
          title: inputText
        });
    }

    saveMessage = (inputText) => {
        this.setState({
            message: inputText
        });
    }

    async sendMail(title, message) {
        const to = ['rodrigoshiller@gmail.com']
        title = '[EasyJob] - ' + title
        message = message + '\n\nUser ID: ' + this.state.currUserID
        email(to, {
            subject: title,
            body: message,
        }).catch(console.error)
        
        
    }

    render() {

        const {navigation} = this.props;
        const userId = navigation.getParam('currUserID')
        console.log(this.props.currUserID);

        return (
            <View>
                <KeyboardAvoidingView /*style={{ flexDirection: 'row' }}*/>
                    <Text style={styles.title}>Title</Text>
                    {/*<Text>HELLO {JSON.stringify(userId)}</Text>
        <Text style={styles.title}>FU</Text>*/}
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCorrect={true}
                        style={styles.input}
                        onChangeText={this.saveTitle}
                        //value={this.state.description}
                        multiline={false}
                    />
                </KeyboardAvoidingView>

                <KeyboardAvoidingView>
                    <Text style={styles.title}>Message</Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCorrect={true}
                        style={styles.input}
                        onChangeText={this.saveMessage}
                        //value={this.state.description}
                        multiline={false}
                    />
                </KeyboardAvoidingView>

                <KeyboardAvoidingView>
                    <Button
                        title = 'Send'
                        onPress = { () => {
                            this.sendMail(this.state.title, this.state.message)
                            Keyboard.dismiss()
                            Alert.alert("Thank you for your input.\nWe will contact you ASAP.")
                            this.props.navigation.navigate('HomeScreen' ,{currUserID: userId}  )
                        }  }
                    />
                </KeyboardAvoidingView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        //flex: 1,
        //flexWrap: 'wrap',
        paddingLeft: 5,
    },

    input: {
        width: 300,
        height: 45,
        //backgroundColor: 'rgba(255,255,255,0.8)',
        marginBottom: 12,
        //color: 'rgba(0,0,0,1)',
        paddingHorizontal: 10,
        paddingBottom: 10,
      },
});