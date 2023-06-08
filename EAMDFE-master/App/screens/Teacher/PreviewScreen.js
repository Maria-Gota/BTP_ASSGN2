import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {ExercisePreview} from "../../components/Preview";
import {AntDesign} from "@expo/vector-icons";
import React from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    closeIcon: {
        padding: 10,
        margin: 10,
        alignSelf: 'flex-end',
        backgroundColor: 'black',
        borderRadius: 30,
    },
    box: {
        margin: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        margin: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        overflow: 'visible',
        color: 'white',
        textAlign: 'center',
    },
})

export default ({navigation, route}) => {

    const exerciseType = route.params.exerciseType;
    const exercise = route.params.exercise;


    const close = () => {
        navigation.pop();
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                <AntDesign
                    name="close"
                    size={25}
                    color="white"
                />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.box}>
                <Text style={styles.title}>Preview</Text>
                <View style={{alignSelf: 'center'}}>
                    <ExercisePreview
                        type={exerciseType}
                        exercise={exercise}
                    />
                </View>
            </ScrollView>
        </View>
    );
}