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
import HeaderLeftComponent from "./HeaderLeftComponent";
import Filter from './Filter';

export default class RootComponent extends Component<{}> {
  state = {
    checked: true,
    filterVisible: false
  };

  render() {
    return (
      <View>
        <Header
          outerContainerStyles={{ backgroundColor: "#3498db" }}
          leftComponent={
            <HeaderLeftComponent
              toggleFilterVisible={() => this.setState({filterVisible: !this.state.filterVisible})}
            />
          }
          centerComponent={{ text: "GITHUB EXPLORE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        {this.state.filterVisible ? <Filter /> : null}
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
