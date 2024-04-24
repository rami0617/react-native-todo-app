import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ActionBarContainer from "./src/components/ActionBarContainer";
import BottomContaienr from "./src/components/BottomContainer";
import TitleContainer from "./src/components/TitleContainer";
import TodoListContainer from "./src/components/TodoListContainer";

import { TTodos } from "./src/types";

export default function App() {
  const [todos, setTodos] = useState<TTodos[]>([
    { id: 0, value: "study english", isSelected: false, isEdit: false },
  ]);
  const [todo, setTodo] = useState<string>("");
  const [toggleAllCheckBox, setToggleAllCheckBox] = useState<boolean>(false);

  useEffect(() => {
    if (todos.length) {
      setToggleAllCheckBox(
        todos.every((item: TTodos) => item.isSelected === true)
      );
    }
  }, [todos]);

  return (
    <View style={styles.container}>
      <TitleContainer />
      <ActionBarContainer
        toggleAllCheckBox={toggleAllCheckBox}
        setTodos={setTodos}
        setToggleAllCheckBox={setToggleAllCheckBox}
      />
      <TodoListContainer todos={todos} setTodos={setTodos} />
      <BottomContaienr todo={todo} setTodo={setTodo} setTodos={setTodos} />
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
});
