import React from 'react';
import { Icon } from "react-native-elements";

const HeaderLeftComponent = (props) => (
  <Icon
    name="filter-list"
    color="#fff"
    underlayColor="#000"
    onPress={props.toggleFilterVisible}
  />
);

export default HeaderLeftComponent;
