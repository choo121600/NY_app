import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";
import { AppLoading } from "expo";
import Tab from "../components/Tab";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPerToDo: "",
      loadedPerToDos: false,
      PerToDos: {}
    };
  }

  componentDidMount = () => {
    this._loadPerToDos();
  };

  render() {
    const { newPerToDo, loadedPerToDos, PerToDos } = this.state;
    if (!loadedPerToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Stick to it </Text>
        <View style={styles.resolutions}>
          <View style={styles.personallyView}>
            <Text style={styles.resolutionsText}>Personally</Text>
            <View style={styles.card}>
              <View style={styles.tab}>
                <ScrollView contentContainerStyle={styles.tabs}>
                  {Object.values(PerToDos)
                    .reverse()
                    .map(PerToDo => (
                      <Tab
                        key={PerToDo.id}
                        {...PerToDo}
                        deletePerToDo={this._deletePerToDo}
                        uncompletePerToDo={this._uncompletePerToDo}
                        completePerToDo={this._completePerToDo}
                        updatePerToDo={this._updatePerToDo}
                      />
                    ))}
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={styles.professionallyView}>
            <Text style={styles.resolutionsText}>Professionally</Text>
            <View style={styles.card}>
              <View style={styles.tab}>
                <ScrollView contentContainerStyle={styles.tabs}>
                  {Object.values(PerToDos)
                    .reverse()
                    .map(PerToDo => (
                      <Tab
                        key={PerToDo.id}
                        {...PerToDo}
                        deletePerToDo={this._deletePerToDo}
                        uncompletePerToDo={this._uncompletePerToDo}
                        completePerToDo={this._completePerToDo}
                        updatePerToDo={this._updatePerToDo}
                      />
                    ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _controlNewPerToDo = text => {
    this.setState({
      newPerToDo: text
    });
  };
  _loadPerToDos = async () => {
    try {
      const PerToDos = await AsyncStorage.getItem("PerToDos");
      const parsedPerToDos = JSON.parse(PerToDos);
      this.setState({ loadedPerToDos: true, PerToDos: parsedPerToDos || {} });
    } catch (err) {
      console.log(err);
    }
  };
  _addPerToDo = () => {
    const { newPerToDo } = this.state;
    if (newPerToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newPerToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newPerToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newPerToDo: "",
          PerToDos: {
            ...prevState.PerToDos,
            ...newPerToDoObject
          }
        };
        this._savePerToDos(newState.PerToDos);
        return { ...newState };
      });
    }
  };
  _deletePerToDo = id => {
    this.setState(prevState => {
      const PerToDos = prevState.PerToDos;
      delete PerToDos[id];
      const newState = {
        ...prevState,
        ...PerToDos
      };
      this._savePerToDos(newState.PerToDos);
      return { ...newState };
    });
  };
  _uncompletePerToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        PerToDos: {
          ...prevState.PerToDos,
          [id]: {
            ...prevState.PerToDos[id],
            isCompleted: false
          }
        }
      };
      this._savePerToDos(newState.PerToDos);
      return { ...newState };
    });
  };
  _completePerToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        PerToDos: {
          ...prevState.PerToDos,
          [id]: { ...prevState.PerToDos[id], isCompleted: true }
        }
      };
      this._savePerToDos(newState.PerToDos);
      return { ...newState };
    });
  };
  _updatePerToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        PerToDos: {
          ...prevState.PerToDos,
          [id]: { ...prevState.PerToDos[id], text: text }
        }
      };
      this._savePerToDos(newState.PerToDos);
      return { ...newState };
    });
  };
  _savePerToDos = newPerToDos => {
    const savePerToDos = AsyncStorage.setItem(
      "PerToDos",
      JSON.stringify(newPerToDos)
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "200",
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 15
  },
  resolutions: {
    flex: 1
  },
  personallyView: {
    flex: 1
  },
  professionallyView: {
    flex: 1
  },
  resolutionsText: {
    color: "white",
    fontSize: 30,
    fontWeight: "200"
  },
  card: {
    backgroundColor: "#fff8ed",
    flex: 1
  },
  tab: {
    flex: 1,
    alignItems: "center"
  }
});
