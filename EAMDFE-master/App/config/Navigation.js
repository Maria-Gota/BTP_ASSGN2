import React, {useContext} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Ionicons, Entypo, FontAwesome5, MaterialIcons} from '@expo/vector-icons';

import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Welcome from "../screens/universal/Welcome";
import Login from "../screens/universal/Login";
import TeacherRegistration from "../screens/universal/TeacherRegistration";
import Stats from "../screens/student/Stats";
import {Loading} from "../screens/universal/Loading";
import Settings from "../screens/universal/Settings";
import {AuthContext} from "../context/AuthContext";
import AccountType from "../screens/universal/AccountType";
import Intro from "../screens/universal/Intro"
import StudentRegistration from "../screens/universal/StudentRegistration";
import Students from "../screens/teacher/Students";
import Resources from "../screens/teacher/Resources";
import Home from "../screens/teacher/TeacherHome";
import Logout from "../screens/universal/Logout";
import Profile from "../screens/universal/Profile";
import MultipleChoiceCreationModal from "../screens/teacher/MultipleChoiceCreationModal";
import LinSignTableCreationModal from "../screens/teacher/LinSignTableCreationModal";
import QuadSignTableCreationModal from "../screens/teacher/QuadSignTableCreationModal";
import StudentInfo from "../screens/teacher/StudentInfo";
import ExercisesList from "../screens/teacher/ExercisesList";
import StudentResources from "../screens/student/StudentResources";
import StudentHome from "../screens/student/StudentHome";
import StudentExercisesList from "../screens/student/StudentExercisesList";
import ExerciseScreen from "../screens/student/ExerciseScreen";
import ProbabilitiesCreationModal from "../screens/teacher/ProbabilitiesCreationModal";
import StatisticsExerciseCreationModal from "../screens/teacher/StatisticsExerciseCreationModal";
import FinancialExerciseCreationModal from "../screens/teacher/FinancialExerciseCreationModal";
import QuizzesList from "../screens/teacher/QuizzesList";
import QuizSummary from "../screens/teacher/QuizSummary";
import QuizCreationModal from "../screens/teacher/QuizCreationModal";
import StudentQuizzesList from "../screens/student/StudentQuizzesList";
import QuizScreen from "../screens/student/QuizScreen";
import StudentQuizSummary from "../screens/student/StudentQuizSummary";
import QuizPerformanceSummary from "../screens/teacher/QuizPerformanceSummary";
import ConfirmationPopup from "../screens/universal/ConfirmationPopup";
import SuccessfulActionPopup from "../screens/universal/SuccessfulActionPopup";
import FailedActionPopup from "../screens/universal/FailedActionPopup";
import ActionStartedPopup from "../screens/universal/ActionStartedPopup";
import QuizResultsScreen from "../screens/student/QuizResultsScreen";
import SolvedExercisePopup from "../screens/student/SolvedExercisePopup";
import ExerciseSolution from "../screens/student/ExerciseSolution";
import ExchangeEffortPointsPopup from "../screens/student/ExchangeEffortPointsPopup";
import HelpersList from "../screens/teacher/HelpersList";
import HelperCreationModal from "../screens/teacher/HelperCreationModal";
import ExamplesList from "../screens/teacher/ExamplesList";
import HelperScreen from "../screens/teacher/HelperScreen";
import PreviewScreen from "../screens/teacher/PreviewScreen";

// available to not logged in
const InitialStack = createNativeStackNavigator();

