import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import Sandbox from './components/sandbox';


export default function App() {

  const [todos, setTodos] = useState([
    { text: 'Buy Coffee', key: '1' },
    { text: 'Create a Mobile App', key: '2' },
    { text: 'Play League of Legends', key: '3' }
  ]);

  const pressHandler = (key) => {
    setTodos((currentState) => {
      return (
        currentState.filter(todo => todo.key != key)
      )
    })
  }

  const submitHandler = (text) => {

    if (text.length > 3) {
      setTodos((currentState) => {
        return (
          [
            { text: text, key: Math.random().toString() },
            ...currentState,
          ]
        )
      })
    } else {
      Alert.alert('Oops!', 'Type more than three characters.', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ])
    }

  }


  return (
    // <Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
      <View style={styles.container}>
        {<Header />}

        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}

            />

          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  }

});
