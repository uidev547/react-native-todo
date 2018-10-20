import React, {Component} from 'react';
import { Text, View } from 'react-native';
import TodoItem from '../TodoItem/index'

export default class TodoList extends Component {
  static defaultProps = {
    list: []
  }
  render() {
    const { list, onTodoAction } = this.props;
    return (
      <View>
        {
          list.map((todo, index) => {
            return <TodoItem todo={todo} key={todo.id} index={index} onTodoAction={onTodoAction} />
          })
        }
      </View>
    );
  }
}
