import React from "react";
import {StatusBar, View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})


export default () => {

    return (
        <View style={styles.container}>
            <StatusBar/>

            <Text> SETTINGS </Text>
        </View>
    );

}