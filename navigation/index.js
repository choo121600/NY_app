import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ProfileScreen from "../screens/ProfileScreen";

class Calendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CalendarScreen />
      </View>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ProfileScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#92B6D5"
  }
});

import Icon from "react-native-vector-icons/Ionicons";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-calendar"}
            />
          </View>
        ),
        activeColor: "#ffffff",
        inactiveColor: "#92c5c2",
        barStyle: { backgroundColor: "#2c6d6a" }
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-home"} />
          </View>
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-person"}
            />
          </View>
        ),
        activeColor: "#ffffff",
        inactiveColor: "#a3c2fa",
        barStyle: { backgroundColor: "#2163f6" }
      }
    }
  },
  {
    initialRouteName: "Home",
    activeColor: "#ffffff",
    inactiveColor: "#bda1f7",
    barStyle: { backgroundColor: "#6948f4" }
  }
);

export default createAppContainer(TabNavigator);
