import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar, Header } from "react-native-elements";
import RepoSearchResults from "./RepoSearchResults";
import HeaderLeftComponent from "./HeaderLeftComponent";
import Filter from "./Filter";
import UserSearchResults from "./UserSearchResults";

export default class RootComponent extends Component<{}> {
  state = {
    checked: true,
    filterVisible: false,
    searchText: "",
    type: 0
  };

  searchTypes = ["REPOSITORY", "USER"];

  renderSearchResults = () => {
    if (this.searchTypes[this.state.type] === "REPOSITORY") {
      return <RepoSearchResults query={this.state.searchQuery} />;
    }

    return <UserSearchResults query={this.state.searchQuery} />;
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
        {this.state.filterVisible ? (
          <Filter
            updateSearchType={type =>
              this.setState({ type, searchQuery: null })
            }
          />
        ) : null}
        <SearchBar
          value={this.state.searchText}
          onChangeText={t => this.setState({ searchText: t })}
          containerStyle={{ backgroundColor: "#fff" }}
          lightTheme
          round
          placeholder="Type Here..."
          onSubmitEditing={() => {
            this.setState({
              searchQuery: this.state.searchText,
              searchText: ""
            });
          }}
        />
        {this.renderSearchResults()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
