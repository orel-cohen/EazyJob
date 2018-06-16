import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slides from '../Help/Slides'

const SLIDE_DATA = [
    { text: 'Chose Your Categories' },
    { text: 'Add Ad' },
    { text: 'Move To Favorites Interesting Jobs' },
    { text: 'Submit A Request To Work' },
    { text: 'Select Employees' },
    { text: 'And Began To Cooperate' }
];

export default class HowItWork extends React.Component {

    render() {
        return (
            <Slides data={SLIDE_DATA} />
        )
    }
}