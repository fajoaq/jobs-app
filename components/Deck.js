import React, { useMemo, useState, useRef, useEffect } from 'react';
import {  
    Animated, 
    StyleSheet, 
    PanResponder, 
    Dimensions,
    LayoutAnimation,
    UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOLD = 0.30 * SCREEN_WIDTH;
const SWIPE_SPEED = 250;

const Deck = ({ 
    renderCard,
    data,
    onSwipeLeft=() => {},
    onSwipeRight=() => {},
    renderNoMoreCards
    }) => {
    const position = useRef(new Animated.ValueXY()).current;
    const [index, setIndex] = useState(0);

    const panResponder = useMemo(
        () =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (event, gestureState) => {
                if(gestureState.dx > SWIPE_THRESHOLD) {
                    forceSwipe(); //SWIPE RIGHT
                } else if(gestureState.dx < SWIPE_THRESHOLD * -1) {
                    forceSwipe(-1); //SWIPE LEFT
                } else {
                    resetPosition()
                }
            }
        })
    , []);

    const resetPosition = () => {
        Animated.spring(position, {
            useNativeDriver: false,
            toValue: { x: 0, y: 0 }
        }).start();
    }

    const forceSwipe = (direction = 1) => {
        Animated.timing(position, {
            useNativeDriver: false,
            toValue: { x: SCREEN_WIDTH * direction, y: 0 },
            duration: SWIPE_SPEED
        }).start(() => onSwipeComplete(direction));
    };

    const onSwipeComplete = (direction = 1) => {
        const item = data[index];

        direction === 1 ? onSwipeRight(item) : onSwipeLeft(item);
        position.setValue({ x: 0, y: 0 });
        setIndex(prevIndex => prevIndex + 1);

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    };

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        })

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    };

    const renderCards = () => {
        if(index >= data.length) return renderNoMoreCards();//no more cards
        
        return data.map((item, i) => {
            if( i < index) return null; //card has already been swiped

            if(i === index) {
                return (
                    <Animated.View 
                        key={ item.id }
                        style={[ getCardStyle(), styles.card ]}
                        { ...panResponder.panHandlers }
                    >
                        { renderCard(item) }
                    </Animated.View>
                );
            } //else
            return (
                <Animated.View 
                    key={ item.id } 
                    style={[styles.card, { 
                        top: 5 * (i - index)                        
                    }]}
                >
                    { renderCard(item) }
                </Animated.View>
            );
        }).reverse();
    };

    useEffect(() => {
        setIndex(0);
    }, [data]);

    return <React.Fragment>
        { renderCards() }
    </React.Fragment>
};

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        elevation: 1
    }
});

export default Deck;