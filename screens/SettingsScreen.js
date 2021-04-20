import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import JobsContext from '../context/JobsContext';
import { clearLikedJobs } from '../actions/jobs';

const SettingsScreen = ({ navigation }) => {
    const { jobsDispatch } = useContext(JobsContext);

    const onClearJobs = () => {
        clearLikedJobs(jobsDispatch);
        navigation.goBack();
        navigation.navigate('Main', { screen: 'map'});
    }

    return (
        <View>
            <Button 
                title="Clear Jobs"
                icon={{ name: 'delete-forever' }}
                buttonStyle={ styles.deleteButton }
                onPress={ onClearJobs }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: 'red'
    }
})

export default SettingsScreen;