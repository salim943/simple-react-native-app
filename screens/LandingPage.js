import React from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from './Sidebar';
import Layout from './Layout';

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <Sidebar />
      <Layout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // similar to Tailwind's `flex-row`
    overflow: 'hidden',
  },
});

export default LandingPage;
