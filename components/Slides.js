import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


const Slides = ({ data }) => {

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
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: 'white',
    fontWeight: "bold"
  }
});

export default Slides;