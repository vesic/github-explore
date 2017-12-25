import React, { Component } from "react";
import { View, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";

class Filter extends Component {
  buttons = ["Repos", "Users"];

  state = {
    selectedIndex: 0
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex}, () => {
      this.props.updateSearchType(selectedIndex)
    })
  }

  render() {
    const { selectedIndex } = this.state

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
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={this.buttons}
            containerStyle={{ height: 30 }}
            selectedBackgroundColor="#3498db"
            selectedTextStyle={{color: '#fff'}}
          />
        </View>
      </View>
    );
  }
}

export default Filter;
