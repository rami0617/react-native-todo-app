import { StyleSheet, Text, View } from "react-native";

export default function TitleContainer() {
  return (
    <View style={styles.title}>
      <Text>MY TODO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});
