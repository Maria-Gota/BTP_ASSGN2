import React, {useEffect, useState} from "react";
import {Text, Dimensions, StyleSheet, View} from "react-native";
import {MathJaxSvg} from "react-native-mathjax-html-to-svg";

import {CoeffInput, SignCell} from "./LinSignTable";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
    },
    table: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        borderRadius: 20,
        justifyContent: 'space-evenly'
    },
    headerLeft: {
        flexDirection: 'column',
    },
    contents: {
        borderRadius: 20,
        flexDirection: 'column',
        flex: 1,
    },
    headerLeftCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentsCell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7,
    },
    signsText: {
        fontSize: 17,
    },
    coefficients: {
        borderRadius: 13,
        backgroundColor: 'lightblue',
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    coefficientsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 10,
    }
});

export const QuadSignTable = ({disabled, exercise, providedInput, inputFromOutside, onChange}) => {

    console.log(exercise);
    const width = screenWidth * 0.9;
    const height = screenHeight * 0.4;
    const coefficientsHeight = height * 0.35;
    const requirementHeight = height * 0.2;
    const coefficientsWidth = width * 0.9;
    const coefficientsRowHeight = coefficientsHeight / 2;
    const rowHeight = height * 0.6;
    const headerWidth = width * 0.3;

    const coeffA = parseInt(exercise.a) === 1 ? ' ' : exercise.a;
    const coeffB = parseInt(exercise.b) < 0 ? exercise.b : parseInt(exercise.b) === 1 ? '+' : `+${exercise.b}`;
    const coeffC = parseInt(exercise.c) > 0 ? `+${exercise.c}` : exercise.c;

    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        id: NaN,
        purpose: "",
        createdBy: NaN,
        a: "",
        b: "",
        c: "",
        domainLowerBound: "",
        domainUpperBound: "",
        firstIntervalSign: "-",
        secondIntervalSign: "-",
        thirdIntervalSign: "-",
        x1: "",
        x2: "",
    })

    const updateField = (fieldName, value) => {

        const copy = {...input};
        copy[`${fieldName}`] = value;
        setInput(copy);
    }

    const check = () => {
        return input.firstIntervalSign === exercise.firstIntervalSign &&
            input.secondIntervalSign === exercise.secondIntervalSign &&
            input.thirdIntervalSign === exercise.thirdIntervalSign &&
            input.a === exercise.a && input.b === exercise.b && input.c === exercise.c &&
            input.x1 === exercise.x1 && input.x2 === exercise.x2;
    }

    useEffect(() => {
        if (check()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    const changeSign = (signField) => {

        if (input[signField] === "-") {
            updateField(signField, "+");
        } else {
            updateField(signField, "-");
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
                    {`$$ f(x) = ${exercise.a}x^2 ${coeffB}x ${coeffC} $$`}
                </MathJaxSvg>
            </View>
            <View style={[styles.coefficients, {height: coefficientsHeight}]}>

                <View style={[styles.coefficientsRow, {height: coefficientsRowHeight, width: coefficientsWidth}]}>
                    <CoeffInput disabled={disabled} label="a = " value={input.a}
                                onChangeText={(inp) => updateField("a", inp)}/>
                    <CoeffInput disabled={disabled} label="b = " value={input.b}
                                onChangeText={(inp) => updateField("b", inp)}/>
                    <CoeffInput disabled={disabled} label="c = " value={input.c}
                                onChangeText={(inp) => updateField("c", inp)}/>
                </View>
                <View style={[styles.coefficientsRow, {height: coefficientsRowHeight, width: coefficientsWidth}]}>
                    <CoeffInput disabled={disabled} label="x_1 = " value={input.x1}
                                onChangeText={(inp) => updateField("x1", inp)}/>
                    <CoeffInput disabled={disabled} label="x_2 = " value={input.x2}
                                onChangeText={(inp) => updateField("x2", inp)}/>
                </View>
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
                            {exercise.a.trim() === "" ||
                            exercise.b.trim() === "" ||
                            exercise.c.trim() === "" ?
                                `$$ ax^2 + bx + c $$` :
                                `$$ ${coeffA}x^2 ${coeffB}x ${coeffC} $$`}
                        </MathJaxSvg>
                    </View>
                </View>

                <View style={[styles.contents, {height: rowHeight}]}>
                    <View style={[styles.contentsCell, {borderBottomWidth: 1,}]}>

                        <MathJaxSvg
                            fontSize={18}
                            fontCache
                        >
                            {exercise.domainLowerBound.trim() === "" ? `$$ - \\infty $$` : `$$ ${exercise.domainLowerBound} $$`}
                        </MathJaxSvg>


                        <MathJaxSvg
                            fontSize={20}
                            fontCache
                        >
                            {input.x1 === "" ? `$$ x_1 $$` : `$$ ${input.x1} $$`}
                        </MathJaxSvg>

                        <MathJaxSvg
                            fontSize={20}
                            fontCache
                        >
                            {input.x2 === "" ? `$$ x_2 $$` : `$$ ${input.x2} $$`}
                        </MathJaxSvg>

                        <MathJaxSvg
                            fontSize={18}
                            fontCache
                        >
                            {exercise.domainUpperBound.trim() === "" ? `$$ \\infty $$` : `$$ ${exercise.domainUpperBound} $$`}
                        </MathJaxSvg>
                    </View>

                    <View style={[styles.contentsCell, {justifyContent: 'space-evenly'}]}>
                        <SignCell disabled={disabled}
                                  value={`${input.firstIntervalSign} ${input.firstIntervalSign} ${input.firstIntervalSign} `}
                                  onPress={() => changeSign("firstIntervalSign")}/>
                        <MathJaxSvg
                            fontSize={20}
                            fontCache
                        >
                            $$ 0 $$
                        </MathJaxSvg>
                        <SignCell disabled={disabled}
                                  value={`${input.secondIntervalSign} ${input.secondIntervalSign} ${input.secondIntervalSign}`}
                                  onPress={() => changeSign("secondIntervalSign")}/>

                        <MathJaxSvg
                            fontSize={20}
                            fontCache
                        >
                            $$ 0 $$
                        </MathJaxSvg>

                        <SignCell disabled={disabled}
                                  value={`${input.thirdIntervalSign} ${input.thirdIntervalSign} ${input.thirdIntervalSign}`}
                                  onPress={() => changeSign("thirdIntervalSign")}/>
                    </View>
                </View>
            </View>

        </View>
    );


};