import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnimeCardPlaceholder() {
  return (
    <View style={styles.card}>
      <ShimmerPlaceHolder LinearGradient={LinearGradient} style={styles.image} />
      <ShimmerPlaceHolder LinearGradient={LinearGradient} style={styles.title} />
      <ShimmerPlaceHolder LinearGradient={LinearGradient} style={styles.score} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 8,
    elevation: 2,
  },
  image: {
    height: 176, // matches Tailwind h-44
    width: '100%',
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    height: 16,
    width: '75%',
    borderRadius: 6,
    marginBottom: 6,
  },
  score: {
    height: 14,
    width: '30%',
    borderRadius: 6,
  },
});
