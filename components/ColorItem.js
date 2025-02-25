import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import { COLOR_ITEM_SIZE } from "../Constants";

export const ColorItem = ({ item, onClick }) => {
  const [opacity, setOpacity] = useState(1);
  const [borderWidth, setBorderWidth] = useState(0);
  const pressHandler = (color) => {
    if (opacity > 0.25) {
      setOpacity(opacity - 0.25);
      setBorderWidth(5);
    } else {
      setOpacity(1);
      setBorderWidth(0);
    }
    onClick(color.code);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        pressHandler(item);
      }}
      style={{
        borderWidth: borderWidth,
        borderColor: item.borderColor,
        alignItems: "center",
        justifyContent: "center",
        width: COLOR_ITEM_SIZE,
        height: COLOR_ITEM_SIZE,
        backgroundColor: item.code,
        borderRadius: COLOR_ITEM_SIZE,
        opacity: opacity,
      }}
    >
      <Entypo
        name="circle"
        size={COLOR_ITEM_SIZE - 10}
        style={{ opacity: opacity }}
        color={item.code}
      />
    </TouchableOpacity>
  );
};
