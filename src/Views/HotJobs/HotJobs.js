import React from 'react';
import Firebase from '../../Firebase/Firebase';
import { StyleSheet, Picker, Button, ScrollView, Text, View, TextInput, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as firebase from "firebase";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [
    {
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
            { id: "Ashdod - Ashkelon Area ", name: "Ashdod - Ashkelon Area " },
            { id: "Gedera - Yavne Area ", name: "Gedera - Yavne Area " },
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
export default class HotJobs extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }
        //this.transferData=this.transferData.bind(this);
        let today = this.getToday()
        this.state = {
            selectedItems: [],
            cityValidate: true,
            succesToCraete: false,
            date: today,
            endTime: "",
            endTimeValidate: false,
        };

        
        this.filterJobs = this.filterJobs.bind(this);
        this.JobSearch = this.JobSearch.bind(this);
        his.getToday = his.getToday.bind(this)
    }

    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }
    ///////////////////
    //validate inputs//
    ///////////////////
    async JobSearch() {

        let filtered = await this.filterJobs();


        if (this.state.selectedItems && this.state.selectedItems.length > 0) {
            setTimeout(() => {
                this.props.navigation.navigate('Jobs', { selectedItems: this.state.emaselectedItemsil, jobs: filtered })
            }, 1500);
        } else {
            Alert.alert("Hi, littele problem", "please choose cities");
        }
    }

    getToday = () => {

        let dateInterface = new Date();
        let day = dateInterface.getDate();
        let month = dateInterface.getMonth() + 1;
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        let today = day + '-' + month + '-' + dateInterface.getFullYear()

        return today

    }

    async filterJobs() {
        let currentUserID = "BPJlfxwcunNHIEviueeKxsQiOqG2";//firebase.auth().currentUser.uid;
        let filtered = [];
        let search;
        let jobsRef;
        let favorite = [];
        let disliked = [];
        let liked = [];
        let dateInterface = new Date();
        //let day = dateInterface.getDate();
        //let month = dateInterface.getMonth();
        //let year = dateInterface.getFullYear();
        let dates = [];
        // dateInterface.setDate(dateInterface.getDate() +2)


        let day = dateInterface.getDate();
        let month = dateInterface.getMonth() + 1;

        for (let i = 0; i < 3; i++) {
            dateInterface.setDate(dateInterface.getDate() + 1);
            day = dateInterface.getDate();
            month = dateInterface.getMonth() + 1;
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            console.log(day + '-' + month + '-' + dateInterface.getFullYear);
            dates.push(day + '-' + month + '-' + dateInterface.getFullYear())
        }
        console.log(dates);
        console.log(dates[0]);
        console.log('ID: ', currentUserID);

        // TEST TO BE DELETED:
        /*this.state.selectedItems = [];
        this.state.selectedItems.push('Haifa Area');
        this.state.selectedItems.push('Ashdod - Ashkelon Area ');*/
        // ENT TEST

        let idArr = [];

        let ref = await firebase.database().ref().once('value', snapshot => {

            search = snapshot.child('HotJobSearch');
            jobsRef = snapshot.child('jobs');


            snapshot.child('users/' + currentUserID + '/favorite').forEach(id => {
                favorite.push(id.val());
            });
            snapshot.child('users/' + currentUserID + '/disliked').forEach(id => {
                disliked.push(id.val());
            });;
            snapshot.child('users/' + currentUserID + '/liked').forEach(id => {
                liked.push(id.val());
            });;

            console.log('FAVORITE: \n', favorite);
            console.log('disliked: \n', disliked);
            console.log('liked: \n', liked);

            console.log('search: ', search);

            this.state.selectedItems.forEach(async (city) => {

                console.log('search.child(city): ', search.child(city));
                dates.forEach(async (date) => {
                    let jobID = [];

                    let jobsTest = [];

                    snapshot.child('HotJobSearch').child(city).child(date).forEach(childSnapshot => {

                        console.log('childSnapshot: ', childSnapshot.val());
                        //jobID.push(childSnapshot);
                        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

                        console.log(snapshot.child('jobs').child(childSnapshot.val()));
                        console.log('Current ID: ', childSnapshot.val());
                        console.log(!(favorite.includes(childSnapshot.val()) || liked.includes(childSnapshot.val()) || disliked.includes(childSnapshot.val()) || idArr.includes(childSnapshot.val())))

                        if (!(favorite.includes(childSnapshot.val()) || liked.includes(childSnapshot.val()) || disliked.includes(childSnapshot.val()) || idArr.includes(childSnapshot.val()))) {
                            console.log('*******************************************************');
                            let job = snapshot.child('jobs/' + childSnapshot.val());
                            console.log("childSnapshot: \n", childSnapshot);
                            console.log("childSnapshot.val(): \n", childSnapshot.val());
                            console.log(city);
                            console.log(date);
                            filtered.push(job);
                            idArr.push(childSnapshot.val());
                        }
                    })
                })
            })
        });

        console.log("FILTERED: ", filtered);

        return filtered;


    }

    render() {
        const { city } = this.state;
        return (
            <View>
                <Text>Choose cities, and then you will get all jobs in the next 72 hours. </Text>
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
                {/*
                <Text>Select Date:</Text>
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
                <Text>Please confirm the date</Text>*/}

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