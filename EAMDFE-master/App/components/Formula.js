import React from "react";
import {StyleSheet, View} from "react-native";
import {MathJaxSvg} from "react-native-mathjax-html-to-svg";


const styles = StyleSheet.create({
    formulaContainer: {
        margin: 5,
        padding: 10,
        backgroundColor: 'pink',
        borderRadius: 20,
    },
})

export const Formula = ({formula, backgroundColor, textColor, onPress}) => {

    const background = backgroundColor === undefined ? 'pink' : backgroundColor;


    return (
        <View style={[styles.formulaContainer, {backgroundColor: background}]}>
            <MathJaxSvg
                fontSize={13}
                color={textColor === undefined ? 'black' : textColor}
            >
                {`$$ ${formula.content} $$`}
            </MathJaxSvg>
        </View>
    );
}