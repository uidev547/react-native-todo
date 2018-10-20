import React, {Component} from 'react';
import { Text, View, TouchableOpacity, TextInput, CheckBox, TouchableHighlight } from 'react-native';
import { styles } from './styles';
import Swipeable from 'react-native-swipeable';


export default class TodoItem extends Component {

  state = {
    isEditing: false,
  }
  updateTodo = (data, type) => {
    const { todo, index, onTodoAction } = this.props;
    onTodoAction({
      todo: {
        ...todo,
        ...data
      },
      index,
      type: 'update'
    });
  }
  handleEdit = () => {
    const { todo } = this.props;
    this.setState({
      isEditing: true,
      text: todo.text
    });
    setTimeout(()=> {
      this.input.focus()
    }, 10);
  }
  handleBlur = () => {
    this.setState({
      isEditing: false
    })
    this.updateTodo({
      text: this.state.text
    })
  }
  handleChangeInput = (text) => {
    const index = text.indexOf('\n');
    if (index > 0) {
      this.handleBlur();
      return;
    }
    this.setState({
      text
    });
  }
  onCheckChange = (event) => {
    const value = event.nativeEvent.value;
    this.updateTodo({
      status: value ? 'completed' : 'new'
    });
  }
  handleDeleteTodo = () => {
    const { todo, index, onTodoAction } = this.props;
    onTodoAction({
      index,
      type: 'delete'
    });
  }
  rightButtons = [
    <View style={styles.todoSwipeOption}>
      <TouchableHighlight onPress={this.handleDeleteTodo}>
        <Text>Delete</Text>
      </TouchableHighlight>
    </View>
  ]
  render() {
    const { todo, index } = this.props;
    const todoStyles = index === 0 ? [styles.todoItem, styles.todoItemFirstItem] : styles.todoItem;
    return (
      <Swipeable
        rightButtons={this.rightButtons}
        style={todoStyles}
      >
        <View style={styles.textWrapper}>
          {
            !this.state.isEditing ?
            <TouchableOpacity
              style={styles.todoTextWrapper}
              onPress={this.handleEdit}
            >
              <Text
                style={[styles.todoText, styles[`todoText${todo.status}`]]}
              >
                {todo.text}
              </Text>
            </TouchableOpacity> :
            <TextInput
              onChangeText={this.handleChangeInput}
              ref={(input) => { this.input = input; }}
              multiline={true}
              style={styles.todoInput}
              value={this.state.text}
              placeholder="Add new todo"
              onBlur={this.handleBlur}
            />
          }
        </View>
        <View style={styles.checkBox}>
          <CheckBox
            value={todo.status === 'completed'}
            onChange={this.onCheckChange}
          />
        </View>
      </Swipeable>
    );
  }
}
