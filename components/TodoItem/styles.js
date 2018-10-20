import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    todoItem: {
        position: 'relative',
        backgroundColor: '#f1f1f1',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        minHeight: 45,
        paddingRight: 10
    },
    todoItemFirstItem: {
        borderTopWidth: 0
    },
    textWrapper: {
        marginLeft: 40,
        padding: 10
    },
    todoTextWrapper: {
        // backgroundColor: 'blue'
    },
    todoInput: {
        padding: 0
    },
    todoText: {
        color: '#888',
    },
    todoTextcompleted: {
        textDecorationLine: 'line-through'
    },
    checkBox: {
        width: 40,
        position: 'absolute',
        top: 5,
        left: 5
    },
    todoSwipeOption: {
        backgroundColor: 'red',
        padding: 10,
        flex: 1
    }
});
  