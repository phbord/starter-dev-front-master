import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function FloatingBtn({toogle, isOpen}) {
  return (
    <Pressable onPress={toogle} style={styles.btn}>
      <Text style={styles.txt}>{isOpen ? "x" : "+"}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "orange",
    width: 40,
    height: 40,
    justifyContent: "center",
    borderRadius: 40
  },
  txt: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  }
});
