import React from "react";
import { TouchableOpacity , StyleSheet , Text } from "react-native";

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        marginTop: 20,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    }
});

export const Button = ({ onPress , text ,disabled }) => {


    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button]}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
};