import { SafeAreaView, StyleSheet, View } from "react-native";
import { ColorItem } from "./components/ColorItem";
import { colorOptions } from "./Constants";
import { useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";
import { runOnJS } from "react-native-reanimated";
import { ActionMenu } from "./components/ActionMenu";

export default function App() {
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [paths, setPaths] = useState([]);
  console.log("Stroke color is: " + strokeColor);
  const handleClearPaths = () => {
    setPaths([]);
  };
  const handleUndoPaths = () => {
    setPaths(paths.slice(0, -1));
  };
  const handleStrokeWidth = () => {
    if (strokeWidth > 10) {
      runOnJS(setStrokeWidth)(3);
    } else {
      runOnJS(setStrokeWidth)(strokeWidth + 2);
    }
  };
  const pan = Gesture.Pan()
    .onStart((event) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: strokeColor,
        stroke: strokeWidth,
      };
      newPaths[paths.length].segments.push(`M ${event.x} ${event.y}`);
      runOnJS(setPaths)(newPaths);
    })
    .onUpdate((event) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${event.x} ${event.y}`);
        runOnJS(setPaths)(newPaths);
      }
    })
    .minDistance(1);
  return (
    <SafeAreaView style={styles.container}>
      <ActionMenu
        style={styles.actionMenuContainer}
        clearPaths={handleClearPaths}
        undoPaths={handleUndoPaths}
        setStrokeWidth={handleStrokeWidth}
        strokeWidth={strokeWidth}
      />
      <GestureHandlerRootView style={styles.canvasContainer}>
        <GestureDetector gesture={pan}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Canvas style={{ flex: 1 }}>
              {paths.map((p, index) => (
                <Path
                  key={index}
                  path={p.segments.join(" ")}
                  strokeWidth={p.stroke}
                  style="stroke"
                  color={p.color}
                />
              ))}
            </Canvas>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={styles.colorMenuContainer}>
        {colorOptions.map((item, idx) => {
          return <ColorItem key={idx} item={item} onClick={setStrokeColor} />;
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  actionMenuContainer: {
    flex: 1,
  },
  canvasContainer: {
    flex: 8,
  },
  colorMenuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
