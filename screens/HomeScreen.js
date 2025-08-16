
import React from 'react';
import CreateUser from './CreateUser';
import CreateTodo from './CreateTodo';
import UserList from './UserList';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <CreateUser />
      <CreateTodo />
      <UserList />
    </View>
  );
}
