import React, {useContext, useState} from "react";
import {
    SafeAreaView,
    Platform,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    FlatList,
    Dimensions,
    StatusBar
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {getHelperByCreatedByAndType} from "../../api/HelperService";
import {AuthContext} from "../../context/AuthContext";
import {Loading} from "../universal/Loading";

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
    },
    title: {
        borderRadius: 20,
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#8DA9B6'
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#8DA9B6',
        borderRadius: 30,
    },
    listItem: {
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'lightblue'
    },
    addHelperButton: {
        margin: 5,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
})

export const HelperListItem = ({item}) => {
    return (
        <View style={styles.listItem}>
            <Text style={{fontSize: 17, fontStyle: 'italic', fontWeight: 'bold'}}>{item.name}</Text>
        </View>
    )
}

export default ({navigation, route}) => {


    const helperType = route.params.helperType;
    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [helpers, setHelpers] = useState([]);

    const getHelpers = async () => {
        const res = await getHelperByCreatedByAndType(userAccessToken, userInfo.role === 'TEACHER' ? userInfo.otherId : userInfo.teacherId, helperType);
        setHelpers(res);
    }
    getHelpers();

    const goToAddHelper = () => {
        navigation.navigate('HelperCreationModal', {helperType: helperType})
    }

    const goToHelper = (helper) => {
        navigation.navigate('HelperScreen', {helper: helper})
    }

    const close = () => {
        navigation.pop();
    }

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{helperType} helpers</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={{margin: 10, height: screenHeight * 0.7}}>
                {userInfo.role === 'TEACHER' ?
                    (
                        <TouchableOpacity style={styles.addHelperButton} onPress={() => {
                            goToAddHelper()
                        }}>
                            <AntDesign name="plus" size={24} color="black"/>
                            <Text style={{fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', margin: 5}}>Add a
                                helper</Text>
                        </TouchableOpacity>
                    ) : null}

                {helpers.length > 0 ? (
                        <FlatList
                            data={helpers}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => goToHelper(item)}>
                                    <HelperListItem item={item}/>
                                </TouchableOpacity>
                            )}
                        />
                    ) :
                    <Loading/>}
            </View>
        </View>
    );
}