const InitialStackScreen = () => (

    <InitialStack.Navigator initialRouteName="Welcome">

        <InitialStack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <InitialStack.Screen name="TeacherRegistration" component={TeacherRegistration} options={{headerShown: false}}/>
        <InitialStack.Screen name="StudentRegistration" component={StudentRegistration} options={{headerShown: false}}/>
        <InitialStack.Screen name="AccountType" component={AccountType} options={{headerShown: false}}/>
        <InitialStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <InitialStack.Screen name="Intro" component={Intro} options={{headerShown: false, animation: "fade"}}/>
        <InitialStack.Screen
            name="ConfirmationPopup"
            component={ConfirmationPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <InitialStack.Screen
            name="SuccessfulActionPopup"
            component={SuccessfulActionPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <InitialStack.Screen
            name="FailedActionPopup"
            component={FailedActionPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

    </InitialStack.Navigator>
);

// available for users with Teacher role that are logged in
const TeacherHomeStack = createNativeStackNavigator();

const TeacherHomeStackScreen = () => {

    const navigation = useNavigation();


    return (
        <TeacherHomeStack.Navigator>
            <TeacherHomeStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => {
                        return (
                            <MaterialIcons name="menu-open" size={24} color="black"
                                           onPress={() => navigation.openDrawer()}/>

                        )
                    }
                }}
            />
        </TeacherHomeStack.Navigator>
    );
}

const TeacherStudentsStack = createNativeStackNavigator();

const TeacherStudentsStackScreen = () => {

    const navigation = useNavigation();

    return (
        <TeacherStudentsStack.Navigator
            screenOptions={{
                presentation: 'modal'
            }}
        >
            <TeacherStudentsStack.Screen
                name="Students"
                component={Students}
                options={{
                    headerLeft: () => {
                        return (
                            <MaterialIcons name="menu-open" size={24} color="black"
                                           onPress={() => navigation.openDrawer()}/>
                        )
                    }
                }}
            />
        </TeacherStudentsStack.Navigator>
    );
}


const TeacherResourcesStack = createNativeStackNavigator();

const TeacherResourcesStackScreen = () => {

    const navigation = useNavigation();

    return (
        <TeacherResourcesStack.Navigator
            screenOptions={{
                presentation: 'modal',
            }}
        >
            <TeacherResourcesStack.Screen
                name="Resources"
                component={Resources}
                options={{
                    headerLeft: () => {
                        return (
                            <MaterialIcons name="menu-open" size={24} color="black"
                                           onPress={() => navigation.openDrawer()}/>

                        )
                    }
                }}
            />
        </TeacherResourcesStack.Navigator>
    );
}


const TeacherBottomTab = createBottomTabNavigator();

const TeacherBottomTabScreen = () => (
    <TeacherBottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
        }}
        ta
    >
        <TeacherBottomTab.Screen
            name="HomeTab"
            component={TeacherHomeStackScreen}
            options={{
                tabBarLabel: "Home",
                tabBarStyle: {
                    elevation: 0,
                },
                tabBarIcon: () => (
                    <Entypo name="home" size={24} color="black"/>

                ),
            }}
        />

        <TeacherBottomTab.Screen
            name="StudentsTab"
            component={TeacherStudentsStackScreen}
            options={{
                tabBarStyle: {
                    elevation: 0,
                },
                tabBarLabel: 'Students',
                tabBarIcon: () => (
                    <Ionicons name="people" size={24} color="black"/>
                )
            }}
        />

        <TeacherBottomTab.Screen
            name="ResourcesTab"
            component={TeacherResourcesStackScreen}
            options={{
                tabBarStyle: {
                    elevation: 0,
                },
                tabBarLabel: 'Resources',
                tabBarIcon: () => (
                    <FontAwesome5 name="pencil-ruler" size={24} color="black"/>
                )
            }}
        />

    </TeacherBottomTab.Navigator>
);

const TeacherDrawer = createDrawerNavigator();

const TeacherDrawerScreen = () => {

    const {logout} = useContext(AuthContext);
    return (
        <TeacherDrawer.Navigator
            drawerPosition="right"
            initialRouteName="TeacherBottomTab"
            screenOptions={{
                headerShown: false
            }}
        >
            <TeacherDrawer.Screen
                name="TeacherBottomTab"
                component={TeacherBottomTabScreen}
                options={{
                    drawerLabel: "Home"
                }}
            />
            <TeacherDrawer.Screen
                name="My Profile"
                options={{
                    headerShown: true
                }}
                component={Profile}
            />

            <TeacherDrawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: true
                }}
            />

            <TeacherDrawer.Screen
                name="Log out"
                component={Logout}
            />

        </TeacherDrawer.Navigator>
    );
}


const TeacherRootStack = createNativeStackNavigator();

