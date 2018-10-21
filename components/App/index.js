/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, ScrollView, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import TodoList from '../TodoList/index';
import ObjectID from 'bson-objectid';
import { getItem, setItem } from '../../storage/index';

let timeout = null;
let latestList = null;

export default class App extends Component {
  state = {
    modalVisible: false,
    text: '',
    list: [],
    status: 'loading',
    showDeleteUndo: false
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const data = await getItem({
      key: 'todolist'
    })
    this.setState({
      list: data || [],
      status: 'loaded'
    });
  }
  setData = async (data) => {
    setItem({
      key: 'todolist',
      data
    })
  }
  setDataInBackground = (data) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this.setData(data)
    }, 1000);
  }
  addTodo = (text) => {
    this.hideDeleteUndoPanel();
    const newTodo = {
      text,
      status: 'new',
      id: ObjectID(),
      createTime: Date.now(),
      taskTime: Date.now()
    };
    const list = [...this.state.list, newTodo ];
    this.setState({
      list
    });
    this.setDataInBackground(list);
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
    this.hideDeleteUndoPanel();
    const newList = [...this.state.list];
    newList[index] = {
      todo,
      modifiedDate: Date.now()
    };
    this.setState({
      list: newList
    });
    this.setDataInBackground(newList);
  }
  handleDeleteTodo = ({ todo, index }) => {
    const newList = [...this.state.list];
    latestList = this.state.list;
    this.showDeleteUndoPanel();
    newList.splice(index, 1);
    this.setState({
      list: newList
    });
    this.setDataInBackground(newList);
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

  hideDeleteUndoPanel = () => {
    clearTimeout(this.deleteUndoTimer);
    this.setState({
      showDeleteUndo: false
    })
  }
  showDeleteUndoPanel = () => {
    this.setState({
      showDeleteUndo: true
    })
    clearTimeout(this.deleteUndoTimer);
    this.deleteUndoTimer = setTimeout(this.hideDeleteUndoPanel, 2000)
  }

  handleUndoDelete = () => {
    this.setState({
      list: latestList
    });
    this.setDataInBackground(latestList);
  }

  handleRearrage = (data) => {
    this.setState({
      list: data
    });
    this.setDataInBackground(data);
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>Todo List</Text>
        </View>
        {
          this.state.status === 'loaded' ?
          <ScrollView style={styles.appContent} keyboardShouldPersistTaps="always">
            <TodoList
              list={this.state.list}
              onTodoAction={this.handleTodoAction}
              onRearrange={this.handleRearrage}
            />
            <TextInput
              onChangeText={this.handleChangeInput}
              multiline={true}
              style={styles.todoInput}
              value={this.state.text}
              placeholder="Add new todo !!!!"
              ref={(input) => { this.input = input; }}
            />
          </ScrollView> :
          <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
        }
        
        <View style={styles.appFooter}>
          <TouchableOpacity style={styles.addTodoBtn} onPress={this.handleAddNewTodo}>
            <Text> Add New Todo </Text>
          </TouchableOpacity>
          {
            this.state.showDeleteUndo && <View style={styles.deleteUndoSection}>
              <Text style={styles.deleteInfoText}>Item has been deleted</Text>
              <TouchableOpacity onPress={this.handleUndoDelete}>
                <Text style={styles.deleteUndoText}>Undo</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    );
  }
}