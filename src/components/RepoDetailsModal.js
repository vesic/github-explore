import React from "react";
import { Modal, View, Text, StyleSheet, Image, Button } from "react-native";
import { Header, Icon, Card, Divider } from "react-native-elements";

const RepoDetailsModal = ({ toggleModal, selectedNode }) => (
  <Modal animationType="slide" onRequestClose={() => null}>
    <Header
      leftComponent={
        <Icon name="arrow-back" onPress={() => toggleModal(null)} />
      }
      centerComponent={{ text: "REPO DETAILS", style: { color: "#fff" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
    />
    <View>
      <Card title={selectedNode.nameWithOwner}>
        <Text style={styles.bold}>Project name:</Text>
        <Text>{selectedNode.name}</Text>
        <Divider />
        <Text style={styles.bold}>Project description:</Text>
        <Text>{selectedNode.description}</Text>
        <Divider />
        <Text style={styles.bold}>GitHub link:</Text>
        <Text>{selectedNode.url}</Text>
        <Divider />
        <Text style={styles.bold}>Project owner:</Text>
        <Text>{selectedNode.owner.login}</Text>
        <Divider />
        <Text style={styles.bold}>Project owner url:</Text>
        <Text>{selectedNode.owner.url}</Text>
        <Divider />
        <Text style={styles.bold}>Project owner avatar:</Text>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Image
            style={{ width: 50, height: 50, alignSelf: "flex-start" }}
            source={{
              uri: selectedNode.owner.avatarUrl
            }}
          />
        </View>
        <Divider />
      </Card>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    marginTop: 10
  }
});

export default RepoDetailsModal;
