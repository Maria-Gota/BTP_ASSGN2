import React, {useEffect, useState} from "react";
import {StyleSheet, Modal, Text, View, TouchableOpacity} from "react-native";
import Lottie from 'lottie-react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    checkmark: {
        width: 150,
        height: 150
    },
    message: {
        fontSize: 15,
        margin: 20,
        marginBottom: 40,
        fontStyle: 'italic',
        fontWeight: '500',
        overflow: 'visible',
        color: 'white',
        textAlign: 'center',
    },
    okButton: {
        borderWidth: 1,
        padding: 20,
        margin: 20,
        borderRadius: 35,
        backgroundColor: '#39b54a',
    },
    okButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
})


export const SuccessfulActionPopup = ({isVisible, makeInvisible, message}) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible])

    const close = () => {
        makeInvisible();
    }
    return (
        <Modal animationType="fade" visible={visible} transparent>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Lottie style={styles.checkmark} source={require("../../assets/animations/127266-checkmark.json")}
                            autoPlay/>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity onPress={close} style={styles.okButton}>
                        <Text style={styles.okButtonText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}