import React, { Component } from 'react';
import { View, Linking, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';

export default class CallList extends React.Component {
    static navigationOptions = {
        title: 'Call List',
    };
    constructor(props) {
        super(props);
        //console.ignoredYellowBox = [
        //  'Setting a timer'
        //];
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            workers: [],
            liked: this.props.navigation.state.params.adID,
        }
    }

    async componentDidMount() {
        await this.JobWorkers();
    }

    async JobWorkers() {
        let workersIDArray = this.state.liked;
        let workersArray = []

        try {
            await workersIDArray.map(async (profile) => {
                let value = await firebase.database().ref('users/' + profile).once('value', snapshot => {
                    const va = snapshot.val();
                    console.log(va)
                    workersArray.push(snapshot.val())
                    this.setState({ workers: workersArray })

                    return false;
                })
            });

        }
        catch (e) {
            console.log('caught error', e);
            // Handle exceptions
        }
    }

    //call every time when we will take something from Deck
    renderItem(worker) {
        const { item, index } = worker
        return (
            <View key={index}>
                <Text>
                    Name: {item.full_name}
                </Text>
                {/*<Text>
                    Rating: {item.rating.sum}
                </Text>*/}
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            backgroundColor='#3498db'
                            title='Profile'>
                        </Button>
                    </View>
                    <CheckBox
                        title='Employed'
                    />
                    <View style={styles.button}>
                        <Button
                            backgroundColor='green'
                            title='Call'
                            onPress={() => Linking.openURL('tel:' + item.phone_num)} />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const WorkersArray = this.state.workers.length > 0 ? this.state.workers : []
        //console.log('new job array',jobsArray)
        return (
            <View>
                <ScrollView horizontal={false}>
                    {WorkersArray.length > 0 && <FlatList
                        data={WorkersArray}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => { `key-${item.email}` }}
                    // renderNoMoreCards={this.renderNoMoreCards}
                    />}
                </ScrollView>
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
    cardStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderWidth: 1,
        padding: 5,
        width: '30%',
        height: 40
    }
});