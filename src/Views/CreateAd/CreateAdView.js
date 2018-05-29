import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView
  } from 'react-native';
import { StackNavigator } from 'react-navigation';

import _Date from '../Date_Time/_Date'
import _Time from '../Date_Time/_Time'
import TagsList from '../Tags/TagsList'
import styles from './CreateAdStyle'
export default class CreateAdView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        description: '',
        date: '06-06-2016',
        time_start: '06:06',
        time_end: '12:12'
      }
    }
  
    saveTitle = (inputText) => {
      this.setState({
        title: inputText
      });
    }
    saveDescription = (inputText) => {
      this.setState({
        description: inputText
      });
    }
  
    render() {
      return (
        <View style={styles.container2}>
          <ScrollView>
            <Text style={styles.MainTitle}>Create Ad</Text>
  
            {/*Title of the Ad*/}
            <KeyboardAvoidingView style={styles.container}>
              <Text>Title</Text>
              <View style={styles.input}>
                <TextInput
                  returnKeyType="next"
                  keyboardType="default"
                  autoCorrect={true}
                  style={styles.input}
                  onChangeText={this.saveTitle}
                  value={this.state.title}
                  maxLength={30}
                />
              </View>
            </KeyboardAvoidingView>
  
            {/*Ad Description*/}
            <KeyboardAvoidingView style={styles.container}>
              <Text>Description</Text>
              <View style={styles.input}>
                <TextInput
                  returnKeyType="next"
                  keyboardType="default"
                  autoCorrect={true}
                  style={styles.input}
                  onChangeText={this.saveDescription}
                  value={this.state.description}
                  multiline={true}
                />
              </View>
            </KeyboardAvoidingView>
  
            {/*The shifts beginning date*/}
            <KeyboardAvoidingView style={styles.container}>
              <Text>Date</Text>
              <_Date />
            </KeyboardAvoidingView>
  
            {/*Start & Ending hours for the shift*/}
            <KeyboardAvoidingView style={styles.container}>
              <Text>Hours</Text>
  
              <View style={{ flexDirection: 'row' }}>
                <Text>Starts</Text>
                <_Time />
              </View>
  
              <View style={{ flexDirection: 'row' }}>
                <Text>Ends</Text>
                <_Time />
              </View>
            </KeyboardAvoidingView>
  
            {/*Tag Selection Section*/}
            <KeyboardAvoidingView style={styles.container}>
            {//<TagsList />
            }
              
            </KeyboardAvoidingView>
  
            <View style={styles.container}>
              <Button
                title="Post"
                onPress={() => this.props.Text}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }