/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';
import TodoList from '../TodoList/index';


export default class App extends Component {
  state = {
    modalVisible: false,
    text: '',
    list: [],
  }
  addTodo = (text) => {
    this.setState({
      list: [...this.state.list, { text, status: 'new' }]
    })
  }
  handleAddNewTodo= () => {
    this.input.focus();
  }
  
  handleChangeInput = (text) => {
    const index = text.indexOf('\n');
    if (index > 0) {
      const todo = text.substr(0, index);
      this.addTodo(todo);
      const otherText = text.substr(index + 1);
      this.handleChangeInput(otherText);
      return;
    }
    this.setState({
      text
    })
  }
  handleUpdateTodo = (todo, index) => {
    const newList = [...this.state.list];
    newList[index] = todo;
    this.setState({
      list: newList
    });
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>Todo List</Text>
        </View>
        <ScrollView style={styles.appContent} keyboardShouldPersistTaps="always">
          <TodoList list={this.state.list} onUpdateTodo={this.handleUpdateTodo} />
          <TextInput
            onChangeText={this.handleChangeInput}
            multiline={true}
            style={styles.todoInput}
            value={this.state.text}
            placeholder="Add new todo"
            ref={(input) => { this.input = input; }}
          />
        </ScrollView>
        <View style={styles.appFooter}>
          <TouchableOpacity onPress={this.handleAddNewTodo}>
            <Text> Add New Todo </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}