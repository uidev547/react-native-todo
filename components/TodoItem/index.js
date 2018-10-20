import React, {Component} from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';


export default class TodoItem extends Component {

  state = {
    isEditing: false,
  }

  handleUpdateTodo = () => {
    const { todo, index, onUpdateTodo } = this.props;
    onUpdateTodo({
      ...todo,
      status: todo.status === 'completed' ? 'new' : 'completed'
    }, index);
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
    const { todo, index, onUpdateTodo } = this.props;
    onUpdateTodo({
      ...todo,
      text: this.state.text
    }, index);
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
  render() {
    const { todo } = this.props;
    return (
      <View style={styles.todoItem}>
        {
          !this.state.isEditing ? <TouchableOpacity onPress={this.handleEdit}>
            <Text style={[styles.todoText, styles[`todoText${todo.status}`]]}>{todo.text}</Text>
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
        <TouchableOpacity onPress={this.handleUpdateTodo}>
          <Text>{todo.status[0]}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
