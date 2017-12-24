import React, { Component } from "react";
import { View, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";

class Filter extends Component {
  render() {
    const buttons = ["Users", "Repos"];
    const selectedIndex = 0;
    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <View style={{ flex: 0.7 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 16,
              marginTop: 8
            }}
          >
            Search for:
          </Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <ButtonGroup
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 30 }}
            selectedBackgroundColor="#bdc3c7"
          />
        </View>
      </View>
    );
  }
}

export default Filter;
