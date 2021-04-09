import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const MapScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Maps"
        })
    }, []);

    return (
        <View>
            <Text>MapScreen</Text>
            <Text>MapScreen</Text>
            <Text>MapScreen</Text>
            <Text>MapScreen</Text>
            <Text>MapScreen</Text>
        </View>
    );
};

export default MapScreen;