import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';

import JobsContext from '../context/JobsContext';
import { fetchJobsById } from '../actions/jobs';
import Spinner from '../components/Spinner';

const ReviewScreen = ({ navigation }) => {
  const { jobsData } = useContext(JobsContext);
  const [likedJobs, setLikedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderLikedJobs = () => {
    return likedJobs.map((job) => {
      const { id, company, created_at, url, initialRegion } = job;

      return(
        <Card key={ id }>
          <View style={{ height: 200 }}>
            <MapView 
              style={{ flex: 1 }}
              cacheEnabled={ true }
              scrollEnabled={ false }
              initialRegion={ initialRegion }
            />
            <View style={ styles.detailsContainer}>
              <Card.Title style={styles.italics}>{ 
                company.length > 16 ?
                company.substring(0, 16) + '...' 
                : 
                company.substring(0, 16) 
              }</Card.Title>
              <Text style={ styles.italics }>{ created_at}</Text>
            </View>
            <Button 
              title="Apply Now!" 
              buttonStyle={ styles.button}
              onPress={ () => Linking.openURL(url) }
            />
          </View>
        </Card>
      )});
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Review Jobs",
      headerRight: () => (
        <TouchableOpacity 
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      )
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
            <ScrollView>
              { renderLikedJobs() }
            </ScrollView>
          }
      </View>
  );
};

const styles = StyleSheet.create({
  settingsButton: {
    backgroundColor:'rgba(0,0,0,0)'
  },
  applyButton: {
    backgroundColor:'#03A9F4'
  },
  settingsText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: 'white',
    fontWeight: "bold"
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  italics: {
    fontStyle: 'italic'
  }
});

export default ReviewScreen;