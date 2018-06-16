
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
    static navigationOptions = {
        title: 'Profile',
      };
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }
        global.userRef = firebase.database().ref('/users/' + this.props.navigation.state.params.currUserID);
        this.state = {
            fName: '',
            lName: '',
            profilePic: "http://www.spiritanimal.info/wp-content/uploads/Wolf-Spirit-Animal-2.jpg",
            rating: 0,
            mail: '',
            currUserID: this.props.navigation.state.params.currUserID,
            isCurrUser: this.props.navigation.state.params.isCurrUser,
            
            // profile: this.setProfile(),

        };
        console.log(this.state.currentUserID);
    }

    /* This function runs before loading the page. */
    async componentWillMount() {
        var name = await this.getName()
        var rating = await this.getAvgRating()
        var mail = await this.getMail()
        console.log("Name: ", name)
        this.setState({
            fName: name[0],
            lName: name[1],
            rating: rating,
            mail: mail,
        })
        console.log(this.state.fName, " ", this.state.lName)

        
    }
    async setProfile(){
        //console.log(this.props.navigation.state.params.currUserID)
        //var userRef = firebase.database().ref('/users/' + this.props.navigation.state.params.currUserID);
        // userRef.once('value').then(snapshot => {
        //     this.setState({profile: snapshot.val()})
        // })
        //console.log(this.state.profile)
    }

    async getMail() {
        var test = await firebase.database().ref('users/' + this.state.currUserID).once('value', snapshot => {
            mail = snapshot.child('email').val();
        })
        console.log('mail: ',mail)
        return mail;
    }

    async getAvgRating() {
        var amount;
        var sum;
        var test = await firebase.database().ref('users/' + this.state.currUserID + '/rating').once('value', snapshot => {
            amount = snapshot.child('amount').val();
            sum = snapshot.child('sum').val();
        })
        var avg = sum / amount;
        console.log('amount = ',amount);
        console.log('sum = ', sum);
        console.log('sum / amount',avg);

        this.setState({rating: avg});
        return avg;
    }
    
    async getNameDB() {
        var name = null;
        try{
            await firebase.database().ref('users/').child(this.state.currUserID).once('value', snapshot => {
                
                name = snapshot.val().full_name ?  snapshot.val().full_name : 'Anonymous';
                name = name.split(' ');
                console.log("INSIDE FIREBASE");
            }).then(() => {console.log("THEN AFTER FIREBASE")})
              .catch(error => { console.log('error data enets .', error);});
        } catch (error) {
            console.log(error.toString())
        }
        
        return name;
    }

    async getName(id) {
        
        var name = await this.getNameDB(id)
        console.log("_____FULLNAME_OUTSIDE: " , name);
        return name;
    }


    render() {
        
        let pic = { uri: this.state.profilePic };
        var numbers = [5, 4, 9, 2, 3];



        //this.state.rating = this.getAvgRating();
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
                            <Text style={styles.mainRowText}>{this.state.fName}</Text>
                            <Text style={styles.mainRowText}>{this.state.lName}</Text>
                            
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