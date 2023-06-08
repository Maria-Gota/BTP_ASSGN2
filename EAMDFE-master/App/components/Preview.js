import React from "react";
import {Dimensions, View} from "react-native";


import {LinSignTable} from "./sign_table/LinSignTable";
import {MultipleChoice} from "./multiple_choice/MultipleChoice";
import {QuadSignTable} from "./sign_table/QuadSignTable";
import {ProbabilitiesExercise} from "./probabilities/Probabilities";
import {FrequencyDistributionTable} from "./statistics/FrequencyDistributionTable";
import {RelativeFrequencyDistributionTable} from "./statistics/RelativeFrequencyDistributionTable";
import {CapitalComp, CompoundInterestComp, InterestRateComp, SimpleInterestComp} from "./financial/FinancialExercise";
import {MeasuresOfCT} from "./statistics/CentralTendencyMeasures";


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.7)',
//     },
//     box: {
//         borderRadius: 40,
//         top: screenHeight * 0.35,
//         alignSelf: 'center',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         backgroundColor: 'white',
//     },
//     closeIcon: {
//         alignSelf: 'flex-end',
//         paddingRight: 5,
//         paddingBottom: 20,
//     },
//     title: {
//         fontSize: 23,
//         fontWeight: 'bold',
//         paddingTop: 10,
//         paddingBottom: 20,
//         fontStyle: 'italic'
//     },
//     message: {
//         fontSize: 14,
//         margin: 20,
//         fontStyle: 'italic',
//         fontWeight: '500'
//     }
// })


export const ExercisePreview = ({type, exercise}) => {

    return (

        <View style={{margin: 10}}>
            {type === 'Linear function sign table' ?
                <LinSignTable
                    exercise={exercise}
                    providedInput={false}
                    onChange={() => {
                    }}
                    disabled={true}
                />
                : type === 'Quadratic function sign table' ?
                    <QuadSignTable
                        exercise={exercise}
                        providedInput={false}
                        onChange={() => console.log("\\")}
                        disabled={true}
                    />
                    : type === 'Probabilities' ?
                        <ProbabilitiesExercise
                            exercise={exercise}
                            disabled={true}
                            providedInput={false}
                            onChange={() => {
                            }}
                        />
                        : type === 'Multiple choice' ?
                            <MultipleChoice
                                disabled={true}
                                exercise={exercise}
                                providedInput={false}
                                onChange={() => {
                                }}
                            />
                            : type === 'Statistics' ?
                                (exercise.exerciseType === 'ABSOLUTE_FREQUENCY_TABLE' ?
                                        <FrequencyDistributionTable
                                            exercise={exercise}
                                            disabled={true}
                                            providedInput={false}
                                            onChange={() => {
                                            }}
                                        />
                                        : exercise.exerciseType === 'RELATIVE_FREQUENCY_TABLE' ?
                                            <RelativeFrequencyDistributionTable
                                                exercise={exercise}
                                                disabled={true}
                                                providedInput={false}
                                                onChange={() => {
                                                }}
                                            />
                                            : <MeasuresOfCT
                                                exercise={exercise}
                                                disabled={true}
                                                providedInput={false}
                                                onChange={() => {
                                                }}
                                            />
                                )
                                : (
                                    exercise.exerciseType === 'SIMPLE_INTEREST' ?
                                        <SimpleInterestComp
                                            exercise={exercise}
                                            disabled={true}
                                            providedInput={false}
                                            onChange={() => {
                                            }}
                                        />
                                        : exercise.exerciseType === 'COMPOUND_INTEREST' ?
                                            <CompoundInterestComp
                                                exercise={exercise}
                                                disabled={true}
                                                providedInput={false}
                                                onChange={() => {
                                                }}
                                            />
                                            : exercise.exerciseType === 'CAPITAL' ?
                                                <CapitalComp
                                                    exercise={exercise}
                                                    disabled={true}
                                                    providedInput={false}
                                                    onChange={() => {
                                                    }}
                                                />
                                                : <InterestRateComp
                                                    exercise={exercise}
                                                    disabled={true}
                                                    providedInput={false}
                                                    onChange={() => {
                                                    }}
                                                />
                                )
            }

        </View>
    );
}

// export const LinSignTableExercisePreview = ({exercise}) => {
//
//     return (
//
//         <View style={styles.container}>
//             <View style={[styles.box]}>
//
//                 <View style={{margin: 10}}>
//                     <LinSignTable
//                         exercise={exercise}
//                         providedInput={false}
//                         onChange={() => {
//                         }}
//                         disabled={true}
//                     />
//                 </View>
//             </View>
//         </View>
//     );
// }


// export const QuadSignTableExercisePreview = ({exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box]}>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//
//                     <View style={{margin: 2}}>
//                         <QuadSignTable
//                             exercise={exercise}
//                             providedInput={false}
//                             onChange={() => console.log("\\")}
//                             disabled={true}
//                         />
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// }


