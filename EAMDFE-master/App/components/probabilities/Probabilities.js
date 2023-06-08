import React, { useEffect, useState } from "react";
import { TextInput , View, Text , StyleSheet , Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{ 
        justifyContent: 'flex-start',
    },
    box: {
        borderRadius: 20, 
        alignSelf:'center', 
        alignItems:'center' , 
        width: screenWidth * 0.9 , 
    },
    form: {
        alignSelf:'center',
        alignItems: 'center',
        width: screenWidth * 0.7,
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'lightblue'
    },
    formField:{
        
        fontFamily: Platform.OS === 'ios' ? 'System' : "Roboto"
    },
    closeIcon: {
        alignSelf: 'flex-end' , 
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
        fontFamily: Platform.OS === 'ios' ? "System": "Roboto", 
        fontWeight: 'bold', 
        paddingBottom: 20
    },
    note: {
        fontSize: 10, 
        fontStyle:'italic'
    },
    favorableOutcomesContainer: {
      flexDirection:'column', 
      width: 70, 
      margin: 5
    },
    favorableOutcomesInput: {
      backgroundColor:'white', 
      padding: 5,
      borderRadius: 7, 
      height: 40, 
      textAlign:'center' 
    },
    possibleOutcomesContainer: {
      flexDirection:'column', 
      width:70, 
      margin: 5},
    possibleOutcomesInput: {
      backgroundColor:'white', 
      padding: 5,
      borderRadius: 7, 
      height: 40, 
      textAlign:'center' 
    },
    probabilityContainer: {
      flexDirection:'column', 
      width: 70, 
      backgroundColor:'white' , 
      borderRadius: 7, 
    },
    probabilityNumerator: {
      backgroundColor:'white', 
      padding: 5,  
      height: 40, 
      textAlign:'center', 
      borderTopStartRadius: 7, 
      borderTopEndRadius: 7,
    },
    probabilityDenominator: {
      backgroundColor:'white', 
      padding: 5,  
      height: 40, 
      textAlign:'center', 
      borderBottomStartRadius: 7, 
      borderBottomEndRadius: 7,
    },
    label: {
      fontSize: 15, 
      fontStyle:'italic', 
      fontWeight:'bold'
    },
    field: {
      flexDirection: 'row', 
      alignItems:'center', 
      margin:10,
    },
    question: {
      margin: 5, 
      fontSize: 15, 
      fontWeight: 'bold', 
      fontStyle: 'italic' , 
      textAlign: 'justify'
    }
})

export const ProbabilitiesExercise = ({disabled , exercise, providedInput , inputFromOutside, onChange}) => {

  const [ input , setInput ] = useState(providedInput ? inputFromOutside : {
    id: NaN,
    question: "",
    createdBy: NaN,
    purpose: "",
    favorableOutcomes: "",
    possibleOutcomes: "",
    probabilityNumerator: "",
    probabilityDenominator: "",
  })

  const updateField = (fieldName , value) => {

    const copy = {...input};
    copy[`${fieldName}`] = value;
    setInput(copy);
  }

  const expectedProbability = exercise.favorableOutcomes / exercise.possibleOutcomes;

  const checkValidity = () => {

    return !Number.isNaN(parseInt(input.favorableOutcomes)) && parseInt(input.favorableOutcomes) !== 0 &&
        !Number.isNaN(parseInt(input.probabilityNumerator)) && parseInt(input.probabilityNumerator) !== 0 &&
        !Number.isNaN(parseInt(input.probabilityDenominator)) && parseInt(input.probabilityDenominator) !== 0;
  }

  useEffect(() => {

    if(checkValidity()) {
      if ( parseInt(input.favorableOutcomes) === exercise.favorableOutcomes && 
           parseInt(input.possibleOutcomes) === exercise.possibleOutcomes && 
           parseInt(input.probabilityNumerator) === exercise.favorableOutcomes &&
           parseInt(input.probabilityDenominator) === exercise.possibleOutcomes &&
           parseInt(input.probabilityNumerator)/parseInt(input.probabilityDenominator) === expectedProbability){
            
        onChange(true,input);
      } else {
        onChange(false,input);
      }
    } else {
      onChange(false,input);
    }
  },[input])

  return(
     
    <View style={styles.container}>
      <View style={styles.box}>
          
        <View style={{borderRadius: 10, backgroundColor: 'lightblue', width:screenWidth * 0.9, flexDirection: 'column', alignItems: 'center' , marginBottom: 20}}>
          <Text style={styles.question}>{exercise.question}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={[styles.label , {width: 80, overflow:'visible',}]}>Favorable outcomes </Text>
            <View style={styles.favorableOutcomesContainer}>
              <TextInput editable={!disabled} value={input.favorableOutcomes} keyboardType="numeric" style={styles.favorableOutcomesInput} onChangeText={(value) => updateField("favorableOutcomes",value)} />
            </View>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label , {width: 80, overflow:'visible',}]}>Possible outcomes </Text>
            <View style={styles.possibleOutcomesContainer}>
              <TextInput editable={!disabled} value={input.possibleOutcomes} keyboardType="numeric" style={styles.possibleOutcomesInput} onChangeText={(value) => updateField("possibleOutcomes",value)} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Probability </Text>
            <View style={styles.probabilityContainer}>
              <TextInput editable={!disabled} value={input.probabilityNumerator} keyboardType="numeric" style={styles.probabilityNumerator} onChangeText={(value) => updateField("probabilityNumerator",value)} />
              <View style={{borderBottomWidth: 1 , width: 60, alignSelf:'center'}} />
              <TextInput editable={!disabled} value={input.probabilityDenominator} keyboardType="numeric" style={styles.probabilityDenominator} onChangeText={(value) => updateField("probabilityDenominator",value)} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}