import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 16
    },
    welcomeText: {
        fontSize: 26,
        color: '#e02041',
        fontWeight: 'bold'
    },
    paragraph: {
        lineHeight: 32,
        color: '#737380'
    },
    field: {
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
    button: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        height: 30,
        backgroundColor: '#e02041',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})