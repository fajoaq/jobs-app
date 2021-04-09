import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const ReviewScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Review Jobs",
            headerRight: () => (
                <Button 
                    title="Settings"
                    onPress={() => navigation.navigate('Settings')}
                />
            )
        })
    }, []);
    
    return (
        <React.Fragment>
            <Text>Review Screen</Text>
            <Text>Review Screen</Text>
            <Text>Review Screen</Text>
            <Text>Review Screen</Text>
        </React.Fragment>
    );
};

export default ReviewScreen;