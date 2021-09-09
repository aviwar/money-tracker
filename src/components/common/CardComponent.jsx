import React from "react";
import { Card } from "react-native-paper";

const CardComponent = ({ style, title, onPress, ...rest }) => {
  return (
    <Card style={style} onPress={onPress} mode="outlined">
      <Card.Title title={title} {...rest} />
    </Card>
  );
};

export default CardComponent;
