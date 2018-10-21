import React, {Component} from 'react';
import { Text, View, TextInput, CheckBox, TouchableHighlight, Dimensions } from 'react-native';
import { styles } from './styles';
import Swipeable from 'react-native-swipeable';
import DoubleClick from '../../common/DoubleClick/index';


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
      <Text style={styles.deleteInfoText}>Deleting this item</Text>
    </View>
  ]
  render() {
    const { todo, index } = this.props;
    const todoStyles = index === 0 ? [styles.todoItem, styles.todoItemFirstItem] : styles.todoItem;
    const windowWidth = Dimensions.get('window').width;

    return (
      <Swipeable
        rightButtons={this.rightButtons}
        style={todoStyles}
        rightButtonWidth={windowWidth}
        rightActionActivationDistance={windowWidth*0.4}
        onRightActionRelease={this.handleDeleteTodo}
      >
        <View style={styles.textWrapper}>
          {
            !this.state.isEditing ?
            <DoubleClick
              style={styles.todoTextWrapper}
              onDoubleClick={this.handleEdit}
            >
              <Text
                style={[styles.todoText, styles[`todoText${todo.status}`]]}
              >
                {todo.text}
              </Text>
            </DoubleClick> :
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
