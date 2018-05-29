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
            { id: "Ashdod - Ashkelon Area", name: "Ashdod - Ashkelon Area " },
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
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        try {
            Firebase.initialise();
        } catch (error) { }
        //this.transferData=this.transferData.bind(this);
        this.state = {
            selectedItems: [],
            cityValdate: true,
            startDate: "",
            startDateValdate: true,
            endDate: "",
            endDateValdate: true,
            startTime: "",
            startValdate: true,
            endTime: "",
            endValdate: true,
            succesToCraete: false,
        };


    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }
    ///////////////////
    //validate inputs//
    ///////////////////
    async JobSearch() {
        if (this.state.selectedItems && this.state.selectedItems.length > 0) {
            setTimeout(() => {
                this.props.navigation.navigate('Jobs', { selectedItems: this.state.emaselectedItemsil, startDate: this.state.startDate, endDate: this.state.endDate, startTime: this.state.startTime, endTime: this.state.endTime })
            }, 100);
        } else {
            Alert.alert("Hi, littele problem", "please choose cities");
        }
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
                    onDateChange={(startDate) => { this.setState({ startDate }); }} />

                <Text>To Date:</Text>
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
                    onDateChange={(endDate) => { this.setState({ endDate }); }} />

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
                <Button
                    onPress={() => this.JobSearch()}
                    title='Search' />
            </View>
        );
    }
}
