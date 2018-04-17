import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DateZona extends React.Component {
   constructor(props){
    super(props)
    this.state = {date:"23-03-2018"}
  }
  render() {
    return (
      <View>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          format="DD-MM-YYYY"
          showIcon={false}
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
          onDateChange={(date) => {this.setState({date: date})}}
        />
      </View>
    );
  }
}