import React, {useEffect, useState} from "react";
import {TextInput, Dimensions, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {MathJaxSvg} from "react-native-mathjax-html-to-svg";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },

    table: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        borderRadius: 20,
    },
    headerLeft: {
        flexDirection: 'column',
    },
    contents: {
        borderRadius: 20,
        flexDirection: 'column',
    },

    headerLeftCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentsCell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7,
    },
    signsText: {
        fontSize: 20,
        textAlign: 'right',
    },
    coefficients: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        borderRadius: 13,
        backgroundColor: 'lightblue',
        marginBottom: 10,
        paddingTop: 6,
    },
});

export const SignCell = ({value, onPress, disabled}) => {

    return (
        <View style={{width: 70, justifyContent: 'center', alignItems: 'center',}}>
            <TouchableOpacity disabled={disabled} onPress={onPress}>
                <Text style={styles.signsText}>{value}</Text>
            </TouchableOpacity>
        </View>
    );
}

export const CoeffInput = ({disabled, label, value, onChangeText}) => {

    return (
        <View style={{flexDirection: "row", justifyContent: 'space-evenly', marginBottom: 20, borderRadius: 10,}}>
            <MathJaxSvg
                fontSize={23}
                fontCache
            >
                {`$$ ${label} $$`}
            </MathJaxSvg>
            <TextInput editable={!disabled} keyboardType="numeric" style={{
                width: 50,
                height: 20,
                fontSize: 20,
                backgroundColor: "#F8F8F8",
                textAlign: 'center',
                marginLeft: 5,
                padding: 1.5,
                borderRadius: 5,
            }} value={value} onChangeText={onChangeText}/>
        </View>
    );
}

export const LinSignTable = ({disabled, exercise, onChange, providedInput, inputFromOutside}) => {

    const width = screenWidth * 0.9;
    const height = screenHeight * 0.4;
    const requirementHeight = height * 0.2;
    const coefficientsHeight = height * 0.1;
    const rowHeight = height * 0.6;
    const headerWidth = width * 0.25;
    const contentsRowWidth = width * 0.75;
    const coeffB = parseInt(exercise.b) > 0 ? `+${exercise.b}` : exercise.b;

    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        id: NaN,
        purpose: "",
        createdBy: NaN,
        a: "",
        b: "",
        domainLowerBound: "",
        domainUpperBound: "",
        firstIntervalSign: "-",
        secondIntervalSign: "-",
    })

    const updateField = (fieldName, value) => {

        const copy = {...input};
        copy[`${fieldName}`] = value;
        setInput(copy);
    }

    const check = () => {
        return input.firstIntervalSign === exercise.firstIntervalSign && input.secondIntervalSign === exercise.secondIntervalSign &&
            input.a === exercise.a && input.b === exercise.b;

    }

    useEffect(() => {
        if (check()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    const changeFirstIntervalSign = () => {
        if (input.firstIntervalSign === "-") {
            updateField("firstIntervalSign", "+");
        } else {
            updateField("firstIntervalSign", "-");
        }
    }

    const changeSecondIntervalSign = () => {
        if (input.secondIntervalSign === "-") {
            updateField("secondIntervalSign", "+");
        } else {
            updateField("secondIntervalSign", "-");
        }
    }


    return (
        <View style={[styles.container, {width}]}>

            <View style={{
                borderRadius: 10,
                backgroundColor: 'lightblue',
                height: requirementHeight,
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 20
            }}>
                <Text style={{margin: 5, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic'}}>Complete the table with
                    the proper sign for the function:</Text>
                <MathJaxSvg
                    fontSize={13}
                >
                    {`$$ f(x) = ${exercise.a}x ${coeffB} $$`}
                </MathJaxSvg>
            </View>

            <View style={[styles.coefficients, {height: coefficientsHeight}]}>

                <CoeffInput disabled={disabled} label="a = " value={input.a}
                            onChangeText={(inp) => updateField("a", inp)}/>
                <CoeffInput disabled={disabled} label="b = " value={input.b}
                            onChangeText={(inp) => updateField("b", inp)}/>

            </View>

            <View style={[styles.table,]}>
                <View style={[styles.headerLeft, {width: headerWidth, height: rowHeight}]}>
                    <View style={[styles.headerLeftCell, {borderRightWidth: 1, borderBottomWidth: 1}]}>
                        <MathJaxSvg
                            fontSize={23}
                            fontCache
                        >
                            $$ x $$
                        </MathJaxSvg>
                    </View>

                    <View style={[styles.headerLeftCell, {borderRightWidth: 1}]}>
                        <MathJaxSvg
                            fontSize={14}
                            fontCache
                        >
                            {exercise.a.length === 0 || exercise.b.length === 0 ? `$$ ax + b $$` : `$$ ${exercise.a}x ${coeffB} $$`}

                        </MathJaxSvg>
                    </View>
                </View>

                <View style={[styles.contents, {width: contentsRowWidth, height: rowHeight}]}>
                    <View style={[styles.contentsCell, {borderBottomWidth: 1}]}>

                        <MathJaxSvg
                            fontSize={17}
                            fontCache
                        >
                            {exercise.domainLowerBound.trim() === "" ? `$$ - \\infty $$` : `$$ ${exercise.domainLowerBound} $$`}
                        </MathJaxSvg>


                        <MathJaxSvg
                            fontSize={17}
                            fontCache
                        >
                            {input.a.length === 0 && input.b.length === 0 ? `$$ -  { b \\over a } $$` : `$$ -  { ${input.b} \\over ${input.a} }   $$`}
                        </MathJaxSvg>
                        <MathJaxSvg
                            fontSize={17}
                            fontCache
                        >
                            {exercise.domainUpperBound.trim() === "" ? `$$ \\infty $$` : `$$ ${exercise.domainUpperBound} $$`}

                        </MathJaxSvg>
                    </View>

                    <View style={[styles.contentsCell, {justifyContent: 'space-evenly'}]}>
                        <SignCell disabled={disabled}
                                  value={`${input.firstIntervalSign} ${input.firstIntervalSign} ${input.firstIntervalSign} ${input.firstIntervalSign}`}
                                  onPress={() => {
                                      changeFirstIntervalSign();
                                  }}/>
                        <View>
                            <MathJaxSvg
                                fontSize={20}
                                fontCache
                            >
                                $$ 0 $$
                            </MathJaxSvg>
                        </View>

                        <SignCell disabled={disabled}
                                  value={`${input.secondIntervalSign} ${input.secondIntervalSign} ${input.secondIntervalSign} ${input.secondIntervalSign}`}
                                  onPress={() => {
                                      changeSecondIntervalSign();
                                  }}/>
                    </View>
                </View>
            </View>

        </View>
    );
}
