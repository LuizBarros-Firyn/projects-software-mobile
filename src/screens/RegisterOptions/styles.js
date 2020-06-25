import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    clientText: {
        fontSize: 36,
        fontWeight: '500',
        marginTop: 30,
        marginBottom: 15,
        color: '#e02041'
    },
    freelancerText: {
        fontSize: 36,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 15,
        color: '#e02041'
    },
    portraits: {
        marginBottom: 15
    },
    clientInfo: {
        flexDirection: 'row'
    },
    clientInfoText: {
        fontSize: 16,
        lineHeight: 30,
        marginLeft: 5
    },
    goToClientRegisterButton: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        height: 40,
        backgroundColor: '#e02041',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    goToFreelancerRegisterButton: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        height: 40,
        backgroundColor: '#e02041',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    backToLogin: {
        color: '#e02041',
        fontSize: 15,
        marginTop: 30
    },
    clientButton: {
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        height: 40,
        backgroundColor: '#e02041',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
})