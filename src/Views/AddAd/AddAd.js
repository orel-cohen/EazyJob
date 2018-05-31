import React from 'react';
import Firebase from '../../Firebase/Firebase';
import { StyleSheet, Picker, Button, ScrollView, Text, View, TextInput, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as firebase from "firebase";


export default class SignUp extends React.Component {
    static navigationOptions = {
        title: 'Add Ad',
    };
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }
        //this.transferData=this.transferData.bind(this);
        this.state = {
            addTitle: "",
            titleValdate: true,
            pay: "",
            city: "",
            cityValdate: true,
            place: "",
            placeValdate: true,
            date: "",
            dateValdate: true,
            startTime: "",
            startValdate: true,
            endTime: "",
            endValdate: true,
            tag1: "",
            tag2: "",
            tag3: "",
            tagsValdate: true,
            image: "",
            remarks: "",
            succesToCraete: false,
            favorite: ['0'],
            liked: ['0'],
            disliked: ['0']
        };
    }

    publish() {
        //DismissKeyboard();
        if ((this.state.tag1 == this.state.tag2 || this.state.tag3 == this.state.tag2 || this.state.tag1 == this.state.tag3) && (this.state.tag2 != "" && this.state.tag3 != "")) {
            Alert.alert("Hi, littele problem", "You choosed category more than one time");
        }
        else {
            try {
                userId = firebase.auth().currentUser.uid;
                ref = firebase.database().ref('jobs/').push()
                let newAd = {
                    bossId: userId,
                    title: this.state.addTitle,
                    pay: this.state.pay,
                    city: this.state.city,
                    place: this.state.place,
                    date: this.state.date,
                    start: this.state.startTime,
                    end: this.state.endTime,
                    tag1: this.state.tag1,
                    tag2: this.state.tag2,
                    tag3: this.state.tag3,
                    image: "",
                    remarks: this.state.remarks,
                    favorite: this.state.favorite,
                    liked: this.state.liked,
                    disliked: this.state.disliked,
                    addid: ref.key
                }
                ref.set(newAd)

                ref = firebase.database().ref('users/' + userId + '/ads/').push()
                let userAd = {
                    ads: newAd.addid
                }
                ref.set(userAd)
                Alert.alert('Your add published', 'Now you need wait for workers ;)');
                //TODO : TIMEOUT? FOR WHAT??
                setTimeout(() => {
                    this.props.navigation.navigate('HomeScreen')
                }, 1500);

            } catch (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert("", errorCode);
                Alert.alert("", errorMessage);
                //delete account if DB not succes
            }

        }
    }

    /////////////////////////
    ///////////add validate//////////////
    //////////////////////////////image  + start + end
    render() {
        return (
            <ScrollView >

                <TextInput
                    //style={[styles.input,
                    //!this.state.emailValdate? styles.error:null]}
                    placeholder="Title"
                    returnKeyType="next"
                    //onSubmitEditing={()=> this.passwordInput.focus()}
                    //keyboardType="email-address"
                    //autoCapitalize="none"
                    //autoCorrect={false}
                    onChangeText={(addTitle) => { this.setState({ addTitle }); }} />

                <TextInput
                    //style={[styles.input,
                    //!this.state.fNameValdate? styles.error:null]}
                    placeholder="Pay"
                    returnKeyType="next"
                    //onSubmitEditing={()=> this.passwordInput.focus()}
                    keyboardType="phone-pad"
                    //autoCapitalize="none"
                    //autoCorrect={false}
                    onChangeText={(pay) => { this.setState({ pay }); }} />

                <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.city}
                    onValueChange={(city) => { this.setState({ city }); }}
                >
                    <Picker.Item label="Haifa Area" value="Haifa Area " />
                    <Picker.Item label="Krayot Area" value="Krayot Area" />
                    <Picker.Item label="Acre - Nahariya Area" value="Acre - Nahariya Area" />
                    <Picker.Item label="Upper Galilee" value="Upper Galilee" />
                    <Picker.Item label="Sea of Galilee" value="Sea of Galilee" />
                    <Picker.Item label="Karmiel Area" value="Karmiel Area" />
                    <Picker.Item label="Nazareth - Shfaram area" value="Nazareth - Shfaram area" />
                    <Picker.Item label="Rosh Pina - Ahula" value="Rosh Pina - Ahula" />
                    <Picker.Item label="Lower Galilee" value="Lower Galilee" />
                    <Picker.Item label="Golan Heights" value="Golan Heights" />

                    <Picker.Item label="Zichron - Carmel Beach" value="Zichron - Carmel Beach" />
                    <Picker.Item label="Hadera Area" value="Hadera Area" />
                    <Picker.Item label="Caesarea Area" value="Caesarea Area" />
                    <Picker.Item label="Yokneam - Tivon Area" value="Yokneam - Tivon Area" />
                    <Picker.Item label="Beit Shean Valley" value="Beit Shean Valley" />
                    <Picker.Item label="Afula Area" value="Afula Area" />
                    <Picker.Item label="Ramat Menashe" value="Ramat Menashe" />

                    <Picker.Item label="Netanya Area" value="Netanya Area" />
                    <Picker.Item label="Ramat Hasharon - Herzliya" value="Ramat Hasharon - Herzliya" />
                    <Picker.Item label="Raanana - Kfar Saba" value="Raanana - Kfar Saba" />
                    <Picker.Item label="Hod Hasharon Area" value="Hod Hasharon Area" />
                    <Picker.Item label="South Sharon" value="South Sharon" />
                    <Picker.Item label="North Sharon" value="North Sharon" />

                    <Picker.Item label="Tel Aviv" value="Tel Aviv" />
                    <Picker.Item label="Rishon Lezion Area" value="Rishon Lezion Area" />
                    <Picker.Item label="Holon - Bat Yam" value="Holon - Bat Yam" />
                    <Picker.Item label="Ramat Gan - Givataim" value="Ramat Gan - Givataim" />
                    <Picker.Item label="Petah Tikva Area" value="Petah Tikva Area" />
                    <Picker.Item label="Rosh Ha'Ayin Area" value="Rosh Ha'Ayin Area" />
                    <Picker.Item label="Ono Valley" value="Ono Valley" />
                    <Picker.Item label="Ramle - Lod" value="Ramle - Lod" />
                    <Picker.Item label="Bnei Brak - Givat Shmuel" value="Bnei Brak - Givat Shmuel" />
                    <Picker.Item label="The Ayalon Valley" value="The Ayalon Valley" />
                    <Picker.Item label="Shoham Area" value="Shoham Area" />
                    <Picker.Item label="Modiin Area" value="Modiin Area" />

                    <Picker.Item label="Jerusalem" value="Jerusalem" />
                    <Picker.Item label="Beit Shemesh Area" value="Beit Shemesh Area" />
                    <Picker.Item label="Judean Mountains - Mevasseret" value="Judean Mountains - Mevasseret" />
                    <Picker.Item label="Ma'aleh Adumim Area" value="Ma'aleh Adumim Area" />

                    <Picker.Item label="Southern Mountain Settlements" value="Southern Mountain Settlements" />
                    <Picker.Item label="Samaria Settlements" value="Samaria Settlements" />
                    <Picker.Item label="Gush Etzion" value="Gush Etzion" />
                    <Picker.Item label="Jordan Valley - North of the Dead Sea" value="Jordan Valley - North of the Dead Sea" />
                    <Picker.Item label="Ariel - Settlements of Judea" value="Ariel - Settlements of Judea" />

                    <Picker.Item label="Ness Ziona - Rehovot" value="Ness Ziona - Rehovot" />
                    <Picker.Item label="Ashdod - Ashkelon Area" value="Ashdod - Ashkelon Area " />
                    <Picker.Item label="Gedera - Yavne Area " value="Gedera - Yavne Area " />
                    <Picker.Item label="Kiryat Gat Area" value="Kiryat Gat Area" />
                    <Picker.Item label="Shfela" value="Shfela" />

                    <Picker.Item label="Beer Sheva Area" value="Beer Sheva Area" />
                    <Picker.Item label="Eilat and the Arava" value="Eilat and the Arava" />
                    <Picker.Item label="The Negev Settlements" value="The Negev Settlements" />
                    <Picker.Item label="Western Negev" value="Western Negev" />
                    <Picker.Item label="Southern Dead Sea" value="Southern Dead Sea" />
                </Picker>

                <TextInput
                    //style={[styles.input,
                    //!this.state.emailValdate? styles.error:null]}
                    placeholder="Place/Address"
                    returnKeyType="next"
                    //onSubmitEditing={()=> this.passwordInput.focus()}
                    //keyboardType="email-address"
                    //autoCapitalize="none"
                    //autoCorrect={false}
                    onChangeText={(place) => { this.setState({ place }); }} />

                <Text>Date:</Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    format="DD-MM-YYYY"
                    showIcon={false}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => { this.setState({ date }); }} />

                <Text>Start:</Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.startTime}
                    mode="time"
                    format="LT"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={startTime => {
                        this.setState({ startTime: startTime });
                    }}
                />
                <Text>End:</Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.endTime}
                    mode="time"
                    format="LT"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(endTime) => { this.setState({ endTime: endTime }); }} />
                <Text>Please choose at least 1 categories.</Text>
                <Text>Don't choose the same categories.</Text>

                <TextInput
                    placeholder="Remarks"
                    returnKeyType="next"
                    onChangeText={(remarks) => { this.setState({ remarks }); }} />
                <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.tag1}
                    onValueChange={(tag1) => { this.setState({ tag1 }); }}
                >
                    <Picker.Item label="Animals (Keep or Trip)" value="Animals" />
                    <Picker.Item label="Babysitter" value="Babysitter" />
                    <Picker.Item label="Bartender" value="Bartender" />
                    <Picker.Item label="Car owner" value="Car owner" />
                    <Picker.Item label="Cleaning" value="Cleaning" />
                    <Picker.Item label="DJ" value="DJ" />
                    <Picker.Item label="Events (moderator, clown)" value="Events" />
                    <Picker.Item label="Gardening" value="Gardening" />
                    <Picker.Item label="Inventory counts/arrangement" value="Inventory" />
                    <Picker.Item label="Kitchen" value="Kitchen" />
                    <Picker.Item label="MakeUp" value="MakeUp" />
                    <Picker.Item label="Photographer" value="Photographer" />
                    <Picker.Item label="Porterage" value="Porterage" />
                    <Picker.Item label="Private lessons" value="Private" />
                    <Picker.Item label="Renovations" value="Renovations" />
                    <Picker.Item label="Security/Ushers" value="Security" />
                    <Picker.Item label="Shipments" value="Shipments" />
                    <Picker.Item label="Translate Articles" value="Translate" />
                    <Picker.Item label="Volunteering (for free)" value="Volunteering" />
                    <Picker.Item label="Waiters" value="Waiters" />
                    <Picker.Item label="Work from home" value="Home" />
                    <Picker.Item label="Work in nights" value="Night" />
                    <Picker.Item label="Work in weekend" value="Weekend" />
                </Picker>

                <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.tag2}
                    onValueChange={(tag2) => { this.setState({ tag2 }); }}

                >
                    <Picker.Item label="" value="" />
                    <Picker.Item label="Animals (Keep or Trip)" value="Animals" />
                    <Picker.Item label="Babysitter" value="Babysitter" />
                    <Picker.Item label="Bartender" value="Bartender" />
                    <Picker.Item label="Car owner" value="Car owner" />
                    <Picker.Item label="Cleaning" value="Cleaning" />
                    <Picker.Item label="DJ" value="DJ" />
                    <Picker.Item label="Events (moderator, clown)" value="Events" />
                    <Picker.Item label="Gardening" value="Gardening" />
                    <Picker.Item label="Inventory counts/arrangement" value="Inventory" />
                    <Picker.Item label="Kitchen" value="Kitchen" />
                    <Picker.Item label="MakeUp" value="MakeUp" />
                    <Picker.Item label="Photographer" value="Photographer" />
                    <Picker.Item label="Porterage" value="Porterage" />
                    <Picker.Item label="Private lessons" value="Private" />
                    <Picker.Item label="Renovations" value="Renovations" />
                    <Picker.Item label="Security/Ushers" value="Security" />
                    <Picker.Item label="Shipments" value="Shipments" />
                    <Picker.Item label="Translate Articles" value="Translate" />
                    <Picker.Item label="Volunteering (for free)" value="Volunteering" />
                    <Picker.Item label="Waiters" value="Waiters" />
                    <Picker.Item label="Work from home" value="Home" />
                    <Picker.Item label="Work in nights" value="Night" />
                    <Picker.Item label="Work in weekend" value="Weekend" />
                </Picker>

                <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.tag3}
                    onValueChange={(tag3) => { this.setState({ tag3 }); }}
                >
                    <Picker.Item label="" value="" />
                    <Picker.Item label="Animals (Keep or Trip)" value="Animals" />
                    <Picker.Item label="Babysitter" value="Babysitter" />
                    <Picker.Item label="Bartender" value="Bartender" />
                    <Picker.Item label="Car owner" value="Car owner" />
                    <Picker.Item label="Cleaning" value="Cleaning" />
                    <Picker.Item label="DJ" value="DJ" />
                    <Picker.Item label="Events (moderator, clown)" value="Events" />
                    <Picker.Item label="Gardening" value="Gardening" />
                    <Picker.Item label="Inventory counts/arrangement" value="Inventory" />
                    <Picker.Item label="Kitchen" value="Kitchen" />
                    <Picker.Item label="MakeUp" value="MakeUp" />
                    <Picker.Item label="Photographer" value="Photographer" />
                    <Picker.Item label="Porterage" value="Porterage" />
                    <Picker.Item label="Private lessons" value="Private" />
                    <Picker.Item label="Renovations" value="Renovations" />
                    <Picker.Item label="Security/Ushers" value="Security" />
                    <Picker.Item label="Shipments" value="Shipments" />
                    <Picker.Item label="Translate Articles" value="Translate" />
                    <Picker.Item label="Volunteering (for free)" value="Volunteering" />
                    <Picker.Item label="Waiters" value="Waiters" />
                    <Picker.Item label="Work from home" value="Home" />
                    <Picker.Item label="Work in nights" value="Night" />
                    <Picker.Item label="Work in weekend" value="Weekend" />
                </Picker>
                <Button
                    onPress={() => this.publish()}
                    title='Publish My Ad' />
            </ScrollView>
        );
    }
}

/*
dateValdate:true,
start:"",
startValdate:true,
end:"",
endValdate:true,
tagsValdate:true,
image: "",
succesToCraete:false,*/