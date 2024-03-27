import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Seu Título Aqui</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomHeader;