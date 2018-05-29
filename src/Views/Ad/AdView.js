import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

export default class Ad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'TITLE',
            description: 'DESCRIPTION',
            date: 'DATE',
            time_start: 'START',
            time_end: 'END',
            likes: 666,
            commentCount: 30,
            isLiked: 0
        }
    }

    //likePress = () => {
<<<<<<< HEAD
        /*Increase Likes for post*/
      /*  if (this.props.isLiked == 0) {
            this.props.likes++
            this.props.isLiked = 1
        }*/
        /*Decrease likes for post*/
        /*else {
            this.props.likes--
            this.props.isLiked = 0
        }

    }*/
    //commentPress = () => {
        /* Insert new comment */
=======
    /*Increase Likes for post*/
    /*  if (this.props.isLiked == 0) {
          this.props.likes++
          this.props.isLiked = 1
      }*/
    /*Decrease likes for post*/
    /*else {
        this.props.likes--
        this.props.isLiked = 0
    }

}*/
    //commentPress = () => {
    /* Insert new comment */
>>>>>>> 69d674576967211db7f0f20d634638cfe31868fd
    //}

    render() {
        return (

            <View>
                {/* Ad Content */}
                <View style={styles.container}>

                    <Text style={styles.Title}>{//this.props.title
                    }</Text>
                    {/* <image /> Optional image place for the Ad*/}
                    <Text>{//this.props.description
                    }</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ margin: 20 }}>
                            <Text>Date</Text>
                            <Text>{//this.props.date
                            }</Text>
                        </View>
                        <View style={{ margin: 20 }}>
                            <Text>Start</Text>
                            <Text>{//this.props.time_start
                            }</Text>
                        </View>
                        <View style={{ margin: 20 }}>
                            <Text>End</Text>
                            <Text>{//this.props.time_end
                            }</Text>
                        </View>
                    </View>
                </View>

                {/* Bar - Likes (go up when someone take the card to the right) and Comment count*/}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ margin: 20 }}>
                        <Text>{this.props.likes} liked this</Text>
                    </View>
                    {/*<View style={{ margin: 20 }}>
                        <Text>{this.props.commentCount} comments</Text>
                    </View>*/}
                </View>

                {/* Like & Comment Button*/}
                {/*<View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={this.likePress}
                        Ionicons name="thumbs-up" size={32} color="rgb(244, 209, 66)"
                    />
                    <Button
                        onPress={this.commentPress}
                        Ionicons name="chat-bubble" size={32} color="rgb(244, 209, 66)"
                        title='Comment'
                    />
                </View>*/}

                {/* Comment Section */}
                <View>
                    {/*Display comments from DB*/}
                </View>

            </View>
        );
    }
}