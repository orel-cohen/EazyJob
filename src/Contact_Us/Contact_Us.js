import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView, 
  Image,
} from 'react-native';
//import * as firebase from "firebase";
//import Firebase from '../../Firebase/Firebase';
import { StackNavigator } from 'react-navigation';
//import _Date from '../Date_Time/_Date'
//import _Time from '../Date_Time/_Time'
//import TagsList from '../Tags/TagsList'
import Routes from '../../App';


export default class Contact_Us extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            message: '',
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

    sendMail = (title, message) =>
    {

    }

    render() {
        return (
            <View>
                <View /*style={{ flexDirection: 'row' }}*/>
                    <Text style={styles.title}>Title</Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCorrect={true}
                        style={styles.input}
                        onChangeText={this.saveTitle}
                        //value={this.state.description}
                        multiline={false}
                    />
                </View>

                <View>
                    <Text style={styles.title}>Message</Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCorrect={true}
                        style={styles.input}
                        onChangeText={this.saveTitle}
                        //value={this.state.description}
                        multiline={false}
                    />
                </View>

                <View>
                    <Button
                        title = 'Send'
                        onPress = { () =>  this.sendMail(this.state.title, this.state.message) }
                    />
                </View>

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