import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    todoItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    todoText: {
        color: '#888',
    },
    todoTextcompleted: {
        textDecorationLine: 'line-through'
    },
    todoInput: {
        flexGrow: 1
    }
});
  