const TeacherRootStackScreen = () => (


    <TeacherRootStack.Navigator
        screenOptions={{
            presentation: 'fullScreenModal',
        }}
    >


        <TeacherRootStack.Screen
            name="TeacherDrawer"
            component={TeacherDrawerScreen}
            options={{
                headerShown: false
            }}
        />

        <TeacherRootStack.Screen
            name="PreviewScreen"
            component={PreviewScreen}
            options={{
                headerShown: false
            }}
        />

        <TeacherRootStack.Screen
            name="SuccessfulActionPopup"
            component={SuccessfulActionPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherResourcesStack.Screen
            name="ConfirmationPopup"
            component={ConfirmationPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherResourcesStack.Screen
            name="FailedActionPopup"
            component={FailedActionPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="LinSignTableCreationModal"
            component={LinSignTableCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade',
            }}
        />

        <TeacherRootStack.Screen
            name="MultipleChoiceCreationModal"
            component={MultipleChoiceCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade',
            }}
        />

        <TeacherRootStack.Screen
            name="StatisticsExerciseCreationModal"
            component={StatisticsExerciseCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <TeacherRootStack.Screen
            name="QuadSignTableCreationModal"
            component={QuadSignTableCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <TeacherRootStack.Screen
            name="ProbabilitiesCreationModal"
            component={ProbabilitiesCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <TeacherRootStack.Screen
            name="FinancialExerciseCreationModal"
            component={FinancialExerciseCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <TeacherRootStack.Screen
            name="ExercisesList"
            component={ExercisesList}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="ExamplesList"
            component={ExamplesList}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="HelpersList"
            component={HelpersList}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="HelperScreen"
            component={HelperScreen}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="HelperCreationModal"
            component={HelperCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="QuizPerformanceSummary"
            component={QuizPerformanceSummary}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                animation: 'fade',
            }}
        />

        <TeacherRootStack.Screen
            name="QuizzesList"
            component={QuizzesList}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="QuizSummary"
            component={QuizSummary}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <TeacherRootStack.Screen
            name="QuizCreationModal"
            component={QuizCreationModal}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <TeacherRootStack.Screen
            name="StudentInfo"
            component={StudentInfo}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                animation: 'fade',
            }}
        />


        <TeacherRootStack.Screen
            name="logout"
            component={Logout}
            options={{
                animationEnabled: true
            }}
        />

    </TeacherRootStack.Navigator>
)


// available to users with student role that are logged in
const StudentHomeStack = createNativeStackNavigator();

const StudentHomeStackScreen = () => {

    const navigation = useNavigation();


    return (
        <StudentHomeStack.Navigator>
            <StudentHomeStack.Screen
                name="StudentHome"
                component={StudentHome}
                options={{
                    headerTitle: "Home",
                    headerLeft: () => {
                        return (
                            <MaterialIcons name="menu-open" size={24} color="black"
                                           onPress={() => navigation.openDrawer()}/>

                        )
                    }
                }}
            />
        </StudentHomeStack.Navigator>
    );
}


const StudentStatsStack = createNativeStackNavigator();

const StudentStatsStackScreen = () => {

    const navigation = useNavigation();


    return (
        <StudentStatsStack.Navigator>

            <StudentStatsStack.Screen
                name="Stats"
                component={Stats}
                options={{
                    headerLeft: () => {
                        return (
                            <MaterialIcons name="menu-open" size={24} color="black"
                                           onPress={() => navigation.openDrawer()}/>
                        )
                    }
                }}
            />
        </StudentStatsStack.Navigator>
    );
}

const StudentResourcesStack = createNativeStackNavigator();

const StudentResourcesStackScreen = () => {

    const navigation = useNavigation();
    return (
        <StudentResourcesStack.Navigator
            screenOptions={{
                presentation: 'modal'
            }}
        >
            <StudentResourcesStack.Screen
                name="StudentResources"
                component={StudentResources}
                options={{
                    headerTitle: "Resources",
                    headerLeft: () => {
                        return (
                            <MaterialIcons name="menu-open" size={24} color="black"
                                           onPress={() => navigation.openDrawer()}/>
                        )
                    }
                }}
            />


        </StudentResourcesStack.Navigator>
    )
}

const StudentBottomTab = createBottomTabNavigator();

const StudentBottomTabScreen = () => (

    <StudentBottomTab.Navigator
        initialRouteName="StudentHomeTab"
        screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
        }}
    >


        <StudentBottomTab.Screen
            name="StudentHomeTab"
            component={StudentHomeStackScreen}
            options={{
                tabBarLabel: "Home",
                tabBarIcon: () => (
                    <Entypo name="home" size={24} color="black"/>
                )
            }}
        />


        <StudentBottomTab.Screen
            name="StatsTab"
            component={StudentStatsStackScreen}
            options={{
                tabBarLabel: "Stats",
                tabBarIcon: () => (
                    <Ionicons name="stats-chart" size={24} color="black"/>
                )
            }}
        />

        <StudentBottomTab.Screen
            name="StudentResourcesTab"
            component={StudentResourcesStackScreen}
            options={{
                tabBarLabel: "Resources",
                tabBarIcon: () => (
                    <FontAwesome5 name="pencil-ruler" size={24} color="black"/>
                )
            }}
        />
    </StudentBottomTab.Navigator>
);

