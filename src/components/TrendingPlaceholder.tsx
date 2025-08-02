import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ITEM_WIDTH = 104;
const ITEM_HEIGHT = 128;

export default function TrendingPlaceholder() {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-ITEM_WIDTH, ITEM_WIDTH],
  });

  return (
    <View className="mb-4 px-2">
      <View className="mb-2 h-6 w-24 rounded bg-gray-300" />
      <View className="flex-row">
        {[...Array(6)].map((_, index) => (
          <View key={index} className="mr-2 h-32 w-24 overflow-hidden rounded-lg bg-gray-300">
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
