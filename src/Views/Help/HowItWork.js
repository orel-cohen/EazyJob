import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slides from '../Help/Slides'

const SLIDE_DATA = [
    { text: 'Chose Your Categories' },
    { text: 'Post Ad' },
    { text: 'Move To Favorites\nInteresting Jobs' },
    { text: 'Submit A Request To Work' },
    { text: 'Select Employees' },
    { text: 'And Begin To Cooperate' }
];

export default class HowItWork extends React.Component {

    render() {
        return (
            <Slides data={SLIDE_DATA} />
        )
    }
}