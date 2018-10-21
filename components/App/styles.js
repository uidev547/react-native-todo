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
        paddingBottom: 0,
        flex: 1,
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
    },
    addTodoBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    todoInput: {
        padding: 20,
        marginBottom: 20
    },
    loader: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteUndoSection: {
        backgroundColor: '#333',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%'
    },
    deleteUndoText: {
        color: '#fff'
    },
    deleteInfoText: {
        color: '#bbb'
    }
});
  