import AppNavigator from "./app/AppNavigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AudioProvider from "./app/context/AudioProvider";
import { Text, View } from "react-native";

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigator></AppNavigator>
      </NavigationContainer>
    </AudioProvider>
  );
}

