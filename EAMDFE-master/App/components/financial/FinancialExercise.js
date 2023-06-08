import React, {useState, useEffect} from "react";
import {TextInput, View, Text, Dimensions, StyleSheet, Platform} from "react-native";
import {MathJaxSvg} from "react-native-mathjax-html-to-svg";
import {SimpleInterest} from "../../util/FinancialUtils";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
    },
    box: {
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        width: screenWidth * 0.9,
    },
    form: {
        alignSelf: 'center',
        width: screenWidth * 0.9,
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'lightblue'
    },
    formField: {

        fontFamily: Platform.OS === 'ios' ? 'System' : "Roboto"
    },
    closeIcon: {
        alignSelf: 'flex-end',
        padding: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 200
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Apple SD Gothic Neo"
    },
    title: {
        fontSize: 15,
        fontFamily: Platform.OS === 'ios' ? "System" : "Roboto",
        fontWeight: 'bold',
        paddingBottom: 20
    },
    note: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    favorableOutcomesContainer: {
        flexDirection: 'column',
        width: 70,
        margin: 5
    },
    favorableOutcomesInput: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 7,
        height: 40,
        textAlign: 'center'
    },
    possibleOutcomesContainer: {
        flexDirection: 'column',
        width: 70,
        margin: 2
    },
    possibleOutcomesInput: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 7,
        height: 40,
        textAlign: 'center'
    },
    probabilityContainer: {
        flexDirection: 'column',
        width: 70,
        backgroundColor: 'white',
        borderRadius: 7,
    },
    probabilityNumerator: {
        backgroundColor: 'white',
        padding: 5,
        height: 40,
        textAlign: 'center',
        borderTopStartRadius: 7,
        borderTopEndRadius: 7,
    },
    probabilityDenominator: {
        backgroundColor: 'white',
        padding: 5,
        height: 40,
        textAlign: 'center',
        borderBottomStartRadius: 7,
        borderBottomEndRadius: 7,
    },
    label: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    question: {
        margin: 5,
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'justify'
    }

})

export const SimpleInterestComp = ({exercise, onChange, providedInput, inputFromOutside, disabled}) => {

    const expectedResult = SimpleInterest(exercise.capital, exercise.interestRate, exercise.timePeriod);

    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        id: NaN,
        question: "",
        capital: "",
        interestRate: "",
        timePeriod: "",
        interest: "",
        interestType: "",
        exerciseType: "",
        purpose: "",
        createdBy: NaN,
        formulaInterestRate: "",
        formulaTimePeriod: "",
        formulaCapital: "",
    });

    const updateInputField = (fieldName, value) => {
        const copy = {...input};
        copy[`${fieldName}`] = value;
        setInput(copy);
    }

    const checkValidity = () => {

        return parseInt(input.capital) === exercise.capital &&
            parseInt(input.interestRate) === exercise.interestRate &&
            parseInt(input.timePeriod) === exercise.timePeriod &&
            parseInt(input.interest) === expectedResult &&
            parseInt(input.formulaCapital) === exercise.capital &&
            parseInt(input.formulaInterestRate) === exercise.interestRate &&
            parseInt(input.formulaTimePeriod) === exercise.timePeriod;

    }

    useEffect(() => {
        if (checkValidity()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    return (

        <View style={[styles.container]}>
            <View style={styles.box}>

                <View style={{
                    borderRadius: 10,
                    backgroundColor: 'lightblue',
                    width: screenWidth * 0.9,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={styles.question}>{exercise.question}</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Capital: </Text>
                        <View style={[styles.favorableOutcomesContainer, {width: 70, height: 30,}]}>
                            <TextInput editable={!disabled} value={input.capital} keyboardType="numeric"
                                       style={[styles.favorableOutcomesInput, {height: 40,}]}
                                       onChangeText={(value) => updateInputField("capital", value)}/>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Interest rate(%):</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.interestRate} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("interestRate", value)}/>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Time period:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.timePeriod} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("timePeriod", value)}/>
                        </View>
                    </View>

                    <View style={[styles.field, {alignItems: 'center'}]}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Simple interest:</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <View style={[styles.possibleOutcomesContainer, {
                                width: 60,
                                height: 60,
                                justifyContent: 'center'
                            }]}>
                                <TextInput editable={!disabled} value={input.formulaCapital} keyboardType="numeric"
                                           style={styles.possibleOutcomesInput}
                                           onChangeText={(value) => updateInputField("formulaCapital", value)}/>
                            </View>

                            <View style={{justifyContent: 'center', margin: 4}}>
                                <MathJaxSvg fontSize={17}>
                                    {`$$ \\times $$`}
                                </MathJaxSvg>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                width: 60,
                                height: 80
                            }}>
                                <TextInput editable={!disabled} value={input.formulaInterestRate} keyboardType="numeric"
                                           style={{
                                               backgroundColor: 'white',
                                               padding: 2,
                                               height: 35,
                                               textAlign: 'center',
                                               borderRadius: 7,
                                           }} onChangeText={(value) => updateInputField("formulaInterestRate", value)}/>
                                <View style={{borderBottomWidth: 2, borderRadius: 10, width: 60, alignSelf: 'center'}}/>
                                <View style={{justifyContent: 'center', alignItems: 'center', height: 35}}>
                                    <Text style={{fontWeight: '500', fontSize: 20}}>100</Text>
                                </View>
                            </View>

                            <View style={{justifyContent: 'center', margin: 4}}>
                                <MathJaxSvg fontSize={17}>
                                    {`$$ \\times $$`}
                                </MathJaxSvg>
                            </View>

                            {/* m / 12 */}
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                width: 60,
                                height: 80
                            }}>
                                <TextInput editable={!disabled} value={input.formulaTimePeriod} keyboardType="numeric"
                                           style={{
                                               backgroundColor: 'white',
                                               padding: 2,
                                               height: 35,
                                               textAlign: 'center',
                                               borderRadius: 7,
                                           }} onChangeText={(value) => updateInputField("formulaTimePeriod", value)}/>
                                <View style={{borderBottomWidth: 2, borderRadius: 10, width: 60, alignSelf: 'center'}}/>
                                <View style={{justifyContent: 'center', alignItems: 'center', height: 35}}>
                                    <Text style={{fontWeight: '500', fontSize: 20}}>12</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Simple interest:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.interest} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("interest", value)}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

}


