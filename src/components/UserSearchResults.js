import React, { Component } from "react";
import { View, Text, Animated, FlatList, RefreshControl } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Spinner from "./Spinner";
import { Card } from "react-native-elements";
import UserRepos from "./UserRepos";

const GetDefault = gql`
  query GetDefault($query: String!) {
    search(query: $query, type: USER, first: 10) {
      edges {
        node {
          ... on User {
            id
            login
            avatarUrl
            name
            bio
            email
            repositories(first: 10) {
              totalCount
              edges {
                node {
                  nameWithOwner
                }
              }
            }
          }
        }
      }
    }
  }
`;

class UserSearchResults extends Component {
  state = {
    refreshing: false,
    value: new Animated.Value(0.3),
    query: "react-native",
    modalVisible: false,
    selectedNode: null
  };

  animate = () => {
    Animated.spring(this.state.value, {
      toValue: 1
    }).start();
  };

  componentWillReceiveProps() {
    this.animate();
  }

  onRefresh = () => {
    this.setState(
      {
        value: new Animated.Value(0.3)
      },
      () => {
        this.animate();
      }
    );
  };
  
  keyExtractor = item => item.node.id;

  renderList = () => {
    return (
      <Animated.View style={{ opacity: this.state.value }}>
        <FlatList
          data={this.props.data.search.edges}
          keyExtractor={this.keyExtractor}
          renderItem={e => <UserRepos repo={e} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </Animated.View>
    );
  };

  render() {
    return this.props.data.loading ? <Spinner /> : this.renderList();
  }
}

export default graphql(GetDefault, {
  options: ownProps => ({
    variables: {
      query: ownProps.query || "vesic"
    }
  })
})(UserSearchResults);
