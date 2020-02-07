import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";

import Tab from "../components/TodoTab";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");
class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDo: "",
      loadedTodos: false,
      toDos: {}
    };
  }

  componentDidMount = () => {
    this._loadTodos();
  };

  _uncompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], isCompleted: true }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _deleteTodo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], text: text }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _addTodo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveTodos(newState.toDos);
        return { ...newState };
      });
    }
  };

  _saveTodos = newToDos => {
    const saveTodos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };
  _controlNewToDo = text => {
    this.setState({ newToDo: text });
  };

  _loadTodos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({ loadedTodos: true, toDos: parsedToDos || {} });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { newToDo, toDos } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={"+ New"}
          value={newToDo}
          onChangeText={this._controlNewToDo}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
          onSubmitEditing={this._addTodo}
          underlineColorAndroid={"transparent"}
        />
        <ScrollView contentContainerStyle={styles.tab}>
          {Object.values(toDos).map(toDo => (
            <Tab
              key={toDo.id}
              {...toDo}
              deleteTodo={this._deleteTodo}
              uncompleteTodo={this._uncompleteTodo}
              completeTodo={this._completeTodo}
              updateTodo={this._updateTodo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8ed"
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 16
  },
  tab: {
    alignItems: "center"
  }
});

export default CalendarScreen;
