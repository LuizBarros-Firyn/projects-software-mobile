import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        alignItems: 'center',
    },
    options: {
        flexDirection: 'row',
    },
    optionsButton: {
        padding: 4,
        paddingHorizontal: 8,
        marginHorizontal: 10,
        backgroundColor: '#e02041',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },
    optionsButtonText: {
        color: '#FFF',
        fontSize: 16
    },
    titleDiv: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    h1: {
        marginTop: 32,
        alignSelf: 'flex-start',
        fontSize: 32
    },
    list: {
        alignSelf: 'stretch',
        marginTop: 10
    },
    itemCard: {
        paddingHorizontal: 24,
        backgroundColor: '#FFF',
        borderRadius: 7,
        paddingVertical: 12,
        marginBottom: 20
    },
    itemStrong: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 6,
        marginTop: 6
    },
    makeOffer:{
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        height: 30,
        backgroundColor: '#e02041',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
})