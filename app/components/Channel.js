import React from "react";
import Chip from "../UI/Chip";
import Card from "../UI/Card";
import { Image, View } from "react-native";

function Channel(w) {
  const is18 = w.is18Plus == "yes";
  return (
    <Chip
      mode={is18 && "danger"}
      style={{
        margin: 8,
      }}
      avatar={
        w.site_icon_url && (
          <Image
            source={{ uri: w.site_icon_url }}
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
            }}
          />
        )
      }
      onPress={w.onPress}
    >
      {w.name}
      {is18 && "(18+)"}
    </Chip>
  );
}

export default Channel;

Channel.Card = (w) => {
  const is18 = w.is18Plus == "yes";
  return (
    <Card onPress={w.onPress}>
      <Card.Cover
        source={
          w?.site_icon_url
            ? {
                uri: w.site_icon_url,
              }
            : require(`./../assets/icon.png`)
        }
        style={{ height: 180, width: 180 }}
      />
      <Card.Title
        title={w?.name}
        right={() =>
          is18 && (
            <View>
              <Chip mode="danger">18+</Chip>
            </View>
          )
        }
      />
    </Card>
  );
};
