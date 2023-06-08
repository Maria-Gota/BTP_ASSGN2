import React, {useState, useEffect, useContext} from "react";
import {StatusBar, Text, ScrollView, Dimensions, StyleSheet, View, SafeAreaView, Platform} from "react-native";

import {AuthContext} from "../../context/AuthContext";
import {getNotificationByRecipientId, updateNotification} from "../../api/NotificationService";
import {Notification, notificationBackgroundColor} from "../student/StudentHome";

const screenHeight = Dimensions.get('window').height;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        marginBottom: navigationBarHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})

export default ({navigation, route}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
        const response = await getNotificationByRecipientId(userAccessToken, userInfo.userId);
        setNotifications(response);
    }

    const getStudentById = async (studentId) => {
        const response = await getStudentById(studentId);
        return response;
    }

    const updateNotificationStatus = async (notification) => {

        const response = await updateNotification(userAccessToken, notification);
    }

    const viewNotification = (notification) => {

        switch (notification.type) {
            case "STUDENT_ENROLLMENT":
                navigation.navigate('StudentsTab');
                break;

            case "STUDENT_REQUEST":
                navigation.navigate('StudentsTab');
                break;

            default:
                break;
        }
    }

    const handlePress = (notification) => {

        const copy = {...notification};
        copy.viewed = true;
        copy.dateOfAccess = new Date();
        updateNotificationStatus(copy);
        viewNotification(copy);
    }

    useEffect(() => {
        getNotifications();
    }, [])

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <ScrollView>
                {
                    notifications.length === 0 ? (
                        <Text>Nothing to show</Text>
                    ) : (
                        notifications.map((value, index) => (
                            <Notification
                                key={value.id}
                                notification={value}
                                viewedBackgroundColor='white'
                                notViewedBackgroundColor={notificationBackgroundColor(value.type)}
                                textColor={value.viewed ? notificationBackgroundColor(value.type) : 'white'}
                                onPress={() => handlePress(value)}
                            />
                        ))
                    )
                }
            </ScrollView>
        </View>
    );

}