import React, {Component} from 'react';
import { Text, View } from 'react-native';
import TodoItem from '../TodoItem/index'

export default class TodoList extends Component {
  static defaultProps = {
    list: []
  }
  render() {
    const { list, onUpdateTodo } = this.props;
    return (
      <View>
        {
          list.map((todo, index) => {
            return <TodoItem todo={todo} key={index} index={index} onUpdateTodo={onUpdateTodo} />
          })
        }
      </View>
    );
  }
}
