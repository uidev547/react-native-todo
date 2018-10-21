import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    todoItem: {
        position: 'relative',
        backgroundColor: '#f1f1f1',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        minHeight: 45
    },
    todoItemFirstItem: {
        borderTopWidth: 0
    },
    textWrapper: {
        marginLeft: 40,
        padding: 20
    },
    todoTextWrapper: {
        // backgroundColor: 'blue'
    },
    todoInput: {
        padding: 0,
        position: 'relative',
        top: -3
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
        top: 15,
        left: 15
    },
    todoSwipeOption: {
        backgroundColor: '#333',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteUndoText: {
        color: '#fff'
    },
    deleteInfoText: {
        color: '#bbb'
    }
});
  