import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

import Deck from '../Deck'

const DATA = [
    { id: 1, text: 'Job #1', boss: 'Boss #1', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 2, text: 'Job #2', boss: 'Boss #2', dStart: '01/01/0001', place: 'Home', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 3, text: 'Job #3', boss: 'Boss #3', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 4, text: 'Job #4', boss: 'Boss #4', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
    { id: 5, text: 'Job #5', boss: 'Boss #5', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 6, text: 'Job #6', boss: 'Boss #6', dStart: '01/01/0001', place: 'Home', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 7, text: 'Job #7', boss: 'Boss #7', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 8, text: 'Job #8', boss: 'Boss #8', dStart: '01/01/0001', place: 'Home', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default class Jobs extends React.Component {

    //call every time when we will take something from Deck
    renderCard(item) {
        return (
            <Card
                key={item.id}
                title={item.text}>
                <Image source={{ uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' }} />
                <Text>
                    {item.boss}
                </Text>
                <Text>
                    title={item.text}
                </Text>
                <Text>
                    Date: {item.dStart}
                </Text>
                <Text>
                    Where: {item.place}
                </Text>
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor="#03A9F4"
                    title="Show More Details"
                />
            </Card>
        );
    }


    renderNoMoreCards() {
        return (
            <Card title="No More Hot Jobs For You">
                <Text style={{ marginBottom: 10 }}>
                    Wait For The Job Call
                </Text>
                <Button
                    backgroundColor="#03A9F4"
                    title="Works You're Waiting For"
                />
            </Card>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Deck
                    data={DATA}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

});