import React , {useState , useEffect , useContext} from "react";
import { StatusBar , TouchableOpacity, Text , ScrollView, Dimensions , StyleSheet , View , SafeAreaView } from "react-native";
import { MaterialCommunityIcons , Entypo , FontAwesome5 } from '@expo/vector-icons'; 
 
import { AuthContext } from "../../context/AuthContext";
import { getNotificationByRecipientId, updateNotification } from "../../api/NotificationService";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({
  container:{ 
    marginBottom: navigationBarHeight,
    flex: 1,
    alignItems:'center',
    justifyContent:'space-evenly',
  }
})

export const notificationBackgroundColor = (type) => {

  switch (type) {
    case "NEW_EXERCISE":
      return "#FEDB63";
    
    case "NEW_QUIZ":
      return "#FC8E43";

    case "NEW_HELPER":
      return "#74DA1B";
      
    case "STUDENT_ENROLLMENT":
      return "#989EF5";

    case "RANK_UPGRADE":
      return "#50E078";

    case "STUDENT_REQUEST":
      return "pink";

    case "TEACHER_REQUEST_RESPONSE":
      return "pink";

    default:
      return "";
  }
}

export const Notification = ({notification , notViewedBackgroundColor , viewedBackgroundColor , textColor, onPress}) => {

  const backgroundColor = notification.viewed ? viewedBackgroundColor : notViewedBackgroundColor;
  const date = new Date(notification.dispatchDate).toDateString();
  const time = new Date(notification.dispatchDate).toTimeString().slice(0,5);

  return(
    <TouchableOpacity onPress={onPress} style={{flexDirection:'row',backgroundColor: backgroundColor, margin: 5, padding: 5, borderRadius: 25,  alignItems:'center', width: screenWidth * 0.95}}>
      <View style={{margin: 5, padding: 10, backgroundColor:textColor, borderRadius: 30, }}>
        {
        notification.type === 'NEW_EXERCISE' ? (
          <Entypo name="pencil" size={40} color={backgroundColor} />
        ) : (
          notification.type === 'NEW_QUIZ' ? (
            <MaterialCommunityIcons name="head-question" size={40} color={backgroundColor} />

          ) : (
            notification.type === 'NEW_HELPER' ? (
              <FontAwesome5 name="newspaper" size={40} color={backgroundColor} />            
              ) : (
              notification.type === 'STUDENT_ENROLLMENT' ? (
                <MaterialCommunityIcons name="human-greeting-variant" size={40} color={backgroundColor} />
              ) : (
                notification.type === 'RANK_UPGRADE' ? (
                  <FontAwesome5 name="crown" size={40} color={backgroundColor} />

                ) : (
                  <Entypo name="light-bulb" size={40} color={backgroundColor} />
                )
              )
            )
          )
        )
      }
      </View>
      <View style={{width: screenWidth * 0.75,}}>
        <View style={{margin: 3, }}>
          <Text style={{fontSize: 17, fontStyle:'italic', color:textColor, fontWeight:'bold'}}>{notification.title}</Text>
        </View>
        <View style={{margin: 3, }}>
          <View style={{margin: 3, }}>
            <Text style={{fontSize: 13, fontStyle:'italic', color:textColor}}>{notification.message}</Text>
          </View>
          <View style={{alignSelf:'flex-end', paddingLeft: 3 , paddingRight: 7, paddingTop: 3, }}>
            <Text style={{fontSize: 11, fontStyle:'italic', color:textColor, fontWeight:'200'}}>{date} , {time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}


export default ({navigation, route}) => {
  
  const { userAccessToken , userInfo } = useContext(AuthContext);
  const [ notifications , setNotifications ] = useState([]);

  const getNotifications = async () => {
    const response = await getNotificationByRecipientId(userAccessToken, userInfo.userId);
    setNotifications(response);
  }

  const updateNotificationStatus = async (notification) => {

    const response = await updateNotification(userAccessToken,notification);
  }

  const viewNotification = (notification) => {

    switch (notification.type) {
      case "NEW_EXERCISE":
        navigation.navigate('StudentExercisesList',{exerciseType: notification.extraInfo});
        break;

      case "NEW_QUIZ":
        navigation.navigate('StudentQuizzesList',{quizType: notification.extraInfo});
        break;

      case "NEW_HELPER":
        navigation.navigate('HelpersList',{helperType: notification.extraInfo});
        break;

      case "RANK_UPGRADE":
        navigation.navigate('Stats');
        break;

        case "TEACHER_REQUEST_RESPONSE":
        navigation.navigate('Stats');
        break;

      default:
        break;
    }
  }


  const handlePress = (notification) => {

    const copy = {...notification};
    copy.viewed = true;
    copy.dateOfAccess = new Date();
    console.log("COPY", copy);
    updateNotificationStatus(copy);
    viewNotification(copy);
  }

  useEffect(() => {
    getNotifications();
  },[])

    return(
     
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView />
        
        <ScrollView>
          {
            notifications.length === 0 ? (
              <Text>Nothing to show</Text>
            ) : (
              notifications.map((value,index) => (
                <Notification 
                  key={value.id}
                  notification={value}
                  viewedBackgroundColor='white'
                  notViewedBackgroundColor={notificationBackgroundColor(value.type)}
                  textColor={value.viewed ? notificationBackgroundColor(value.type) : 'white'}
                  onPress={() => handlePress(value)}
                />
              ))
            )
          }
        </ScrollView>
      </View>
      );

}