import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import User from '../../assets/User.svg';
import styles from './styles';

export default function PasswordRecovery() {
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');

    async function handleResetPassword() {
        if(!email){
            Alert.alert('Campos em branco', 'Verifique se todos os campos foram preenchidos');
            return
        }

        const data = {
            userEmail: email
        }

        await api.post('password_recovery', data).then(async response => {
            if (response.data.error){
                Alert.alert('Erro na recuperação de senha, tente amis tarde', `${response.data.error}`);
                return;
            }

            Alert.alert('Cheque seu e-mail!', 'Cheque seu email para ter acesso ao seu token de recuperação de senha');
            navigation.navigate('PasswordReset');
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Digite seu email</Text>

            <View style={styles.userPortrait}><User width={100} height={100}/></View>

            <TextInput value={email} onChangeText={e => setEmail(e)} placeholderTextColor={'grey'} style={styles.emailField} placeholder="E-mail" />

            <TouchableOpacity style={styles.loginButton} onPress={() => handleResetPassword()}>
                <Text style={{color: '#FFF', fontSize: 18}}>Confirmar</Text>
            </TouchableOpacity>

        </View>
    );
}