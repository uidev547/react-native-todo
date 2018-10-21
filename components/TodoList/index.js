import React, {Component} from 'react';
import { TouchableHighlight } from 'react-native';
import TodoItem from '../TodoItem/index'
import SortableListView from 'react-native-sortable-listview'
import { styles } from './styles';

class RowRenderer extends Component {
  render() {
    const { onTodoAction, todo, index, sortHandlers } = this.props;
    return (<TouchableHighlight
      {...sortHandlers}
      style={styles.sortableRow}
    >
      <TodoItem todo={todo} index={index} onTodoAction={onTodoAction} />
    </TouchableHighlight>);
  }
}

export default class TodoList extends Component {
  static defaultProps = {
    list: []
  }
  renderRow = (todo, index) => {
    const { onTodoAction } = this.props;
    return <RowRenderer key={todo.id} todo={todo} index={index} onTodoAction={onTodoAction} />
  }
  handleRowMove = e => {
    const { list, onRearrange } = this.props; 
    const newList = [ ...list ];
    newList.splice(e.to, 0, newList.splice(e.from, 1)[0]);
    onRearrange(newList);
  }
  render() {
    const { list } = this.props;
    const order = Object.keys(list);
    return (
      <SortableListView
        style={{ flex: 1 }}
        data={list}
        order={order}
        onRowMoved={this.handleRowMove}
        renderRow={this.renderRow}
      />
    );
  }
}
