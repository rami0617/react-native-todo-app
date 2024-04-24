import { useState, Dispatch, SetStateAction } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";

import { TTodos } from "../types";

interface Props {
  todos: TTodos[];
  setTodos: Dispatch<SetStateAction<TTodos[]>>;
}

export default function TodoContainer({ todos, setTodos }: Props) {
  const [editedTodo, setEditedTodo] = useState<string>("");

  return (
    <ScrollView style={styles.todoContainer}>
      {todos.map((item: TTodos, index: number) => (
        <View key={item.id} style={styles.todoList}>
          <CheckBox
            disabled={false}
            value={todos[index].isSelected}
            onValueChange={(newValue: boolean) => {
              setTodos((prev: TTodos[]) =>
                prev.map((item: TTodos, prevTodoIndex: number) => {
                  if (prevTodoIndex === index) {
                    item.isSelected = newValue;
                  }
                  return { ...item };
                })
              );
            }}
          ></CheckBox>
          {!item.isEdit && <Text key={item.id}>{item.value}</Text>}
          {item.isEdit && (
            <TextInput
              style={styles.editedInput}
              defaultValue={todos[index].value}
              onChangeText={(newTodo: string) => {
                setEditedTodo(newTodo);
              }}
            ></TextInput>
          )}
          {!item.isEdit && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setTodos((prev: TTodos[]) =>
                  prev.map((item: TTodos, todoIndex: number) => {
                    if (index === todoIndex) {
                      item.isEdit = true;
                    }
                    return { ...item };
                  })
                );
              }}
            >
              <Icon name="edit" size={17} color="gray"></Icon>
            </TouchableOpacity>
          )}
          {item.isEdit && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setTodos((prev: TTodos[]) =>
                  prev.map((item: TTodos, todoIndex: number) => {
                    if (index === todoIndex) {
                      item.isEdit = false;
                      item.value = editedTodo ? editedTodo : item.value;
                    }
                    return { ...item };
                  })
                );
              }}
            >
              <Icon name="sync" size={17} color="gray"></Icon>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    padding: 10,
    width: 300,
  },
  todoList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  editedInput: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  icon: { padding: 1 },
});
