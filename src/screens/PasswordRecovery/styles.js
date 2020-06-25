import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        color: '#e02041'
    },
    userPortrait: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#e02041',
        borderRadius: 50
    },
    emailField: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        borderBottomWidth: 2,
        paddingHorizontal: 16,
        marginBottom: 36,
        height: 40,
        color: '#333',
        borderRadius: 5,
        borderColor: '#e02041',
        textAlign: 'center',
    },
    passwordField: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        borderBottomWidth: 2,
        paddingHorizontal: 16,
        marginBottom: 32,
        height: 40,
        color: '#333',
        borderRadius: 5,
        borderColor: '#e02041',
        textAlign: 'center'
    },
    loginButton: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        height: 40,
        backgroundColor: '#e02041',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createAccountButton: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        height: 40,
        backgroundColor: '#e02041',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    resetPasswordButtonText: {
        color: '#e02041',
        fontSize: 15,
        marginTop: 30
    },
    orText: {
        color: 'grey',
        marginTop: 40
    },
    newAccount: {
        marginTop: 40
    }
})