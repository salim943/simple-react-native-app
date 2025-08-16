import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/expenseTracker"; // Change to your computer's IP for physical devices

const UserList = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/`);
      setExpenses(response.data);
      const total = response.data.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );
      setTotalAmount(total);
    } catch (error) {
      Alert.alert("Error", "Error fetching expenses.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text><Text style={styles.bold}>ID:</Text> {item.id}</Text>
      <Text><Text style={styles.bold}>Day:</Text> {item.day}</Text>
      <Text><Text style={styles.bold}>Date:</Text> {item.date}</Text>
      <Text><Text style={styles.bold}>Amount:</Text> {item.amount}</Text>
      <Text>
        {item.todo ? `Comment: ${item.todo.description}` : "No Comment"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
      </View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  totalBox: {
    padding: 12,
    backgroundColor: "#bfdbfe",
    borderRadius: 8,
    marginBottom: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  item: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default UserList;