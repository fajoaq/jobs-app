import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import JobsContext from '../context/JobsContext';

const DeckScreen = ({ navigation }) => {
    const { jobs } = useContext(JobsContext);

    useEffect(() => {
        console.log(jobs.length);
    }, [jobs])

    return (
        <View style={ styles.constainer }>
            { (jobs.length > 0) && 
            <View>
                { jobs.map((job) => 
                    <Text>{ job.id }</Text>    
                )}
            </View>
            }
        </View>            
    );
};

const styles = StyleSheet.create({
    constainer: {
        marginTop: 20
    }
})

export default DeckScreen;