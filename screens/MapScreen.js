import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = ({ navigation }) => {
    const initCoords = {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
    }
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState(initCoords);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Maps"
        })
        setLoading(false);
    }, []);

    return (
        <View style={ styles.container}>
            { loading ? 
                <ActivityIndicator 
                    style={ styles.map } 
                    size="large" 
                    color="#0000ff" 
                />
                : 
                <MapView 
                    style={ styles.map } 
                    region={ region }
                    onRegionChangeComplete={ (region) => setRegion(region) }
                /> 
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

export default MapScreen;