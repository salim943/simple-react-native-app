import React from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const IconStyle = {
  width: 24,
  height: 24,
  color: "#6B7280",
};

const HomeIcon = () => (
  <Svg {...IconStyle} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
    <Path d="M3 9.5L12 3l9 6.5v11a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-11z" />
  </Svg>
);

const SimulationIcon = () => (
  <Svg {...IconStyle} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
    <Path d="M3 12h3l3 8 4-16 3 8h5" />
  </Svg>
);

const UserIcon = () => (
  <Svg {...IconStyle} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
    <Path d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87m7-1.13a4 4 0 10-8 0 4 4 0 008 0z" />
  </Svg>
);

const SettingsIcon = () => (
  <Svg {...IconStyle} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
    <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.95 16.95l1.41 1.41M1 12h2m18 0h2M4.22 19.78l1.42-1.42M19.78 4.22l-1.42 1.42M12 7a5 5 0 100 10 5 5 0 000-10z" />
  </Svg>
);

const NavItem = ({ icon, label, href }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (href.startsWith("http")) {
      Linking.openURL(href);
    } else {
      navigation.navigate(href); // Navigate to screen by name
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.navItem}>
      {icon}
      <Text style={styles.navText}>{label}</Text>
    </TouchableOpacity>
  );
};

const Sidebar = () => {
  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🌟 Signal Processing SW</Text>
      </View>
      <ScrollView contentContainerStyle={styles.navList}>
        <NavItem icon={<HomeIcon />} label="Theory" href="https://www.salimwireless.com/p/homepage-salimwireless.html" />
        <NavItem icon={<SimulationIcon />} label="Simulation" href="https://digital-signal-processing-simulator.vercel.app/simulation" />
        <NavItem icon={<UserIcon />} label="Profile" href="Profile" />
        <NavItem icon={<SettingsIcon />} label="Settings" href="Settings" />
        <NavItem icon={<HomeIcon />} label="Go Home" href="Home" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  navList: {
    paddingVertical: 12,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  navText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
  },
});

export default Sidebar;