import { StyleSheet, View } from "react-native";
import { ColorItem } from "./components/ColorItem";
import { colorOptions } from "./Constants";
import { useState } from "react";

export default function App() {
  const [strokeColor, setStrokeColor] = useState("#000000");
  console.log("Stroke color is: " + strokeColor);
  return (
    <View style={styles.container}>
      {colorOptions.map((item, idx) => {
        return <ColorItem key={idx} item={item} onClick={setStrokeColor} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 50,
  },
});
