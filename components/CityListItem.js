import { Text, Pressable, StyleSheet } from "react-native";

function CityListItem({ item, onClick }) {
  const onPressItem = () => {
    onClick(item);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? "#a3b8d4" : "transparent" },
        styles.container,
      ]}
      onPress={onPressItem}
    >
      <Text style={styles.city}>{item.name}</Text>
      <Text style={styles.location}>
        {item.state} ({item.country})
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
    padding: 10,
  },
  city: {
    fontSize: 17,
  },
  location: {
    fontSize: 14,
    paddingBottom: 1,
  },
});

export default CityListItem;
