import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 0, value: "study english", isSelected: false, isEdit: false },
  ]);
  const [todo, setTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [toggleAllCheckBox, setToggleAllCheckBox] = useState(false);

  useEffect(() => {
    if (todos.length) {
      setToggleAllCheckBox(todos.every((item) => item.isSelected === true));
    }
  }, [todos]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.title}>
        <Text>MY TODO</Text>
      </View>
      <View style={styles.actionBarContainer}>
        <CheckBox
          disabled={false}
          value={toggleAllCheckBox}
          onValueChange={(newValue) => {
            setToggleAllCheckBox(newValue);
            setTodos((prev) =>
              prev.map((item) => {
                return { ...item, isSelected: newValue };
              })
            );
          }}
        ></CheckBox>
        <Text>{toggleAllCheckBox}</Text>
        <TouchableOpacity
          onPress={() => {
            setTodos((prev) =>
              prev.filter((item) => item.isSelected === false)
            );
            setToggleAllCheckBox(false);
          }}
        >
          <Icon name="delete" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.todoContainer}>
        {todos.map((item, index) => (
          <View key={item.id} style={styles.todoList}>
            <CheckBox
              disabled={false}
              value={todos[index].isSelected}
              onValueChange={(newValue) => {
                setTodos((prev) =>
                  prev.map((item, prevTodoIndex) => {
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
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingHorizontal: 10,
                }}
                defaultValue={todos[index].value}
                onChangeText={(newTodo) => {
                  setEditedTodo(newTodo);
                }}
              ></TextInput>
            )}
            {!item.isEdit && (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  setTodos((prev) =>
                    prev.map((item, todoIndex) => {
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
                  setTodos((prev) =>
                    prev.map((item, todoIndex) => {
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
      <View style={styles.bottomContainer}>
        <TextInput
          placeholder="Enter your todo"
          defaultValue={todo}
          onChangeText={(newTodo) => {
            setTodo(newTodo);
          }}
          style={styles.input}
        />

        <TouchableOpacity
          title="ADD"
          onPress={() => {
            setTodos((preTodo) => [
              ...preTodo,
              {
                id: preTodo.length,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 30,
  },
  title: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  actionBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  todoContainer: {
    padding: 10,
    width: 300,
  },
  todoList: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    gap: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { padding: 1 },
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
