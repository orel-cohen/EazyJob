import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slides from '../Help/Slides'

const SLIDE_DATA = [
    { text: 'Chose Your Categories' },
<<<<<<< HEAD
    { text: 'Post Ad' },
=======
    { text: 'Add Ad' },
>>>>>>> 176c861a455927bf0cc6d4e83e52a158b5e6c1a5
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