export const CompoundInterestComp = ({exercise, onChange, providedInput, inputFromOutside, disabled}) => {

    const expectedResult = exercise.interest;

    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        id: NaN,
        question: "",
        capital: "",
        interestRate: "",
        timePeriod: "",
        interest: "",
        interestType: "",
        exerciseType: "",
        purpose: "",
        createdBy: NaN,
        formulaInterestRate: "",
        formulaTimePeriod: "",
        formulaCapital: "",
    });

    const updateInputField = (fieldName, value) => {
        const copy = {...input};
        copy[`${fieldName}`] = value;
        setInput(copy);
    }

    const checkValidity = () => {

        return parseInt(input.capital) === exercise.capital &&
            parseInt(input.interestRate) === exercise.interestRate &&
            parseInt(input.timePeriod) === exercise.timePeriod &&
            parseInt(input.interest) === expectedResult &&
            parseInt(input.formulaCapital) === exercise.capital &&
            parseInt(input.formulaInterestRate) === exercise.interestRate &&
            parseInt(input.formulaTimePeriod) === exercise.timePeriod;

    }

    useEffect(() => {
        if (checkValidity()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    return (

        <View style={[styles.container]}>
            <View style={styles.box}>

                <View style={{
                    borderRadius: 10,
                    backgroundColor: 'lightblue',
                    width: screenWidth * 0.9,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={styles.question}>{exercise.question}</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Capital: </Text>
                        <View style={styles.favorableOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.capital} keyboardType="numeric"
                                       style={styles.favorableOutcomesInput}
                                       onChangeText={(value) => updateInputField("capital", value)}/>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Interest rate(%):</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.interestRate} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("interestRate", value)}/>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Time period:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.timePeriod} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("timePeriod", value)}/>
                        </View>
                    </View>

                    <View style={[styles.field, {alignItems: 'center'}]}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible', padding: 2,}]}>Compound
                            interest:</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <View style={[styles.possibleOutcomesContainer, {
                                width: 50,
                                height: 60,
                                justifyContent: 'center',
                                margin: 2,
                            }]}>
                                <TextInput editable={!disabled} value={input.formulaCapital} keyboardType="numeric"
                                           style={styles.possibleOutcomesInput}
                                           onChangeText={(value) => updateInputField("formulaCapital", value)}/>
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <MathJaxSvg fontSize={15}>
                                    {`$$\\times$$`}
                                </MathJaxSvg>
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <MathJaxSvg fontSize={35}>
                                    {`$$[$$`}
                                </MathJaxSvg>
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <MathJaxSvg fontSize={30}>
                                    {`$$($$`}
                                </MathJaxSvg>
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <Text style={{fontWeight: '500', fontSize: 15}}> 1 + </Text>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                width: 50,
                                height: 70
                            }}>
                                <TextInput editable={!disabled} value={input.formulaInterestRate} keyboardType="numeric"
                                           style={{
                                               alignSelf: 'center',
                                               backgroundColor: 'white',
                                               width: 30,
                                               padding: 2,
                                               height: 30,
                                               textAlign: 'center',
                                               borderRadius: 7,
                                           }} onChangeText={(value) => updateInputField("formulaInterestRate", value)}/>
                                <View style={{borderBottomWidth: 2, borderRadius: 10, width: 40, alignSelf: 'center'}}/>
                                <View style={{justifyContent: 'center', alignItems: 'center', height: 30}}>
                                    <Text style={{fontWeight: '500', fontSize: 15}}>100</Text>
                                </View>
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <MathJaxSvg fontSize={30}>
                                    {`$$)$$`}
                                </MathJaxSvg>
                            </View>

                            <View style={[styles.possibleOutcomesContainer, {
                                width: 20,
                                height: 20,
                                justifyContent: 'center',
                                alignSelf: 'flex-start'
                            }]}>
                                <TextInput editable={!disabled} value={input.formulaTimePeriod} keyboardType="numeric"
                                           style={[styles.possibleOutcomesInput, {height: 20, margin: 0,}]}
                                           onChangeText={(value) => updateInputField("formulaTimePeriod", value)}/>
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <Text style={{fontWeight: '500', fontSize: 15}}> - 1 </Text>

                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <MathJaxSvg fontSize={35}>
                                    {`$$]$$`}
                                </MathJaxSvg>
                            </View>

                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Compound interest:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.interest} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("interest", value)}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

}


