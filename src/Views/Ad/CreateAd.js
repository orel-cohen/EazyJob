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

//let ad ={
//title:'',
//description:'',
//date:'',
//time_start:'',
//time_end:''
//}

export default class Ad extends React.Component {
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
            {<TagsList />
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

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: 300,
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  container2: {
    flex: 2,
    backgroundColor: 'rgb(91, 85, 142)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    flex: 2,
    height: 42
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
    color: 'rgba(0,0,0,1)',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  MainTitle: {
    flex: 2,
    fontSize: 50,
    fontWeight: '700',
    color: 'rgb(242, 193, 31)',
  },
});
