
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

export default function SimulationTwo() {
  const [result, setResult] = useState('');

  const runSimulation = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/sim2');
      setResult(res.data.message);
    } catch (err) {
      setResult('Error fetching data');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Run Simulation 2" onPress={runSimulation} />
      <Text>{result}</Text>
    </View>
  );
}
