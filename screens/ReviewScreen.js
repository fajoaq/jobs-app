import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import JobsContext from '../context/JobsContext';
import { fetchJobsById } from '../actions/jobs';
import Spinner from '../components/Spinner';

const ReviewScreen = ({ navigation }) => {
    const { jobsData } = useContext(JobsContext);
    const [likedJobs, setLikedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

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
    
    useEffect(() => {
      (async () => {
        let data = await fetchJobsById(jobsData.likedJobs)
        setLikedJobs(data)
      })();
    }, [jobsData]);

    useEffect(() => {
      if(likedJobs.length > 0) setLoading(false);
    },[likedJobs])

    return (
        <View style={styles.container}>
            { loading ? 
              <Spinner />
              :
              <View>
              { likedJobs.map((job) => (
                  <Text key={ job.id }>{ job.id}</Text>
                ))
              }
              </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor:'rgba(0,0,0,0)'
    },
    buttonText: {
      fontSize: 30,
      textAlign: "center",
      margin: 10,
      color: 'white',
      fontWeight: "bold"
    },
  });

export default ReviewScreen;