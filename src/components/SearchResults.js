import React, { Component } from "react";
import {
  Animated,
  FlatList,
  RefreshControl,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { Card, Text } from "react-native-elements";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import DetailsModal from './DetailsModal';

const GetDefault = gql`
  query GetDefault($query: String!) {
    search(query: $query, type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            nameWithOwner
            description
            name
            url
            owner {
              avatarUrl
              login
              url
            }
          }
        }
      }
    }
  }
`;

class SearchResults extends Component {
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

  _keyExtractor = item => item.node.id;

  toggleModal = (node) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      selectedNode: node 
    })
  }

  renderList = () => {
    if (this.state.modalVisible) {
      return (
        <DetailsModal selectedNode={this.state.selectedNode} toggleModal={ this.toggleModal } />
      )
    }
    return (
      <Animated.View style={{ opacity: this.state.value }}>
        <FlatList
          data={this.props.data.search.edges}
          keyExtractor={this._keyExtractor}
          renderItem={e => (
            <Card title={e.item.node.nameWithOwner}>
              <TouchableOpacity
                onPress={() => this.toggleModal(e.item.node) }
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.7 }}>
                    {/* <Text>{JSON.stringify(e)}</Text> */}
                    {/* <Text>{e.item.node.nameWithOwner}</Text> */}
                    <Text>{e.item.node.description}</Text>
                  </View>
                  <View style={{ flex: 0.3 }}>
                    <Image
                      style={{ width: 50, height: 50, alignSelf: "center" }}
                      source={{
                        uri: e.item.node.owner.avatarUrl
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
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
  };

  render() {
    if (this.props.data.loading) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    } // end if
    return this.renderList();
  }
}

export default graphql(GetDefault, {
  options: ownProps => ({
    variables: {
      query: ownProps.query
    }
  })
})(SearchResults);
