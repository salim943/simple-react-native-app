import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/expenseTracker"; // change to your computer's IP for physical device

const CreateTodo = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!userId || !title || !description) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      await axios.post(`${API_URL}/users/${userId}/todos/`, {
        title,
        description,
      });
      Alert.alert("Success", "Todo created successfully!");
      setUserId("");
      setTitle("");
      setDescription("");
    } catch (error) {
      Alert.alert("Error", "Error creating todo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Comment</Text>

      <TextInput
        style={styles.input}
        placeholder="User ID"
        keyboardType="numeric"
        value={userId}
        onChangeText={setUserId}
      />

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Add" onPress={handleSubmit} />
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

export default CreateTodo;