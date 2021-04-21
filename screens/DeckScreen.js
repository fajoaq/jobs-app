import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';

import JobsContext from '../context/JobsContext';
import Deck from '../components/Deck';
import { likeJob } from '../actions/jobs';
import Spinner from '../components/Spinner';

const DeckScreen = ({ navigation, route }) => {
    const { jobsData, jobsDispatch } = useContext(JobsContext);
    const [loading, setLoading]  = useState(true);
    let initialRegion = {
        lat: 37.3229978,
        long: -122.0321823,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
    };

    if(route.params) {
        const { region } = route.params;
        initialRegion = {
            ...region,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        }
    }

    const renderCard = (job) => {
        const description = job.description.substring(0, 150)
            .replace(/<p>/g,'')
            .replace(/<\/p>/g, '')
            .replace(/\\n/g, '');
            
        return (
            <Card key={ job.id }>
                <View style={{ height: 300 }}>
                    <MapView
                        scrollEnabled={ false }
                        cacheEnabled={ true }
                        style={{ flex: 1}}
                        initialRegion={ initialRegion }
                    >
                    </MapView>
                </View>
                <Card.Title style={ styles.title }>{ job.title }</Card.Title>
                <View style={ styles.detailsContainer }>
                    <Text style={styles.italics}>{ 
                        job.company.length > 16 ?
                        job.company.substring(0, 16) + '...' 
                        : 
                        job.company.substring(0, 16) 
                    }</Text>
                    <Text style={ styles.italics }>{ job.created_at }</Text>
                </View>
                <View>
                    <Text>{ description + '...' }</Text>
                </View>
            </Card>
        );
    };

    const renderNoMoreCards = () => {
        return (
            <Card>
                <Card.Title style={ styles.title }>No More Jobs</Card.Title>
                <Button 
                    title="New Search" 
                    icon={{ name: 'my-location', color: 'white' }}
                    buttonStyle={ styles.searchButton}
                    onPress={ () => navigation.navigate('map') }
                />
            </Card>
        );
    }

    useEffect(() => {
        navigation.setOptions({
            tabBarLabel: "Jobs",
            tabBarIcon: ({ focused }) => (
                <Icon
                    name='description'
                    size={ 25 }
                    color={ focused ? '#4876FF' : '#999999'}
                />
            )
        });
    }, []);

    useEffect(() => {
        if(jobsData || !route.params) setLoading(false);
    }, [jobsData])

    return (
        <View style={ styles.constainer }>
            { loading ? 
                <Spinner />
                :
                <View>
                    { (jobsData && route.params) ?
                        <Deck 
                            data={ jobsData.jobs }
                            renderCard={ renderCard }
                            renderNoMoreCards={ renderNoMoreCards }
                            onSwipeRight={ (job) => likeJob(job.id, initialRegion, jobsDispatch) }
                        />
                        :
                        renderNoMoreCards()
                    }
                </View>
            }
        </View>            
    );
};

const styles = StyleSheet.create({
    constainer: {
        marginTop: 20
    },
    searchButton: {
        marginHorizontal: 20,
        backgroundColor:'#009688'
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    title: {
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
    },
    italics: {
        fontStyle: 'italic'
    }
})

export default DeckScreen;