const StudentDrawer = createDrawerNavigator();

const StudentDrawerScreen = () => (
    <StudentDrawer.Navigator
        initialRouteName="StudentBottomTab"
        screenOptions={{
            headerShown: false
        }}
    >
        <StudentDrawer.Screen
            name="StudentBottomTab"
            component={StudentBottomTabScreen}
            options={{
                drawerLabel: 'Home'
            }}
        />

        <StudentDrawer.Screen
            name="My Profile"
            options={{
                headerShown: true
            }}
            component={Profile}
        />

        <StudentDrawer.Screen
            name="Settings"
            component={Settings}
            options={{
                headerShown: true
            }}
        />

        <StudentDrawer.Screen
            name="Log out"
            component={Logout}
        />

    </StudentDrawer.Navigator>
)


const StudentRootStack = createNativeStackNavigator();

const StudentRootStackScreen = () => (

    <StudentRootStack.Navigator>
        <StudentRootStack.Screen
            name="StudentDrawer"
            component={StudentDrawerScreen}
            options={{
                headerShown: false
            }}
        />

        <StudentRootStack.Screen
            name="HelpersList"
            component={HelpersList}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="HelperScreen"
            component={HelperScreen}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="ExchangeEffortPointsPopup"
            component={ExchangeEffortPointsPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="SuccessfulActionPopup"
            component={SuccessfulActionPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="SolvedExercisePopup"
            component={SolvedExercisePopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="ExerciseSolution"
            component={ExerciseSolution}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="FailedActionPopup"
            component={FailedActionPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="ConfirmationPopup"
            component={ConfirmationPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="ActionStartedPopup"
            component={ActionStartedPopup}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="StudentExercisesList"
            component={StudentExercisesList}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />


        <StudentRootStack.Screen
            name="StudentQuizzesList"
            component={StudentQuizzesList}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <StudentRootStack.Screen
            name="QuizScreen"
            component={QuizScreen}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <StudentRootStack.Screen
            name="StudentQuizSummary"
            component={StudentQuizSummary}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />

        <StudentRootStack.Screen
            name="QuizResultsScreen"
            component={QuizResultsScreen}
            options={{
                animation: 'fade',
                presentation: 'fullScreenModal',
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
            }}
        />

        <StudentRootStack.Screen
            name="ExerciseScreen"
            component={ExerciseScreen}
            options={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: false,
                presentation: 'fullScreenModal',
                animation: 'fade'
            }}
        />
    </StudentRootStack.Navigator>
)


export default () => {

    const {isLoading, userAccessToken, userInfo} = useContext(AuthContext);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <NavigationContainer>
            {isLoading ? <Loading/> :
                userAccessToken !== null ? (
                        userInfo.role === "TEACHER" ?
                            <TeacherRootStackScreen/> : <StudentRootStackScreen/>)
                    : <InitialStackScreen/>}
        </NavigationContainer>
    );
};