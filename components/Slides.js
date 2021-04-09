import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const Slides = ({ data }) => {

    return (
        <View style={styles.container}>
          <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
              { data.map((slide, index) => (
                <View key={"slide " + index} style={[styles.slide, slideColor[index].style]}>
                    <Text style={styles.headerText}>{ slide.text }</Text>
                </View>
              ))
  
              }
          </ScrollView>
        </View>
    );
}

const slideColor = [
    {style: {
        backgroundColor: '#F44336'
    }},
    {style: {
        backgroundColor: '#9C27B0'
    }},
    {style: {
        backgroundColor: '#3F51B5',
    }},
    {style: {
        backgroundColor: '#009688',
    }}
]

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  slide:{
    width: DEVICE_WIDTH,
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