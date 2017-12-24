import React, { Component } from "react";
import { Animated, FlatList, RefreshControl } from "react-native";
import { Card, Text } from "react-native-elements";

class SearchResults extends Component {
  randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  }

  randomString = () => {
    return "helloworld"
      .split("")
      .sort(this.randomSort)
      .join("");
  };

  state = {
    refreshing: false,
    data: this.randomString(),
    value: new Animated.Value(0.3)
  };

  animate = () => {
    Animated.spring(this.state.value, {
      toValue: 1
    }).start();
  };

  componentDidMount() {
    this.animate();
  }

  onRefresh = () => {
    this.setState(
      {
        value: new Animated.Value(0.3),
        data: this.randomString()
      },
      () => {
        this.animate();
      }
    );
  };

  render() {
    console.warn("animated");
    return (
      <Animated.View style={{ opacity: this.state.value }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Card>
              <Text>{item}</Text>
            </Card>
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </Animated.View>
    );
  }
}

export default SearchResults;