// export const MultipleChoiceExercisePreview = ({exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box]}>
//
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={[styles.title, {marginStart: 10,}]}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={[styles.closeIcon, {marginEnd: 10}]}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <MultipleChoice
//                         disabled={true}
//                         exercise={exercise}
//                         providedInput={false}
//                         onChange={() => {
//                         }}
//                     />
//                 </View>
//             </View>
//         </Modal>
//     );
// }


// export const ProbabilitiesExercisePreview = ({exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     height: screenHeight * 0.6,
//                     top: screenHeight * 0.15
//                 }]}>
//
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <ProbabilitiesExercise
//                         exercise={exercise}
//                         disabled={true}
//                         providedInput={false}
//                         onChange={() => {
//                         }}
//                     />
//                 </View>
//             </View>
//         </Modal>
//     );
// }

// export const FrequencyDistributionTableExercisePreview = ({exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     height: screenHeight * 0.6,
//                     top: screenHeight * 0.15
//                 }]}>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <ScrollView contentContainerStyle={{paddingBottom: 10, paddingRight: 5}}>
//                         <FrequencyDistributionTable
//                             exercise={exercise}
//                             disabled={true}
//                             providedInput={false}
//                             onChange={() => {
//                             }}
//                         />
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     );
// }


// export const RelativeFrequencyDistributionTableExercisePreview = ({exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     maxHeight: screenHeight * 0.6,
//                     top: screenHeight * 0.15
//                 }]}>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <ScrollView contentContainerStyle={{paddingBottom: 10, paddingRight: 5}}>
//
//                         <RelativeFrequencyDistributionTable
//                             exercise={exercise}
//                             disabled={true}
//                             providedInput={false}
//                             onChange={() => {
//                             }}
//                         />
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     );
// }

// export const CentralTendencyMeasuresExercisePreview = ({exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     height: screenHeight * 0.8,
//                     top: screenHeight * 0.15
//                 }]}>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <ScrollView contentContainerStyle={{paddingBottom: 10, paddingRight: 5}}>
//                         <MeasuresOfCT
//                             exercise={exercise}
//                             disabled={true}
//                             providedInput={false}
//                             onChange={() => {
//                             }}
//                         />
//                     </ScrollView>
//                 </View>
//
//             </View>
//         </Modal>
//     );
// }


// export const CapitalExercisePreview = ({isVisible, makeInvisible, exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     maxHeight: screenHeight * 0.7,
//                     top: screenHeight * 0.2
//                 }]}>
//
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//
//                     <ScrollView contentContainerStyle={{paddingBottom: 10, paddingRight: 5}}>
//                         <CapitalComp
//                             exercise={exercise}
//                             disabled={true}
//                             providedInput={false}
//                             onChange={() => {
//                             }}
//                         />
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     );
// }


// export const InterestRateExercisePreview = ({isVisible, makeInvisible, exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     height: screenHeight * 0.7,
//                     top: screenHeight * 0.15
//                 }]}>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <ScrollView contentContainerStyle={{paddingBottom: 10, paddingRight: 5}}>
//
//                         <InterestRateComp
//                             exercise={exercise}
//                             disabled={true}
//                             providedInput={false}
//                             onChange={() => {
//                             }}
//                         />
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     );
// }

// export const SimpleInterestExercisePreview = ({isVisible, makeInvisible, exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     height: screenHeight * 0.7,
//                     top: screenHeight * 0.15
//                 }]}>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <ScrollView contentContainerStyle={{paddingBottom: 10, paddingRight: 5}}>
//                         <SimpleInterestComp
//                             exercise={exercise}
//                             disabled={true}
//                             providedInput={false}
//                             onChange={() => {
//                             }}
//                         />
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     );
// }


// export const CompoundInterestExercisePreview = ({isVisible, makeInvisible, exercise}) => {
//
//     const [visible, setVisible] = useState(false);
//
//     useEffect(() => {
//         setVisible(isVisible);
//     }, [isVisible])
//
//     const close = () => {
//         makeInvisible();
//     }
//     return (
//         <Modal
//             animationType="fade"
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, {
//                     width: screenWidth * 0.95,
//                     height: screenHeight * 0.7,
//                     top: screenHeight * 0.15
//                 }]}>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
//                         <Text style={styles.title}>Preview</Text>
//                         <AntDesign
//                             name="close"
//                             size={30}
//                             color="black"
//                             style={styles.closeIcon}
//                             onPress={() => close()}
//                         />
//                     </View>
//                     <ScrollView contentContainerStyle={{paddingBottom: 10, paddingRight: 5}}>
//                         <CompoundInterestComp
//                             exercise={exercise}
//                             disabled={true}
//                             providedInput={false}
//                             onChange={() => {
//                             }}
//                         />
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     );
// }