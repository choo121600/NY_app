import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import PropTypes from "prop-types";
import RecordButton from "./RecordButton";

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PerToDoValue: props.text
    };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deletePerToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompletePerToDo: PropTypes.func.isRequired,
    completePerToDo: PropTypes.func.isRequired,
    updatePerToDo: PropTypes.func.isRequired
  };

  render() {
    const { PerToDoValue } = this.state;
    const { text, id, deletePerToDo, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <View>
            <Text style={[styles.text]}>{text}</Text>
          </View>
          <View style={styles.recordButton}>
            <RecordButton />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    borderBottomColor: "#bbb"
  },
  column: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    justifyContent: "flex-start"
  },
  recordButton: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10
  }
});

export default Tab;
