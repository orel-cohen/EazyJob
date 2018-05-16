import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: '#3498db',
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        
    },
    lineStyle:{
        flex:1,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical:30
    },
    textView:{
        color:'#ffffff',
        textAlign: 'center'
    },
    buttonStyle: {
        flex:1,
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center',
        
    }
})