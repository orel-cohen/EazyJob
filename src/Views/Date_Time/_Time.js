import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DateZona extends React.Component {
   constructor(props){
    super(props)
    this.state = {time:"00:00"}
  }
  render() {
    return (
      <View>
        <DatePicker
          style={{width: 200}}
          time={this.state.time}
          mode="time"
          format="HH:MM"
          customStyles={{
              dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
              },
              dateInput: {
              marginLeft: 36
              }
          }}
          onDateChange={(time) => {this.setState({time: time})}}
        />
      </View>
    );
  }
}