import React, { useEffect, useReducer, useState } from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

import JobsReducer from '../reducers/JobsReducer';
import fetchJobs from '../actions/jobs';

const MapScreen = ({ navigation }) => {
    const initCoords = {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
    }
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState(initCoords);
    const [jobs, jobsDispatch] = useReducer(JobsReducer);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Maps"
        })
        setLoading(false);
    }, []);

    const onButtonPress = () => {
        fetchJobs(region, jobsDispatch);
    };

    return (
        <View style={ styles.container}>
            { loading ? 
                <ActivityIndicator 
                    style={ styles.map } 
                    size="large" 
                    color="#0000ff" 
                />
                :
                <View>
                    <MapView 
                        style={ styles.map } 
                        region={ region }
                        onRegionChangeComplete={ (newRegion) => setRegion(newRegion) }
                    />
                    <View style={ styles.buttonContainer }>
                        <Button 
                            title="Search This Area"
                            backgroundColor="#009688"
                            icon={{ name: 'search' }}
                            onPress={ onButtonPress }
                            buttonStyle={ styles.button}
                        />
                    </View>
                </View>
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
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 60,
        right: 60
    },
    button: {
        backgroundColor: '#009688'
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

export default MapScreen;