import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store";
import WeatherScreen from "./screens/WeatherScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
