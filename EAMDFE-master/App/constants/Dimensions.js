import React from "react";
import {Dimensions, StatusBar} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const NAVIGATION_BAR_HEIGHT = Dimensions.get('screen').height - this.SCREEN_HEIGHT - this.STATUS_BAR_HEIGHT;
export default {

    SCREEN_WIDTH: Dimensions.get("window").width,
    SCREEN_HEIGHT: Dimensions.get("window").height,
    STATUS_BAR_HEIGHT: StatusBar.currentHeight,
    NAVIGATION_BAR_HEIGHT: Dimensions.get('screen').height - this.SCREEN_HEIGHT - this.STATUS_BAR_HEIGHT,
}