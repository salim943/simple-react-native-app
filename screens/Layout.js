import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  AsyncStorage, // or use @react-native-async-storage/async-storage
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        setIsLoggedIn(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigation.navigate('Login'); // screen name must match your navigator
  };

  const handleLogin = () => navigation.navigate('Login');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRight}>
        {isLoggedIn ? (
          <Button title="Logout" color="#ef4444" onPress={handleLogout} />
        ) : (
          <Button title="Login" color="#22c55e" onPress={handleLogin} />
        )}
      </View>

      <Text style={styles.heading}>About</Text>
      <Text style={styles.paragraph}>
        Welcome to the Digital Signal Processing Simulator.{"\n"}
        Explore the fascinating world of communication systems with our interactive simulator. Designed for learners, 
        educators, and engineers, it simplifies complex concepts like modulation, time and frequency-domain signal analysis.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  topRight: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
});

export default Layout;