export const CapitalComp = ({exercise, onChange, providedInput, inputFromOutside, disabled}) => {

    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        id: NaN,
        question: "",
        capital: "",
        interestRate: "",
        timePeriod: "",
        interest: "",
        interestType: "",
        exerciseType: "",
        purpose: "",
        createdBy: NaN,
        formulaInterestRate: "",
        formulaTimePeriod: "",
        formulaInterest: "",
    });

    const updateInputField = (fieldName, value) => {
        const copy = {...input};
        copy[`${fieldName}`] = value;
        setInput(copy);
    }

    const checkValidity = () => {

        return parseInt(input.capital) === exercise.capital &&
            parseInt(input.interest) === exercise.interest &&
            parseInt(input.interestRate) === exercise.interestRate &&
            parseInt(input.timePeriod) === exercise.timePeriod &&
            parseInt(input.formulaInterestRate) === exercise.interestRate &&
            parseInt(input.formulaTimePeriod) === exercise.timePeriod &&
            parseInt(input.formulaInterest) === exercise.interest;

    }

    useEffect(() => {
        if (checkValidity()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    return (

        <View style={[styles.container]}>
            <View style={styles.box}>

                <View style={{
                    borderRadius: 10,
                    backgroundColor: 'lightblue',
                    width: screenWidth * 0.9,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={styles.question}>{exercise.question}</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Simple interest: </Text>
                        <View style={[styles.favorableOutcomesContainer]}>
                            <TextInput editable={!disabled} value={input.interest} keyboardType="numeric"
                                       style={[styles.favorableOutcomesInput]}
                                       onChangeText={(value) => updateInputField("interest", value)}/>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Interest rate(%):</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.interestRate} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("interestRate", value)}/>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Time period:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.timePeriod} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("timePeriod", value)}/>
                        </View>
                    </View>

                    <View style={[styles.field, {alignItems: 'center'}]}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Capital:</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <View style={[styles.possibleOutcomesContainer, {
                                width: 60,
                                height: 60,
                                justifyContent: 'center'
                            }]}>
                                <TextInput editable={!disabled} value={input.formulaInterest} keyboardType="numeric"
                                           style={styles.possibleOutcomesInput}
                                           onChangeText={(value) => updateInputField("formulaInterest", value)}/>
                            </View>

                            <View style={{justifyContent: 'center', margin: 4}}>
                                <MathJaxSvg fontSize={17}>
                                    {`$$ \\times $$`}
                                </MathJaxSvg>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                width: 60,
                                height: 80
                            }}>

                                <View style={{justifyContent: 'center', alignItems: 'center', height: 35}}>
                                    <Text style={{fontWeight: '500', fontSize: 20}}>100</Text>
                                </View>
                                <View style={{borderBottomWidth: 2, borderRadius: 10, width: 60, alignSelf: 'center'}}/>
                                <TextInput editable={!disabled} value={input.formulaInterestRate} keyboardType="numeric"
                                           style={{
                                               backgroundColor: 'white',
                                               padding: 2,
                                               height: 35,
                                               textAlign: 'center',
                                               borderRadius: 7,
                                           }} onChangeText={(value) => updateInputField("formulaInterestRate", value)}/>

                            </View>

                            <View style={{justifyContent: 'center', margin: 4}}>
                                <MathJaxSvg fontSize={17}>
                                    {`$$ \\times $$`}
                                </MathJaxSvg>
                            </View>

                            {/* m / 12 */}
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                width: 60,
                                height: 80
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', height: 35}}>
                                    <Text style={{fontWeight: '500', fontSize: 20}}>12</Text>
                                </View>
                                <View style={{borderBottomWidth: 2, borderRadius: 10, width: 60, alignSelf: 'center'}}/>
                                <TextInput editable={!disabled} value={input.formulaTimePeriod} keyboardType="numeric"
                                           style={{
                                               backgroundColor: 'white',
                                               padding: 2,
                                               height: 35,
                                               textAlign: 'center',
                                               borderRadius: 7,
                                           }} onChangeText={(value) => updateInputField("formulaTimePeriod", value)}/>

                            </View>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Capital:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.capital} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("capital", value)}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}


