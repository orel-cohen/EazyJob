import React from 'react';
import Firebase from '../../Firebase/Firebase';
import { StyleSheet, Picker, Button, ScrollView, Text, View, TextInput, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as firebase from "firebase";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [
    { // 54 Areas overall.
        name: "North",
        id: "North",
        children: [
            { id: "Haifa Area", name: "Haifa Area " },
            { id: "Krayot Area", name: "Krayot Area" },
            { id: "Acre - Nahariya Area", name: "Acre - Nahariya Area" },
            { id: "Upper Galilee", name: "Upper Galilee" },
            { id: "Sea of Galilee", name: "Sea of Galilee" },
            { id: "Karmiel Area", name: "Karmiel Area" },
            { id: "Nazareth - Shfaram area", name: "Nazareth - Shfaram area" },
            { id: "Rosh Pina - Ahula", name: "Rosh Pina - Ahula" },
            { id: "Lower Galilee", name: "Lower Galilee" },
            { id: "Golan Heights", name: "Golan Heights" }]
    },
    {
        name: "Hadera Zichron and valleys",
        id: "Hadera Zichron and valleys",
        children: [
            { id: "Zichron - Carmel Beach", name: "Zichron - Carmel Beach" },
            { id: "Hadera Area", name: "Hadera Area" },
            { id: "Caesarea Area", name: "Caesarea Area" },
            { id: "Yokneam - Tivon Area", name: "Yokneam - Tivon Area" },
            { id: "Beit Shean Valley", name: "Beit Shean Valley" },
            { id: "Afula Area", name: "Afula Area" },
            { id: "Ramat Menashe", name: "Ramat Menashe" }]
    },
    {
        name: "Sharon",
        id: "Sharon",
        children: [
            { id: "Netanya Area", name: "Netanya Area" },
            { id: "Ramat Hasharon - Herzliya", name: "Ramat Hasharon - Herzliya" },
            { id: "Raanana - Kfar Saba", name: "Raanana - Kfar Saba" },
            { id: "Hod Hasharon Area", name: "Hod Hasharon Area" },
            { id: "South Sharon", name: "South Sharon" },
            { id: "North Sharon", name: "North Sharon" }]
    },
    {
        name: "Center",
        id: "Center",
        children: [
            { id: "Tel Aviv", name: "Tel Aviv" },
            { id: "Rishon Lezion Area", name: "Rishon Lezion Area" },
            { id: "Holon - Bat Yam", name: "Holon - Bat Yam" },
            { id: "Ramat Gan - Givataim", name: "Ramat Gan - Givataim" },
            { id: "Petah Tikva Area", name: "Petah Tikva Area" },
            { id: "Rosh Ha'Ayin Area", name: "Rosh Ha'Ayin Area" },
            { id: "Ono Valley", name: "Ono Valley" },
            { id: "Ramle - Lod", name: "Ramle - Lod" },
            { id: "Bnei Brak - Givat Shmuel", name: "Bnei Brak - Givat Shmuel" },
            { id: "The Ayalon Valley", name: "The Ayalon Valley" },
            { id: "Shoham Area", name: "Shoham Area" },
            { id: "Modiin Area", name: "Modiin Area" }]
    },
    {
        name: "Jerusalem Area",
        id: "Jerusalem Area",
        children: [
            { id: "Jerusalem", name: "Jerusalem" },
            { id: "Beit Shemesh Area", name: "Beit Shemesh Area" },
            { id: "Judean Mountains - Mevasseret", name: "Judean Mountains - Mevasseret" },
            { id: "Ma'aleh Adumim Area", name: "Ma'aleh Adumim Area" }]
    },
    {
        name: "Judea Shomron - Jordan Valley ",
        id: "Judea Shomron - Jordan Valley ",
        children: [
            { id: "Southern Mountain Settlements", name: "Southern Mountain Settlements" },
            { id: "Samaria Settlements", name: "Samaria Settlements" },
            { id: "Gush Etzion", name: "Gush Etzion" },
            { id: "Jordan Valley - North of the Dead Sea", name: "Jordan Valley - North of the Dead Sea" },
            { id: "Ariel - Settlements of Judea", name: "Ariel - Settlements of Judea" }]
    },
    {
        name: "South Coastal Plain",
        id: "South Coastal Plain",
        children: [
            { id: "Ness Ziona - Rehovot", name: "Ness Ziona - Rehovot" },
            { id: "Ashdod - Ashkelon Area", name: "Ashdod - Ashkelon Area " },
            { id: "Gedera - Yavne Area", name: "Gedera - Yavne Area" },
            { id: "Kiryat Gat Area", name: "Kiryat Gat Area" },
            { id: "Shfela", name: "Shfela" }]
    },
    {
        name: "South",
        id: "South",
        children: [
            { id: "Beer Sheva Area", name: "Beer Sheva Area" },
            { id: "Eilat and the Arava", name: "Eilat and the Arava" },
            { id: "The Negev Settlements", name: "The Negev Settlements" },
            { id: "Western Negev", name: "Western Negev" },
            { id: "Southern Dead Sea", name: "Southern Dead Sea" }]
    },
]

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }
        //this.transferData=this.transferData.bind(this);
        this.state = {
            selectedItems: [],
            cityValidate: true,
            date: "",
            dateValidate: true,
            /*endDate: "",
            endDateValidate: true,
            startTime: "",
            startValidate: true,
            endTime: "",
            endValidate: true,*/
            succesToCraete: false,
            jobsList: null,
        };
    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }
    ///////////////////
    //validate inputs//
    ///////////////////
    async JobSearch() {
        console.log("FIRST LINE IN JobSearch");

        var filtered = await this.filterJobs();
        console.log("back in job search: ", filtered)

        if (this.state.selectedItems && this.state.selectedItems.length > 0) {
            setTimeout(() => {
                this.props.navigation.navigate('Jobs', { selectedItems: this.state.selectedItems, startDate: this.state.startDate, endDate: this.state.endDate, startTime: this.state.startTime, endTime: this.state.endTime, jobs: filtered })
            }, 1500);
        } else {
            Alert.alert("Hi, little problem", "please choose cities");
        }
    }

    async getJobs(tag, idArr, jobsRef) {
        //var index = 0;
        //var indexStr = JSON.stringify(JSON.stringify(index)); Beer Sheva Area Bnei Brak - Givat Shmuel
        //city = JSON.stringify(city);
        //console.log("index = ",index,"\nindexStr = ",indexStr);//search.child(tag.val()).child(city).val();
        var jobID = [];
        var dbPath = '/JobSearch/' + tag.val() + '/' + city + '/' + this.state.date
        console.log(dbPath);
        var test = await firebase.database().ref(dbPath).once('value', snapshot => {
            console.log('snapshot: ', snapshot);
            snapshot.forEach(childSnapshot => {
                console.log('childSnapshot: ', childSnapshot)
                jobID.push(childSnapshot.val());
            })
        });

        return jobID;

        //index++;
    }

    async filterJobs() {

        var currentUserID = firebase.auth().currentUser.uid;
        var filtered = [];
        var search;
        var jobsRef;
        var userRef;
        var userTagRef;
        var favorite = [];
        var disliked = [];
        var liked = [];
        var dateReq = '';
        console.log('ID: ', currentUserID);

        var ref = await firebase.database().ref().once('value', snapshot => {
            
            search = snapshot.child('JobSearch');
            jobsRef = snapshot.child('jobs');
            userRef = snapshot.child('users/' + currentUserID);
            userTagRef = snapshot.child('users/' + currentUserID + '/tags');

            snapshot.child('users/' + currentUserID + '/favorite').forEach(id => {
                favorite.push(id.val());
            });
            snapshot.child('users/' + currentUserID + '/disliked').forEach(id => {
                disliked.push(id.val());
            });;
            snapshot.child('users/' + currentUserID + '/liked'   ).forEach(id => {
                liked.push(id.val());
            });;
        });

        var j = 0;
        var idArr = [];

        console.log('FAVORITE: \n', favorite);
        console.log('disliked: \n', disliked);
        console.log('liked: \n', liked);
        
        if(this.state.date != "") {
            this.state.date = '/' + this.state.date
        }

        userTagRef.forEach(tag => {
            console.log('Index ', j, ': ', tag.val());
            j++;
            var jobID = [];
            this.state.selectedItems.forEach(async city => {

                
                var dbPath = '/JobSearch/' + tag.val() + '/' + city + this.state.date
                console.log(dbPath);
                var test = await firebase.database().ref(dbPath).once('value', snapshot => {
                    console.log('snapshot: ', snapshot);

                    snapshot.forEach(childSnapshot => {
                        console.log('childSnapshot: ', childSnapshot)
                        jobID.push(childSnapshot.val());
                    })
                });

                console.log("JOB IDS: ", jobID);
                console.log(city);
                console.log(typeof (Array.isArray(jobID)));

                var job = null;
                jobID.forEach(id => {
                    console.log("Job Id: ", id);
                    console.log(favorite.includes(id));
                    console.log((favorite.includes(id) || liked.includes(id) || disliked.includes(id) || idArr.includes(id)));
                    if(!(favorite.includes(id) || liked.includes(id) || disliked.includes(id) || idArr.includes(id) || idArr.includes(id))) {
                        id = "" + id;
                        job = jobsRef.child(id);

                        console.log("Job Id: ", id);
                        console.log("Job: ", job);
                        
                        filtered.push(job);
                        idArr.push(id);
                          
                    }
                });
            })
        })
        console.log("FILTERED: ", filtered);

        return filtered;
        

    }

    render() {
        const { city } = this.state;
        return (
            <View>
                <SectionedMultiSelect
                    items={items}
                    uniqueKey='id'
                    subKey='children'
                    selectText='Choose some cities...'
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.selectedItems}
                />

                <Text>From Date:</Text>
                <DatePicker
                    style={{ width: 200 }[styles.input,
                        !this.state.dateValidate ? styles.error : null]}
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
                onDateChange={(date) => { this.setState({ date }); this.validate(date, 'date') }} />
                <Text>Please confirm the date, start time and end time</Text>
{/*                
                <Text>To Date:</Text>
                <DatePicker
                    style={{ width: 200 }[styles.input,
                        !this.state.endTimeValidate ? styles.error : null]}
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
                    onDateChange={(endTime) => { this.setState({ endTime: endTime }); this.validate(endTime, 'endTime') }} />
                

                <Text>Start At:</Text>
                <DatePicker
                    style={{ width: 200 }}
                    startTime={this.state.time}//fix that
                    mode="time"
                    format="HH:MM"
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
                    onDateChange={(startTime) => { this.setState({ startTime }); }} />
                <Text>End At:</Text>
                <DatePicker
                    style={{ width: 200 }}
                    endTime={this.state.time}//fix that
                    mode="time"
                    format="HH:MM"
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
                    onDateChange={(endTime) => { this.setState({ endTime }); }} />
                */}
                <Button
                    onPress={() => this.JobSearch()}
                    title='Search' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3498db',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    input: {
        width: 300,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.8)',
        marginBottom: 12,
        color: 'rgba(0,0,0,1)',
        paddingHorizontal: 10,
    },
    buttonText: {
        color: 'rgba(0,0,0,1)',
        textAlign: 'center',
        fontWeight: '700'

    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 15
    },
    TextStyle: {
        fontSize: 23,
        textAlign: 'center',
        color: '#000',
    },
    error: {
        borderWidth: 2,
        borderColor: 'red'
    }
});