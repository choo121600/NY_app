import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import Navigation from "./navigation";
import { AdMobBanner } from "expo-ads-admob";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Navigation />
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-2935937038294465/5709534550" // Test ID, Replace with your-admob-unit-id
          testDeviceID="82c1ea16-fbae-422e-9938-ee305b0791ab"
          onDidFailToReceiveAdWithError={this.bannerError}
          setTestDeviceIDAsync
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
