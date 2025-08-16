import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/expenseTracker"; // Change if running on physical device

const CreateUser = ({ onUserCreated }) => {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/users/`, { day, date, amount });
      Alert.alert("Success", "Expense added successfully!");
      onUserCreated && onUserCreated();
      setDay("");
      setDate("");
      setAmount("");
    } catch (error) {
      Alert.alert("Error", "Error adding expense.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Day"
        value={day}
        onChangeText={setDay}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
});

export default CreateUser;