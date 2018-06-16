import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

import Deck from '../Deck'

export default class Jobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: this.props.navigation.state.params.jobs
        }
        console.log("jobs: ", this.state.jobs);
        //console.log("DATA: ", DATA);
    }

    //call every time when we will take something from Deck
    renderCard(item) {
        return (
            <Card
                key={item.child("id").val()}
                title={item.child("title").val()}>
                <Image source={{ uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' }} />
                <Text>
                    {item.child("bossid").val()}
                </Text>
                <Text>
                    title: {item.child("title").val()}
                </Text>
                <Text>
                    Date: {item.child("date").val()}
                </Text>
                <Text>
                    Where: {item.child("place").val()}
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
        const jobsData = this.state.jobs;
        console.log("JobsDATA: ", jobsData);
        return (
            <View style={styles.container}>
                <Deck
                    data={jobsData}//{DATA}
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