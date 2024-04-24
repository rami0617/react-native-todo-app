import { Dispatch, SetStateAction } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { TTodos } from "../types";

interface Props {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  setTodos: Dispatch<SetStateAction<TTodos[]>>;
}

export default function BottomContaienr({ todo, setTodo, setTodos }: Props) {
  return (
    <View style={styles.bottomContainer}>
      <TextInput
        placeholder="Enter your todo"
        defaultValue={todo}
        onChangeText={(newTodo: string) => {
          setTodo(newTodo);
        }}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => {
          setTodos((prev: TTodos[]) => [
            ...prev,
            {
              id: prev.length,
              value: todo,
              isEdit: false,
              isSelected: false,
            },
          ]);
          setTodo("");
        }}
        style={styles.button}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    gap: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "black",
    borderColor: "gray",
    borderWidth: 1,
    height: 50,
    width: 180,
    textAlign: "center",
    borderRadius: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    width: 80,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
