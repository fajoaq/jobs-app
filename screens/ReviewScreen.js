import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ReviewScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Review Jobs",
            headerRight: () => (
                <TouchableOpacity 
                    title="Settings"
                    onPress={() => navigation.navigate('Settings')}
                    style={styles.button}
                >
                  <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            ),
            
        })
    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={{color:'#888', fontSize:20}}>Review Screen</Text>
            <Text style={{color:'#888', fontSize:20}}>Review Screen</Text>
            <Text style={{color:'#888', fontSize:20}}>Review Screen</Text>
            <Text style={{color:'#888', fontSize:20}}>Review Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor:'rgba(0,0,0,0)'
    },
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16
    },
  });

export default ReviewScreen;