import React, {useState, useEffect, useContext} from "react";
import {
    StatusBar,
    TouchableOpacity,
    Platform,
    Text,
    ScrollView,
    StyleSheet,
    View,
    SafeAreaView,
    Button
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {Form, FormItem, Picker} from "react-native-form-component";

import {AuthContext} from "../../context/AuthContext";
import {
    getLinearSignTableByCreatedByAndHelperPurpose,
    getQuadraticSignTableByCreatedByAndHelperPurpose
} from "../../api/SignTableExerciseService"

import {getProbabilitiesExerciseByCreatedByAndHelperPurpose} from "../../api/ProbabilitiesExerciseService"
import {getStatisticsExerciseByCreatedByAndHelperPurpose} from "../../api/StatisticsExerciseService"
import {getFinancialExerciseByCreatedByAndHelperPurpose} from "../../api/FinancialExerciseService"
import {getFormulaByType} from "../../api/FormulaService"
import {createHelper} from "../../api/HelperService";
import {listItem} from "../../components/ListItem";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FC8E43',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    box: {
        justifyContent: 'space-evenly',
        borderRadius: 20,
    },
    form: {
        padding: 5,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FC8E43'
    },
    formField: {
        borderRadius: 20,
    },

    formLabel: {
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: '500',
        fontStyle: 'italic',
        color: 'white',
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#EB6F1B',
        borderRadius: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EB6F1B',
        alignSelf: 'center',
        borderRadius: 30,
        width: 200,
        height: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontStyle: 'italic',
        fontWeight: 'bold',
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
        backgroundColor: '#EB6F1B'
    },
    pickerIconStyle: {
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    note: {
        fontSize: 15,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontWeight: '500',
        margin: 5,
        color: 'white',
    },
})

