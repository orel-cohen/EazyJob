
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView,
    Image,
} from 'react-native';
import * as firebase from "firebase";
import Firebase from '../../Firebase/Firebase';
import { StackNavigator } from 'react-navigation';
//import _Date from '../Date_Time/_Date'
//import _Time from '../Date_Time/_Time'
//import TagsList from '../Tags/TagsList'
import Routes from '../../../App'
import { Content } from 'native-base';

//var provider = new firebase.auth.GoogleAuthProvider();
//var database = firebase.database();
var fullName = "EMPTY STRING";
export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }
        /*const userJobs = firebase.database().ref().child('JRbMkwuwVUeFDqgnd1H6nRyM7Gp1').child('myJobs')
        var user = firebase.database().ref('/JRbMkwuwVUeFDqgnd1H6nRyM7Gp1');
        user.once('value').then(snapshot => {
        // snapshot.val() is the dictionary with all your keys/values from the '/store' path
        this.setState({ user: snapshot.val() })
        })*/
        global.userRef = firebase.database().ref('/users/' + this.props.navigation.state.params.currUserID);
        this.state = {
            fName: '',
            lName: '',
            profilePic: "http://www.spiritanimal.info/wp-content/uploads/Wolf-Spirit-Animal-2.jpg",
            ratings: 0,
            mail: '',
            currUserID: this.props.navigation.state.params.currUserID,
            isCurrUser: this.props.navigation.state.params.isCurrUser,
            // profile: this.setProfile(),

        };
    }

    /* This function runs before loading the page. */
    async componentWillMount() {
        var name = await this.getName(this.props.navigation.state.params.currUserID)
        console.log("Name: ", name)
        this.setState({
            fName: name[0],
            lName: name[1],
        })
        console.log(this.state.fName, " ", this.state.lName)
    }
    setProfile = () => {
        //console.log(this.props.navigation.state.params.currUserID)
        //var userRef = firebase.database().ref('/users/' + this.props.navigation.state.params.currUserID);
        // userRef.once('value').then(snapshot => {
        //     this.setState({profile: snapshot.val()})
        // })
        //console.log(this.state.profile)
    }

    getAvgRating = (ratings) => {
        /* var jobs = userRef.child('/myJobs')
         console.log(jobs.then(snapshot => {
                  this.setState({profile: snapshot.val()})
         }))*/
        let sum = ratings.reduce((x, y) => x + y, 0);
        return sum / ratings.length;
    }
    
    async getNameDB(id) {
        var a = null;
        try{
            await firebase.database().ref('users/').child(id).once('value', snapshot => {
                
                a = snapshot.val().full_name ?  snapshot.val().full_name : 'Anonymous';
                a = a.split(' ');
                console.log("INSIDE FIREBASE");
            }).then(() => {console.log("THEN AFTER FIREBASE")})
              .catch(error => { console.log('error data enets .', error);});
        } catch (error) {
            console.log(error.toString())
        }
        return a;
    }

    async getName(id) {
        
        var name = await this.getNameDB(id)
        console.log("_____FULLNAME_OUTSIDE: " , name);
        return name
        //console.log("_____FULLNAME: " + fullName);
        /*var temp = fullName.split(' ');
        this.setState({
            fName: temp[0],
            lName: temp[1],
        });*/
        //console.log("fullname[0] = " + temp[0] + "\nfullname[1] = " + temp[1]);
        //console.log("fName: " + this.state.fName + "\nlName: " + this.state.lName);
        //return fullName.toString().split();
    }


    render() {
        /*
        console.log("NAME: " + this.state.name);
        let fName = this.state.name[0];
        let lName = this.state.name[1];
        console.log("fName: " + fName + "\nlName: " + lName);*/
        let pic = { uri: this.state.profilePic };
        var numbers = [5, 4, 9, 2, 3];



        this.state.rating = this.getAvgRating(numbers);
        console.log(this.state.currUserID);
        console.log(firebase.auth().currentUser.uid);
        //console.log(this.state.profile)
        return (
            <View /*style={styles.container}*/>
                <ScrollView>
                    <View style={{ flexDirection: 'row' }}/*style={styles.profileBar}*/>

                        <Image
                            style={styles.logoStyle}
                            source={pic}
                        />
                        <View>
                            <Text>{this.state.fName}</Text>
                            <Text>{this.state.lName}</Text>
                            
                            {/*console.log("_____FULLNAME 666: " , name)/*console.log("\n\nFName = " , name[0] , " LNAME = " , name[1])*/}
                           
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20 }}>Rating: {this.state.rating}</Text>
                        <Text style={{ fontSize: 20 }}>E-Mail: {this.state.mail}</Text>
                    </View>
                </ScrollView>

                <View>
                    <Button style={styles.footer}
                        title='View Ratings'
                        onPress={() => 'TEST'}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 140,
        height: 140,
    },

    mainRowText: {
        fontSize: 40,
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        paddingLeft: 5,
    },

    footer: {
        position: 'absolute',
        flex: 0.1,

        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor: 'green',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
    },
})