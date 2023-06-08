import React from "react";
import {StyleSheet, View, Text} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    }
})


export default ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>PROFILE SCREEN</Text>
        </View>
    );
}