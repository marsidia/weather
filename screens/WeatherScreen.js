import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useGetWeatherQuery } from "../store";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import icons from "../assets/icons/icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function WeatherScreen({ route, navigation }) {
  const { city } = route.params;
  const { data, error, isFetching } = useGetWeatherQuery(city);
  const [isCelcius, setIsCelcius] = useState(true);

  let content;
  if (isFetching) {
    content = <ActivityIndicator />;
  } else if (error) {
    Alert.alert(
      "An error occured",
      "Weather information is currently unavailable",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  } else {
    content = (
      <View style={styles.content}>
        <Text style={styles.city}> {city.name}</Text>
        <View style={styles.descContainer}>
          <Image
            source={icons["icon" + data.weather[0].icon]}
            style={styles.icon}
          />
          <Text>{data.weather[0].description}</Text>
        </View>

        <Text style={styles.temp}>
          {isCelcius
            ? Math.round(data.main.temp - 273.15) + "°C"
            : Math.round(((data.main.temp - 273.15) * 9) / 5 + 32) + "°F"}
        </Text>
        <View style={styles.indicator}>
          <Ionicons name="water-outline" size={24} color="black" />
          <Text>{data.main.humidity}%</Text>
        </View>
        <View style={styles.indicator}>
          <Feather name="wind" size={24} color="black" />
          <Text>{data.wind.speed}m/s</Text>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.topButtons}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </Pressable>
          <Pressable
            style={styles.convert}
            onPress={() => setIsCelcius(!isCelcius)}
          >
            {isCelcius ? (
              <MaterialCommunityIcons
                name="temperature-fahrenheit"
                size={30}
                color="white"
              />
            ) : (
              <MaterialCommunityIcons
                name="temperature-celsius"
                size={30}
                color="white"
              />
            )}
          </Pressable>
        </View>
        {content}
      </View>
    );
  }
}
export default WeatherScreen;

const styles = StyleSheet.create({
  icon: {
    height: 100,
    width: 100,
  },
  container: {
    backgroundColor: "#6d84a5",
    flex: 1,
    alignItems: "center",
  },
  city: {
    fontSize: 30,
    padding: 20,
    color: "#ffffff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  temp: {
    fontSize: 40,
    color: "#ffffff",
  },
  indicator: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    fontSize: 20,
  },
  descContainer: {
    alignItems: "center",
  },
  topButtons: {
    position: "absolute",
    top: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: 90,
  },
  back: {
    height: 80,
  },
});
