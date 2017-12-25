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
import Filter from "./Filter";

export default class RootComponent extends Component<{}> {
  state = {
    checked: true,
    filterVisible: false,
    searchText: "",
    searchQuery: "react-native"
  };

  updateChild = () => {
    this.child.getWrappedInstance().up();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={{ backgroundColor: "#3498db" }}
          leftComponent={
            <HeaderLeftComponent
              toggleFilterVisible={() =>
                this.setState({ filterVisible: !this.state.filterVisible })
              }
            />
          }
          centerComponent={{ text: "GITHUB EXPLORE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        {this.state.filterVisible ? <Filter /> : null}
        <SearchBar
          onChangeText={t => this.setState({ searchText: t })}
          containerStyle={{ backgroundColor: "#fff" }}
          lightTheme
          round
          placeholder="Type Here..."
          onSubmitEditing={() => {
            this.setState({ searchQuery: this.state.searchText });
          }}
        />
        <SearchResults query={this.state.searchQuery} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
