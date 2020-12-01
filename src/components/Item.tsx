import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Item = ({name}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e0dde2',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
});

export default Item;
