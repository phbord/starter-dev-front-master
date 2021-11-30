import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function Counter({title, nb}) {
  return (
    <View>
      <Text style={styles.nb}>{nb}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  nb: {
    fontWeight: 20,
    fontSize: 20
  },
  title: {
    color: "grey",
    fontWeight: 20,
    fontSize: 16
  }
});
