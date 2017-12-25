import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#3498db"/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Spinner;
