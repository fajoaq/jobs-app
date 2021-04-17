import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';

import JobsContext from '../context/JobsContext';
import Deck from '../components/Deck';

const DeckScreen = ({ navigation, route }) => {
    const { region } = route.params;
    const { jobs } = useContext(JobsContext);

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
                        initialRegion={{ 
                            ...region,
                            latitudeDelta: 0.045,
                            longitudeDelta: 0.02
                        }}
                    >
                    </MapView>
                </View>
                <Card.Title>{ job.title }</Card.Title>
                <View style={ styles.detailContainer }>
                    <Text>{ job.company }</Text>
                    <Text>{ job.created_at }</Text>
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
                <Card.Title>No more cards</Card.Title>
            </Card>
        );
    }

    return (
        <View style={ styles.constainer }>
            <Deck 
                data={ jobs }
                renderCard={ renderCard }
                renderNoMoreCards={ renderNoMoreCards }
                onSwipeLeft={ () => {} }
                onSwipeRight={ () => {} }
            />
        </View>            
    );
};

const styles = StyleSheet.create({
    constainer: {
        marginTop: 20
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
})

export default DeckScreen;

/* { (jobs.length > 0) && 
    <View>
        { jobs.map((job) => 
            <Text key={job.id}>{ job.id }</Text>    
        )}
    </View>
} */