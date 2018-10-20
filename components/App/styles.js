import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    appHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appTitle: {
        color: '#333',
        fontWeight: 'bold'
    },
    appContent: {
        marginTop: 40,
        padding: 20,
        marginBottom: 40,
    },
    appFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopColor: '#333',
        borderTopWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBtn: {

    },
    todoInput: {
        padding: 10
    }
});
  