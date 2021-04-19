import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import JobsContext from '../context/JobsContext';
import { clearLikedJobs } from '../actions/jobs';

const SettingsScreen = ({ navigation }) => {
    const { jobsDispatch } = useContext(JobsContext);

    const onClearJobs = () => {
        clearLikedJobs(jobsDispatch);
        navigation.goBack();
        navigation.navigate('Main', { screen: 'Map'});
    }

    return (
        <View>
            <Button 
                title="Clear Jobs"
                onPress={ onClearJobs }
            />
        </View>
    );
};

export default SettingsScreen;