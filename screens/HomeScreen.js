import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import CityListItem from "../components/CityListItem";
import { useLazyFetchCitiesQuery } from "../store";

function HomeScreen({ navigation }) {
  const [enteredCity, setEnteredCity] = useState("");
  const [fetchCities, results] = useLazyFetchCitiesQuery();

  const onCityChange = (city) => {
    setEnteredCity(city);
    fetchCities(city);
  };
  const onCityClick = (item) => {
    if (item) {
      navigation.navigate("Weather", {
        city: item,
      });
    } else {
      Alert.alert("Not found", "No city found by that name, try another one", [
        {
          text: "OK",
        },
      ]);
    }
  };
  const onSubmit = () => {
    if (enteredCity === "") {
      Alert.alert("Not found", "Please enter a city", [
        {
          text: "OK",
        },
      ]);
    } else {
      onCityClick(results.currentData[0]);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" && "height"}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.title}>Weather</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={enteredCity}
          onChangeText={onCityChange}
          style={styles.input}
          placeholder="Enter your city"
          placeholderTextColor={"#363636"}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.listContainer}>
        {results.isSuccess && (
          <FlatList
            data={results.currentData}
            renderItem={(item) => {
              return <CityListItem item={item.item} onClick={onCityClick} />;
            }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6d84a5",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    color: "#000000",
    fontSize: 50,
  },
  input: {
    color: "white",
  },
  inputContainer: {
    justifyContent: "center",
    backgroundColor: "#859ab8",
    width: "90%",
    height: 50,
    padding: 10,
    borderRadius: 50,
  },
  listContainer: {
    justifyContent: "center",
    backgroundColor: "#859ab8",
    width: "90%",
  },
});
export default HomeScreen;
