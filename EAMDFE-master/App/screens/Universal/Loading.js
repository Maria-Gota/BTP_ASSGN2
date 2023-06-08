import React from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
})

export const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color="blue"
            />
        </View>

    );
}

export default () => {

    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color="blue"
            />
        </View>

    );
}