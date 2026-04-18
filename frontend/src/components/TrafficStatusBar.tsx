// src/components/TrafficStatusBar.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface StatusProps {
  currentPings: number;
  capacity: number;
}

export const TrafficStatusBar: React.FC<StatusProps> = ({ currentPings, capacity }) => {
  const ratio = currentPings / capacity;
  
  // Logic: Match the backend's 0.8 threshold
  const isCongested = ratio >= 0.8;
  const statusText = isCongested ? "Gate 1: Heavy Traffic" : "Gate 1: Clear";
  const statusColor = isCongested ? "#FF3B30" : "#4CD964"; // Red for heavy, Green for clear

  return (
    <View style={[styles.bar, { backgroundColor: statusColor }]}>
      <Text style={styles.text}>{statusText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: SCREEN_WIDTH,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    // Add a slight shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});