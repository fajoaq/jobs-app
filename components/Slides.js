import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


const Slides = ({ data, onComplete }) => {

    const renderConfirmButton = (index) => { 
      if(index === data.length - 1) {
        return (
          <Button 
            title="Done" 
            onPress={ onComplete }
            buttonStyle={ styles.buttonStyle } 
          />
        )
      }
      return null
    };

    return (
        <View style={styles.container}>
          <ScrollView 
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            { data.map((slide, index) => (
                <View 
                  key={"slide " + (index + 1)} 
                  style={[styles.slide, { backgroundColor: slide.color }]}
                >
                  <Text style={styles.headerText}>{ slide.text }</Text>
                  { renderConfirmButton(index) }
                </View>
              ))
            }
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  slide:{
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: 'white',
    fontWeight: "bold"
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 20
  }
});

export default Slides;