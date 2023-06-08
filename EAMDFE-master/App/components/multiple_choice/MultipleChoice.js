import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    reqContainer: {
        borderRadius: 20,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    reqText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    choicesContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10,
    },

    choice: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        margin: 5,


    },
    choiceText: {
        fontSize: 15,
        fontWeight: 'bold',

    }
})

export const Choice = ({disabled, content, width, height, pressedValue, index, onPressed}) => {

    const [pressed, setPressed] = useState(false);
    const [background, setBackground] = useState('lightblue');

    useEffect(() => {

        if (pressedValue === false) {
            setPressed(false);
            setBackground('lightblue');
        } else {
            setPressed(true);
            setBackground('lightgreen');
        }
    }, [pressedValue])


    const pressedButton = () => {
        if (pressed === false) {
            setPressed(true);
            setBackground('lightgreen');
            onPressed(index, true);
        } else {
            setPressed(false);
            setBackground('lightblue');
            onPressed(index, false);
        }
    }

    return (
        <View style={[styles.choice, {width: width, height: height, backgroundColor: background}]}>
            <TouchableOpacity disabled={disabled} onPress={pressedButton}
                              style={[styles.choice, {width: width, height: height, backgroundColor: background}]}>
                <Text style={styles.choiceText}>{content}</Text>
            </TouchableOpacity>
        </View>
    );

}

export const MultipleChoice = ({disabled, exercise, providedInput, inputFromOutside, onChange}) => {

    const width = screenWidth * 0.8;
    const height = screenHeight * 0.4;

    const [pressed, setPressed] = useState(providedInput ? inputFromOutside : new Array(exercise.choices.length).fill(false));
    const choicesR1 = useState([exercise.choices[0], exercise.choices[1]]);
    const choicesR2 = useState([exercise.choices[2], exercise.choices[3]]);

    useEffect(() => {
        const pos = exercise.choices.indexOf(exercise.correctChoice);
        if (pressed[pos] === true) {
            onChange(true, pressed);
        } else {
            onChange(false, pressed);
        }
    }, [pressed]);

    const onPressed = (index, value) => {
        const copy = [];
        pressed.map((el, i) => {
            copy[i] = i === index && value === true;
        });
        setPressed(copy);
    }

    return (
        <View style={[styles.container, {width, height}]}>
            <View style={[styles.reqContainer, {height: height * 0.3}]}>
                <Text style={styles.reqText}>{exercise.question}</Text>
            </View>

            <View style={[styles.choicesContainer, {height: height * 0.8, width}]}>
                <View>
                    {choicesR1.map((el, index) => (
                        <Choice
                            disabled={disabled}
                            width={width / 2 - 10}
                            height={height / 4}
                            content={exercise.choices[index]}
                            key={index}
                            pressedValue={pressed[index]}
                            onPressed={onPressed}
                            index={index}
                        />
                    ))}
                </View>
                <View>

                    {choicesR2.map((el, index) => (
                        <Choice
                            disabled={disabled}
                            width={width / 2 - 10}
                            height={height / 4}
                            content={exercise.choices[index + 2]}
                            key={index + 2}
                            pressedValue={pressed[index + 2]}
                            onPressed={onPressed}
                            index={index + 2}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}