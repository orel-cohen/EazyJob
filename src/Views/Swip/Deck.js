import React, { Component } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager
  } from 'react-native';
//make the rotate to be work as the screen size in wach phone 
const SCREEN_WIDTH = Dimensions.get('window').width;
//the limit of the card to move left/right and not return to the start position
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
//the value of ms that the card will move
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    //default function to make the app works whe card swip to a side when we make a real function with the same name the default will not work
    static defaultProps = {
        onSwipeRight: () => { },
        onSwipeLeft: () => { }
    }
    //constructor
    constructor(props) {
        super(props);

        //default value to the position
        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            //function that activate every time finger will be on the card
            onStartShouldSetPanResponder: () => true,
            //function that activate in every movemet with the finger and the card
            //envent - the card we put the finger 
            //gesture - the details where the finger move like speed and position
            onPanResponderMove: (event, gesture) => {
                //update the position
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            //function that activate when the finger is release from the screen and see where the card is 
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = { panResponder, position, index: 0 };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
          this.setState({ index: 0 });
        }
      }
    
      componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
      }

    //help function move the card right/left from the screen
    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, { //timing move the card fast 
            toValue: { x, y: 0 },//x will change to the x from the "if" SCREEN_WIDTH or -SCREEN_WIDTH
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    //help function make somethings when the card was swip left or right from the screen
    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({ x: 0, y: 0 }); //return the position to be (0, 0)
        this.setState({ index: this.state.index + 1 }); //move +1 in the index
    }

    //help function that move the card to the start position
    resetPosition() {
        Animated.spring(this.state.position, {//spring the card will move nice
            toValue: { x: 0, y: 0 }
        }).start();
    }

    //help function makeing all the style
    getCardStyle() {
        const { position } = this.state;
        //how the rotate will move
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],//* 1.5 because the rotate move too fast
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            //makes the rotate to the card
            transform: [{ rotate }]
        };
    }

    //built and getting deck list 
    renderCards() {
        //if the list of card empty now
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        return this.props.data.map((item, i) => {
            if (i < this.state.index) { return null; }//for the card we already moved

            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
                        {...this.state.panResponder.panHandlers} //the '...' is for separate the cards from each other
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                <Animated.View
                    key= {item.id} 
                    style={[styles.cardStyle, { top: 10 * (i - this.state.index), zIndex: 5 }]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse();
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }

}
const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
}

export default Deck;