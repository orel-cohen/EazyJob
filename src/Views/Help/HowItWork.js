<<<<<<< HEAD
import React, {Component} from 'react';
=======
import React, { Component } from 'react';
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
import { Text, View } from 'react-native';
import Slides from '../Help/Slides'

const SLIDE_DATA = [
<<<<<<< HEAD
    { text: 'Chose your categories'},
    { text: 'Swip right the jobs you like'},
    { text: 'Talk with the boss'},
    { text: 'Get your odd money'}
];

export default class HowItWork extends React.Component{

    render() {
        return (
                <Slides data={SLIDE_DATA}/>
=======
    { text: 'Chose your categories' },
    { text: 'Swip right the jobs you like' },
    { text: 'Talk with the boss' },
    { text: 'Get your odd money' }
];

export default class HowItWork extends React.Component {

    render() {
        return (
            <Slides data={SLIDE_DATA} />
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
        )
    }
}