import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AudioList from "../screens/audioList";
import Player from "../screens/player";
import PlayList from "../screens/playList";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AudioList" component={AudioList} options={{
                tabBarIcon: (color, size) => {
                    return <MaterialIcons name="headset" size={size} color={color} />
                }
            }}></Tab.Screen>
            <Tab.Screen name="player" component={Player} options={{
                tabBarIcon: (color, size) => {
                    return <FontAwesome5 name="compact-disc" size={size} color={color} />
                }
            }}></Tab.Screen>
            <Tab.Screen name="PlayList" component={PlayList} options={{
                tabBarIcon: (color, size) => {
                    return <MaterialCommunityIcons name="playlist-music" size={size} color={color} />
                }
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default AppNavigator