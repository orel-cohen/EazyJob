import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Logo extends React.Component {
    render() {
        return (
            <View>
                <Image style={styles.logoStyle}
                    source={require('../Assets/logo.jpeg')}>
                </Image>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    logoStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 120,
        height: 140,
    },

})