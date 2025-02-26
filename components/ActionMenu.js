import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

export const ActionMenu = ({
  clearPaths,
  undoPaths,
  setStrokeWidth,
  strokeWidth,
}) => {
  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity onPress={clearPaths}>
        <AntDesign name="delete" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity onPress={undoPaths}>
        <FontAwesome name="undo" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.strokeActionStyle}
        onPress={setStrokeWidth}
      >
        <Entypo name="circle" size={strokeWidth + 15} color="orange" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  strokeActionStyle: {
    borderColor: "orange",
    borderRadius: 20,
    borderWidth: 5,
  },
});
