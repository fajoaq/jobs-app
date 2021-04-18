import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

const Spinner = () => (
    <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#0000ff"  />
    </View>
);

const styles = StyleSheet.create({
    spinnerContainer: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Spinner;