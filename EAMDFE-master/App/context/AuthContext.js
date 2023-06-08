import React, {createContext, useState, useEffect} from "react";
import axios from "axios";
import {Platform, Alert} from "react-native";
import {saveKey, deleteKey, getKey} from "../util/Storage";
import Endpoints from "../constants/Endpoints";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [userAccessToken, setUserAccessToken] = useState(null);

    const [userRefreshToken, setUserRefreshToken] = useState(null);

    const [userInfo, setUserInfo] = useState({
        role: null,
        otherId: null,
        userId: null,
        username: null,
        teacherId: null
    });


    const registerStudent = (un, pw, r, emAddr, fn, ln, tun) => {

        setIsLoading(true);

        axios.post(
            Endpoints.REGISTER_STUDENT
            , {
                user: {
                    username: un,
                    password: pw,
                    role: r,
                    emailAddress: emAddr,
                    firstName: fn,
                    lastName: ln
                },
                teacherUsername: tun
            })
            .then((response) => {

                setUserInfo({
                    userId: response.data.userId,
                    role: response.data.role,
                    otherId: response.data.otherId,
                    username: response.data.username,
                    teacherId: response.data.teacherId
                });

                setUserAccessToken(response.data.accessToken);
                setUserRefreshToken(response.data.refreshToken);

                saveKey("userInfo", JSON.stringify({
                    userId: response.data.userId,
                    role: response.data.role,
                    otherId: response.data.otherId,
                    username: response.data.username,
                    teacherId: response.data.teacherId
                }))
                    .then(() => console.log(`SAVED USER INFO TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING USER INFO TO STORAGE: ${err.message}`));

                saveKey("accessToken", response.data.accessToken)
                    .then(() => console.log(`SAVED ACCESS TOKEN TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING ACCESS TOKEN TO STORAGE: ${err.message}`));

                saveKey("refreshToken", response.data.refreshToken)
                    .then(() => console.log(`SAVED REFRESH TOKEN TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING REFRESH TOKEN TO STORAGE: ${err.message}`));

                setIsLoading(false);
            })
            .catch((e) => {
                    console.error(`ERROR SENDING LOG IN REQUEST: ${e}`);
                    Alert.alert("Registration failed", "Please try again.", [{
                        text: "Ok",
                        onPress: () => {
                            setIsLoading(false);
                        }
                    }])
                }
            )
    }


    const registerTeacher = (un, pw, r, emAddr, fn, ln) => {

        setIsLoading(true);

        axios.post(Endpoints.REGISTER_TEACHER, {
            user: {
                username: un,
                password: pw,
                role: r,
                emailAddress: emAddr,
                firstName: fn,
                lastName: ln
            },
        })
            .then((response) => {

                setUserInfo({
                    userId: response.data.userId,
                    role: response.data.role,
                    otherId: response.data.otherId,
                    username: response.data.username
                });

                setUserAccessToken(response.data.accessToken);
                setUserRefreshToken(response.data.refreshToken);

                saveKey("userInfo", JSON.stringify({
                    userId: response.data.userId,
                    role: response.data.role,
                    otherId: response.data.otherId,
                    username: response.data.username
                }))
                    .then(() => console.log(`SAVED USER INFO TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING USER INFO TO STORAGE: ${err.message}`));

                saveKey("accessToken", response.data.accessToken)
                    .then(() => console.log(`SAVED ACCESS TOKEN TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING ACCESS TOKEN TO STORAGE: ${err.message}`));

                saveKey("refreshToken", response.data.refreshToken)
                    .then(() => console.log(`SAVED REFRESH TOKEN TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING REFRESH TOKEN TO STORAGE: ${err.message}`));

                setIsLoading(false);
            })
            .catch((e) => {
                    console.error(`ERROR SENDING LOG IN REQUEST: ${e}`);
                    Alert.alert("Registration failed", "Please try again.", [{
                        text: "Ok",
                        onPress: () => {
                            setIsLoading(false);
                        }
                    }])
                }
            )
    }

    const login = (un, pw) => {

        setIsLoading(true);

        axios.post(
            Endpoints.LOGIN
            , {
                username: un,
                password: pw
            })
            .then((response) => {

                setUserInfo({
                    userId: response.data.userId,
                    role: response.data.role,
                    otherId: response.data.otherId,
                    username: response.data.username,
                    teacherId: response.data.role === "STUDENT" ? response.data.teacherId : null
                });

                setUserAccessToken(response.data.accessToken);
                setUserRefreshToken(response.data.refreshToken);

                saveKey("userInfo", JSON.stringify({
                    userId: response.data.userId,
                    role: response.data.role,
                    otherId: response.data.otherId,
                    username: response.data.username,
                    teacherId: response.data.role === "STUDENT" ? response.data.teacherId : null

                }))
                    .then(() => console.log(`SAVED USER INFO TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING USER INFO TO STORAGE: ${err.message}`));

                saveKey("accessToken", response.data.accessToken)
                    .then(() => console.log(`SAVED ACCESS TOKEN TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING ACCESS TOKEN TO STORAGE: ${err.message}`));

                saveKey("refreshToken", response.data.refreshToken)
                    .then(() => console.log(`SAVED REFRESH TOKEN TO ${Platform.OS} STORAGE`))
                    .catch((err) => console.error(`ERROR SAVING REFRESH TOKEN TO STORAGE: ${err.message}`));

                setIsLoading(false);
            })
            .catch((e) => {
                console.error(`ERROR SENDING LOG IN REQUEST: ${e}`);
                if (e.response.status === 401) {
                    // Alert.alert("Authentication failed","Try again or create an account.",[{
                    //     text: "Ok",
                    //     onPress: () => {
                    //         setIsLoading(false);
                    //     }
                    // }])


                }
            })
    }

    const getStudents = async () => {

        try {
            const response = await axios.get(
                `${Endpoints.STUDENTS}/${userInfo.otherId}/teacherId`
                , {
                    headers: {Authorization: `Bearer ${userAccessToken}`}
                });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const logout = () => {
        setIsLoading(true);
        setUserAccessToken(null);
        setUserRefreshToken(null);
        deleteKey("accessToken");
        deleteKey("refreshToken");
        deleteKey("userInfo");
        setIsLoading(false);
    }

    const renewAccessToken = () => {

        getKey("refreshToken")
            .then(response => {

                axios.get(
                    Endpoints.REFRESH_TOKEN
                    , {
                        headers:
                            {Authorization: `Bearer ${response}`}
                    })
                    .then(res => {
                        setUserAccessToken(res.data.accessToken);
                        console.log("RENEWED ACCESS TOKEN");
                    })
                    .catch(err => {
                        console.log(`ERROR WHILE REQUESTING ACCESS TOKEN ${err} ${response}`);
                        logout();
                    })
            })

    }

    const isLoggedIn = async () => {

        setIsLoading(true);

        try {

            await getKey("accessToken")
                .then(response => {
                    setUserAccessToken(response);
                })
                .catch(error => console.error(`ERROR RETRIEVING ACCESS TOKEN FROM STORAGE: ${error.message}`));

            await getKey("refreshToken")
                .then(response => {
                    setUserRefreshToken(response);
                })
                .catch(error => console.error(`ERROR RETRIEVING REFRESH TOKEN FROM STORAGE: ${error.message}`));

            await getKey("userInfo")
                .then(response => {
                    setUserInfo(JSON.parse(response));
                })
                .catch(error => console.error(`ERROR RETRIEVING USER INFO FROM STORAGE: ${error.message}`));

            setIsLoading(false);
        } catch (error) {

            console.error(`ERROR CHECKING LOG IN STATE: ${error.message}`);
        }
    }


    useEffect(() => {
        isLoggedIn().then(() => renewAccessToken());
    }, []);


    const time = 1799000;

    useEffect(() => {
        const interval = setInterval(() => {
            renewAccessToken();
        }, time);

        return () => clearInterval(interval);
    }, [])

    return (
        <AuthContext.Provider
            value={{
                registerStudent,
                registerTeacher,
                login,
                logout,
                getKey,
                getStudents,
                isLoading,
                userAccessToken,
                userRefreshToken,
                userInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

