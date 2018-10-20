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
import ObjectID from 'bson-objectid';


export default class App extends Component {
  state = {
    modalVisible: false,
    text: '',
    list: [],
  }
  addTodo = (text) => {
    const newTodo = {
      text,
      status: 'new',
      id: ObjectID()
    };
    this.setState({
      list: [...this.state.list, newTodo ]
    })
  }
  handleAddNewTodo= () => {
    if(this.state.text) {
      this.addTodo(this.state.text);
      this.setState({
        text: ''
      });
    }
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
  handleUpdateTodo = ({ todo, index }) => {
    const newList = [...this.state.list];
    newList[index] = todo;
    this.setState({
      list: newList
    });
  }
  handleDeleteTodo = ({ todo, index }) => {
    const newList = [...this.state.list];
    newList.splice(index, 1);
    this.setState({
      list: newList
    });
  }

  handleTodoAction = (config) => {
    const { type } = config;
    switch(type) {
      case 'update': {
        this.handleUpdateTodo(config);
        break;
      }
      case 'delete': {
        this.handleDeleteTodo(config);
        break;
      }
    }
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>Todo List</Text>
        </View>
        <ScrollView style={styles.appContent} keyboardShouldPersistTaps="always">
          <TodoList list={this.state.list} onTodoAction={this.handleTodoAction} />
          <TextInput
            onChangeText={this.handleChangeInput}
            multiline={true}
            style={styles.todoInput}
            value={this.state.text}
            placeholder="Add new todo !!!!"
            ref={(input) => { this.input = input; }}
          />
        </ScrollView>
        <View style={styles.appFooter}>
          <TouchableOpacity style={styles.addTodoBtn} onPress={this.handleAddNewTodo}>
            <Text> Add New Todo </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}