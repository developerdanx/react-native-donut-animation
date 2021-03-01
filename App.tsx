import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Donut from './src/components/Donut';

const data = [
  {
    percentage: 8,
    color: 'gold',
    max: 10,
  },
  {
    percentage: 14,
    color: 'red',
    max: 100,
  },
  {
    percentage: 92,
    color: 'blue',
    max: 100,
  },
  {
    percentage: 240,
    color: 'lime',
    max: 500,
    radius: 150,
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {data.map((property, i) => {
          return (
            <Donut
              key={i}
              percentage={property.percentage}
              color={property.color}
              max={property.max}
              radius={property.radius}
              delay={1000}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
