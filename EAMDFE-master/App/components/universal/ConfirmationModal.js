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
        width: 110,
        height: 110
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
    okButtonAction: {
        borderWidth: 1,
        padding: 15,
        margin: 20,
        borderRadius: 35,
        backgroundColor: 'white',
    },
    okButtonTitle: {
        color: '#f3b041',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    dismissButtonAction: {
        borderWidth: 1,
        padding: 15,
        margin: 20,
        borderRadius: 35,
        backgroundColor: '#f3b041',
    },
    dismissButtonTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
})


export const ConfirmationPopup = ({
                                      isVisible,
                                      okButtonAction,
                                      okButtonTitle,
                                      dismissButtonAction,
                                      dismissButtonTitle,
                                      message
                                  }) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible])

    return (
        <Modal animationType="fade" visible={visible} transparent>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Lottie style={styles.checkmark} source={require("../../assets/animations/4975-question-mark.json")}
                            autoPlay/>
                    <Text style={styles.message}>{message}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={okButtonAction} style={styles.okButtonAction}>
                            <Text style={styles.okButtonTitle}>{okButtonTitle}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={dismissButtonAction} style={styles.dismissButtonAction}>
                            <Text style={styles.dismissButtonTitle}>{dismissButtonTitle}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}