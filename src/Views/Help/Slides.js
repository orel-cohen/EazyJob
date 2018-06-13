import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

//there is option to put in the last slide button that take up to the menu or something video number 93
export default class Slides extends React.Component {
    renderSlides() {
        return this.props.data.map((slide) => {
            return (
                <View key={slide.text} style={styles.slideStyle}>
                    <Text style={styles.textStyle}> {slide.text}</Text>
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30
    }
};