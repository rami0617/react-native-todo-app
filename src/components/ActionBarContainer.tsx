import { SetStateAction, Dispatch } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";

import { TTodos } from "../types";

interface Props {
  toggleAllCheckBox: boolean;
  setToggleAllCheckBox: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<TTodos[]>>;
}

export default function ActionBar({
  toggleAllCheckBox,
  setToggleAllCheckBox,
  setTodos,
}: Props) {
  return (
    <View style={styles.actionBarContainer}>
      <CheckBox
        disabled={false}
        value={toggleAllCheckBox}
        onValueChange={(newValue) => {
          setToggleAllCheckBox(newValue);
          setTodos((prev: TTodos[]) =>
            prev.map((item: TTodos) => {
              return { ...item, isSelected: newValue };
            })
          );
        }}
      ></CheckBox>
      <Text>{toggleAllCheckBox}</Text>
      <TouchableOpacity
        onPress={() => {
          setTodos((prev: TTodos[]) =>
            prev.filter((item: TTodos) => item.isSelected === false)
          );
          setToggleAllCheckBox(false);
        }}
      >
        <Icon name="delete" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});
