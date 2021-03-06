import React, { Component } from 'react';
import { View, Linking, StyleSheet, Text, FlatList, ScrollView, CheckBox, Button, Alert } from 'react-native';
//import { CheckBox, Button } from 'react-native-elements';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';

export default class CallList extends React.Component {
    static navigationOptions = {
        title: 'Call List',
    };
    constructor(props) {
        super(props);
        console.disableYellowBox = true
        try {
            Firebase.initialise();
        } catch (error) { }
        this.state = {
            workers: [],
            liked: this.props.navigation.state.params.userLikes,
            adId: this.props.navigation.state.params.adId,
            workersIDArray: [],
            isSelected: [],
            workerIndex: [],
        }

        this.goToProfile = this.goToProfile.bind(this)
        this.addWorker = this.addWorker.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.confirmWorkers = this.confirmWorkers.bind(this)
    }

    async componentDidMount() {
        await this.JobWorkers();
    }

    async goToProfile(id) {
        this.props.navigation.navigate('Profile', { currUserID: id, isCurrUser: false })
    }

    async JobWorkers() {
        let workersIDs = Object.keys(JSON.parse(JSON.stringify(this.state.liked))).map(key => {
            return JSON.parse(JSON.stringify(this.state.liked))[key];
        })
        
        this.setState({workersIDArray:workersIDs})
        let workersArray = []
        let boolArray = []

        try {
            await workersIDs.forEach( async (id) => {
                if(id != "0") {
                    let value = await firebase.database().ref('users/' + id).once('value', snapshot => {
                        const va = snapshot.val();
                        workersArray.push(snapshot.val())
                        boolArray.push(false)
                        this.setState({ 
                            workers: workersArray,
                            isSelected: boolArray 
                        })
                    })
                }
            });

        }
        catch (e) {
            console.log('caught error', e);
            // Handle exceptions
        }
    }

    async addWorker(check, index) {
        id = this.workersIDArray[index]
        check = !check
    }

    async handleCheckBox(index) {
        
        let arrayItem = []
        arrayItem = this.state.isSelected
        let workers = this.state.workerIndex
        arrayItem = arrayItem.slice()
        arrayItem[index] = !arrayItem[index]
            
        if(arrayItem[index]) {
            workers.push(index)
        }
        else{
            let i = workers.indexOf(index)
            workers.splice(i,1)
        }

        this.setState({
            isSelected: arrayItem,
            workerIndex: workers
        })
        this.forceUpdate()
    }

    async confirmWorkers() {
        let names = []
        let ad = this.state.adId
        let workersIndex = this.state.workerIndex
        let worker = this.state.workers
        let id = ''
        let ref = ''
        let publisherID = firebase.auth().currentUser.uid

        workersIndex.forEach(async (index) => {
            id = worker[index].userId
            names.push(worker[index].full_name)
            ref = await firebase.database().ref('users/').child(id + '/toRate').child(publisherID).child('ratedUserId').set(publisherID)
            ref = await firebase.database().ref('users/').child(id + '/toRate/' + publisherID).child('jobId').set(ad)

            ref = await firebase.database().ref('users/').child(publisherID + '/toRate').child(id).child('ratedUserId').set(id)
            ref = await firebase.database().ref('users/').child(publisherID + '/toRate/' + id).child('jobId').set(ad)
            ref = await firebase.database().ref('users/').child(id + '/liked/' + ad).remove()
        })

        names.forEach(name => {
            ref += name + '\n'
        })
        
        Alert.alert("The following users were assigned to your job", ref);
        this.props.navigation.navigate('HomeScreen')

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
                    <CheckBox
                        title='Employed'
                        value={this.state.isSelected[index]}
                        onChange={ () => {this.handleCheckBox(index)}}
                    />
                    <View style={styles.button}>
                        <Button
                            backgroundColor='#3498db'
                            title='Profile'
                            onPress={()=> this.props.navigation.navigate('Profile', { currUserID: item.userId, isCurrUser: false })}
                        />
                    </View>
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
        
        return (
            <View style={{flex: 1}}>
                <ScrollView horizontal={false}>
                    {WorkersArray.length > 0 && <FlatList
                        data={WorkersArray}
                        extraData={this.state}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => { `key-${item.userId}` }}
                    // renderNoMoreCards={this.renderNoMoreCards}
                    />}
                </ScrollView>
            

                <View>
                    <Button
                        title="Confirm Workers"
                        onPress={() => this.confirmWorkers()}
                    />
                </View>
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