import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

const ProgressBar = ({ ...props }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 200,
      duration: 30000,
      useNativeDriver: false,
    }).start(() => {
      props.onFinished();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: progress }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: "#152533",
    borderRadius: 4,
    margin: 10,
    width: 200,
  },
  bar: {
    height: 20,
    backgroundColor: "#9E7CFF",
    borderRadius: 4,
  },
});

export default ProgressBar;