export default ({navigation, route}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);
    const helperType = route.params.helperType;
    const [helper, setHelper] = useState({
        id: NaN,
        type: helperType,
        name: "",
        createdBy: userInfo.otherId,
        exampleId: NaN,
        formulaId: NaN,
        content: "",
        exampleExplanation: "",
    })
    const [formulas, setFormulas] = useState([]);
    const [formulasForPicker, setFormulasForPicker] = useState([]);
    const [examples, setExamples] = useState([]);
    const [exampleColors, setExampleColors] = useState([]);


    const close = () => {
        navigation.pop();
    }


    const validateInput = () => {

        if (helper.name.length > 0 && helper.content.length > 0) {

            if (!Number.isNaN(helper.exampleId)) {
                return helper.exampleExplanation.length > 0;
            }
            return true;
        }
        return false;
    }

    const failOkAction = () => {
        navigation.pop();
    }

    const successOkAction = () => {
        navigation.pop();
        navigation.navigate('Resources');
    }

    const submit = async () => {
        if (validateInput()) {

            const res = await createHelper(userAccessToken, helper);

            if (res === 200) {
                navigation.navigate('SuccessfulActionPopup', {
                    message: 'Helper created successfully.',
                    okButtonAction: successOkAction,
                    okButtonTitle: 'Ok'
                });

            } else {
                navigation.navigate('FailedActionPopup', {
                    message: 'Failed to create the helper.\n Please try again.',
                    okButtonAction: failOkAction,
                    okButtonTitle: 'Ok'
                });
            }
        } else {
            navigation.navigate('FailedActionPopup', {
                message: 'Some of the fields are invalid.\n Check again and resubmit.',
                okButtonAction: failOkAction,
                okButtonTitle: 'Ok'
            });
        }
    }

    const getFormulas = async () => {
        const response = await getFormulaByType(userAccessToken, helperType);
        setFormulas(response);
    }

    const getLinearSignTableExercises = async () => {
        const res = await getLinearSignTableByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExamples(res);


    }

    const getQuadraticSignTableExercises = async () => {
        const res = await getQuadraticSignTableByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExamples(res);
    }

    const getProbabilitiesExercises = async () => {

        const res = await getProbabilitiesExerciseByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExamples(res);
    }

    const getStatisticsExercises = async () => {

        const res = await getStatisticsExerciseByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExamples(res);
    }

    const getFinancialExercises = async () => {
        const res = await getFinancialExerciseByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExamples(res);
    }

    // what type of exercises to request from the server
    const getExamples = () => {
        switch (helperType) {
            case "Linear function sign table":
                getLinearSignTableExercises();
                break;

            case "Quadratic function sign table":
                getQuadraticSignTableExercises();
                break;

            case "Probabilities":
                getProbabilitiesExercises();
                break;

            case "Statistics":
                getStatisticsExercises();
                break;

            case "Financial":
                getFinancialExercises();
                break;

            default:
                break;
        }
    }

    const addHelperField = (fieldName, value) => {

        const copy = {...helper};
        copy[fieldName] = value;

        setHelper(copy);
    }

    useEffect(() => {
        getExamples();
        getFormulas();
    }, []);

    const onExamplePicked = (index) => {
        const copy = [...exampleColors];

        if (exampleColors[index]) {
            copy[index] = false;
            setExampleColors(copy);
            addHelperField('exampleId', NaN);
        } else {
            copy.forEach((value, i) => {
                if (index === i) {
                    copy[i] = true;
                } else if (value) {
                    copy[i] = false;
                }
            });
            setExampleColors(copy);
            addHelperField('exampleId', examples[index].id);

        }
    }

    useEffect(() => {
        setExampleColors(new Array(examples.length).fill(false));
    }, [examples])

    useEffect(() => {

        const temp = [];
        formulas.map((value, index, arr) => {
            temp.push({
                label: value.name,
                value: value,
            })
        });

        setFormulasForPicker(temp);

    }, [formulas])

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{helperType} helper</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                contentContainerStyle={styles.box}
                showsVerticalScrollIndicator={false}
            >
                <Form
                    buttonText="Submit"
                    onButtonPress={() => submit()}
                    buttonStyle={styles.button}
                    buttonTextStyle={styles.buttonText}
                    style={styles.form}
                >

                    <FormItem
                        label="Helper name:"
                        isRequired
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={helper.name}
                        maxLength={50}
                        onChangeText={(input) => addHelperField('name', input)}
                    />

                    <FormItem
                        label="Contents:"
                        isRequired
                        textArea
                        maxLength={490}
                        labelStyle={styles.formLabel}
                        value={helper.content}
                        style={styles.formField}
                        onChangeText={(input) => addHelperField('content', input)}
                    />

                    {formulas.length > 0 ? (
                        <Picker
                            label="Formula:"
                            items={formulasForPicker}
                            labelStyle={styles.formLabel}
                            buttonStyle={styles.formField}
                            iconWrapperStyle={styles.pickerIconStyle}
                            selectedValue={helper.formulaId}
                            onSelection={(item) => {
                                addHelperField('formulaId', item.value.id);
                            }}
                        />
                    ) : (
                        <View>
                            <Text style={styles.formLabel}>Formula:</Text>
                            <Text style={styles.note}>No formulas for this type of exercise.</Text>
                        </View>
                    )
                    }
                    <Text style={styles.formLabel}>Example:</Text>
                    {examples.length > 0 ? (
                        <>
                            {examples.map((item, index) => (
                                <TouchableOpacity style={{margin: 5, borderRadius: 20}} key={index}
                                                  onPress={() => onExamplePicked(index)}>
                                    {listItem(item, helperType, exampleColors[index], 'white')}
                                </TouchableOpacity>
                            ))}
                            {Number.isNaN(helper.exampleId) ? null :
                                (
                                    <FormItem
                                        label="Example explanation:"
                                        isRequired
                                        textArea
                                        maxLength={490}
                                        labelStyle={styles.formLabel}
                                        value={helper.exampleExplanation}
                                        style={styles.formField}
                                        onChangeText={(input) => addHelperField('exampleExplanation', input)}
                                    />
                                )}
                        </>
                    ) : (
                        <View>
                            <Text style={styles.note}>No examples exercises added yet.</Text>
                            <Button title="Add example"
                                    onPress={() => navigation.navigate('ExamplesList', {exerciseType: helperType})}/>
                        </View>
                    )
                    }

                </Form>
            </ScrollView>

        </View>
    );

}