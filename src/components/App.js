import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SearchBar,
  Header,
  ButtonGroup,
  Card,
  Divider
} from "react-native-elements";
import SearchResults from "./SearchResults";
import HeaderLeftComponent from './HeaderLeftComponent';

export default class App extends Component<{}> {
  state = {
    checked: true,
    filterVisible: false
  };

  toggleFilterVisible = () => {
    this.setState({ filterVisible: !this.state.filterVisible });
  };

  renderFilter = () => {
    const buttons = ["Users", "Repos"];
    const selectedIndex = 0;

    if (this.state.filterVisible) {
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

    return null;
  };

  render() {
    return (
      <View>
        <Header
          outerContainerStyles={{ backgroundColor: "#3498db" }}
          leftComponent={
            <HeaderLeftComponent toggleFilterVisible={this.toggleFilterVisible} />
          }
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        {this.renderFilter()}
        <SearchBar
          containerStyle={{ backgroundColor: "#fff" }}
          lightTheme
          round
          placeholder="Type Here..."
          onSubmitEditing={() => console.warn("submit")}
        />
        <SearchResults />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
