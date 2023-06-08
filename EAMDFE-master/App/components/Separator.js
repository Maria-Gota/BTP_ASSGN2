import React from "react";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({

    separator: {
        borderWidth: 1,
    }

})


export const Separator = () => {

    return (
        <View style={styles.separator}/>
    );
}