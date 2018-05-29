<<<<<<< HEAD
import React, {Component} from 'react';
import { ScrollView, Text, View,Dimensions } from 'react-native';

const SCREEN_WIDTH =Dimensions.get('window').width;

//there is option to put in the last slide button that take up to the menu or something video number 93
export default class Slides extends React.Component{
    renderSlides(){
        return this.props.data.map((slide) =>{
            return(
=======
import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

//there is option to put in the last slide button that take up to the menu or something video number 93
export default class Slides extends React.Component {
    renderSlides() {
        return this.props.data.map((slide) => {
            return (
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
                <View key={slide.text} style={styles.slideStyle}>
                    <Text style={styles.textStyle}> {slide.text}</Text>
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
<<<<<<< HEAD
            horizontal
            style={{ flex:1 }}
            pagingEnabled
            >
            {this.renderSlides()}
=======
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
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
<<<<<<< HEAD
    textStyle:{
        fontSize:30
=======
    textStyle: {
        fontSize: 30
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
    }
};