export const InterestRateComp = ({exercise, onChange, providedInput, inputFromOutside, disabled}) => {

    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        id: NaN,
        question: "",
        capital: "",
        interestRate: "",
        timePeriod: "",
        interest: "",
        interestType: "",
        exerciseType: "",
        purpose: "",
        createdBy: NaN,
        formulaInterest: "",
        formulaCapitalAndTimePeriod: "",
    });

    const updateInputField = (fieldName, value) => {
        const copy = {...input};
        copy[`${fieldName}`] = value;
        setInput(copy);
    }

    const checkValidity = () => {

        return parseInt(input.capital) === exercise.capital &&
            parseInt(input.interest) === exercise.interest &&
            parseInt(input.timePeriod) === exercise.timePeriod &&
            parseInt(input.interestRate) === exercise.interestRate &&
            parseInt(input.formulaInterest) === exercise.interest &&
            parseInt(input.formulaCapitalAndTimePeriod) === (exercise.capital * exercise.timePeriod);

    }

    useEffect(() => {
        if (checkValidity()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    return (

        <View style={[styles.container]}>
            <View style={styles.box}>

                <View style={{
                    borderRadius: 10,
                    backgroundColor: 'lightblue',
                    width: screenWidth * 0.9,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={styles.question}>{exercise.question}</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Simple interest: </Text>
                        <View style={[styles.favorableOutcomesContainer]}>
                            <TextInput editable={!disabled} value={input.interest} keyboardType="numeric"
                                       style={[styles.favorableOutcomesInput]}
                                       onChangeText={(value) => updateInputField("interest", value)}/>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Capital:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.capital} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("capital", value)}/>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Time period:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.timePeriod} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("timePeriod", value)}/>
                        </View>
                    </View>


                    <View style={[styles.field, {alignItems: 'center'}]}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Interest rate:</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

                            <View style={{justifyContent: 'center', margin: 4}}>
                                <MathJaxSvg fontSize={17}>
                                    {`$$ 100 $$`}
                                </MathJaxSvg>
                            </View>
                            <View style={{justifyContent: 'center', margin: 4}}>
                                <MathJaxSvg fontSize={17}>
                                    {`$$ \\times $$`}
                                </MathJaxSvg>
                            </View>

                            <View style={[styles.possibleOutcomesContainer, {
                                width: 70,
                                height: 60,
                                justifyContent: 'center'
                            }]}>
                                <TextInput editable={!disabled} value={input.formulaInterest} keyboardType="numeric"
                                           style={styles.possibleOutcomesInput}
                                           onChangeText={(value) => updateInputField("formulaInterest", value)}/>
                            </View>

                            <View style={{justifyContent: 'center', margin: 4}}>
                                <MathJaxSvg fontSize={17}>
                                    {`$$ \\times $$`}
                                </MathJaxSvg>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                width: 70,
                                height: 80
                            }}>

                                <View style={{justifyContent: 'center', alignItems: 'center', height: 35}}>
                                    <Text style={{fontWeight: '500', fontSize: 20}}>12</Text>
                                </View>
                                <View style={{borderBottomWidth: 2, borderRadius: 10, width: 70, alignSelf: 'center'}}/>

                                <TextInput editable={!disabled} value={input.formulaCapitalAndTimePeriod}
                                           keyboardType="numeric" style={{
                                    backgroundColor: 'white',
                                    padding: 2,
                                    height: 35,
                                    textAlign: 'center',
                                    borderRadius: 7,
                                }} onChangeText={(value) => updateInputField("formulaCapitalAndTimePeriod", value)}/>

                            </View>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, {width: 80, overflow: 'visible',}]}>Interest rate:</Text>
                        <View style={styles.possibleOutcomesContainer}>
                            <TextInput editable={!disabled} value={input.interestRate} keyboardType="numeric"
                                       style={styles.possibleOutcomesInput}
                                       onChangeText={(value) => updateInputField("interestRate", value)}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}