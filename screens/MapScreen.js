import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

import JobsContext from '../context/JobsContext';
import fetchJobs from '../actions/jobs';
import Spinner from '../components/Spinner';

const MapScreen = ({ navigation }) => {
    const initCoords = {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
    }
    const [region, setRegion] = useState(initCoords);
    const { jobsDispatch } = useContext(JobsContext);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Maps"
        })
        setLoading(false);
    }, []);

    const onButtonPress = () => {
        fetchJobs(region, jobsDispatch);
        navigation.navigate('Deck', { region });
    };

    return (
        <View style={ styles.container}>
            { loading ? 
                <Spinner />
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