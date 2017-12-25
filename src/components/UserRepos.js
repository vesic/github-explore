import React, { Component } from "react";
import { View, Text, Image, Switch, Animated } from "react-native";
import { Card, Divider } from "react-native-elements";

class UserRepos extends Component {
  state = {
    allReposeEnabled: false,
    reposVisible: new Animated.Value(0)
  };

  renderUserRepos = () => {
    if (this.state.allReposeEnabled) {
      return (
        <Animated.View style={{ opacity: this.state.reposVisible }}>
          {this.props.repo.item.node.repositories.edges.map((repo, index) => (
            <Text key={index}>{repo.node.nameWithOwner}</Text>
          ))}
        </Animated.View>
      );
    }
  };

  animate = () => {
    Animated.spring(this.state.reposVisible, {
      toValue: 1
    }).start(() => {
      this.setState({ reposVisible: new Animated.Value(0) });
    });
  };

  render() {
    const { node } = this.props.repo.item;
    return (
      <Card title={node.login}>
        {/* <Text>{JSON.stringify(this.props.repo)}</Text> */}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flex: 0.5, justifyContent: "flex-start" }}>
            <Text style={{ fontWeight: "bold" }}>
              Email: {node.email || "Email N/A"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Bio: {node.bio || "Bio N/A"}
            </Text>
          </View>
          <View style={{ flex: 0.5, justifyContent:'center', alignItems:'center' }}>
            <Image
              style={{ width: 50, height: 50}}
              source={{
                uri: node.avatarUrl
              }}
            />
          </View>
        </View>
        <Divider />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 0.7 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              First 10 of {node.repositories.totalCount} user
              repos:
            </Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Switch
              value={this.state.allReposeEnabled}
              style={{ alignSelf: "flex-end" }}
              onValueChange={() => {
                this.setState(
                  {
                    allReposeEnabled: !this.state.allReposeEnabled
                  },
                  () => {
                    this.animate();
                  }
                );
              }}
            />
          </View>
        </View>
        {this.renderUserRepos()}
      </Card>
    );
  }
}

export default UserRepos;
