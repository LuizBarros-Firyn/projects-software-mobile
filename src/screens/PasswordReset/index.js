import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import User from '../../assets/User.svg';
import styles from './styles';

export default function PasswordReset() {
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');

    async function handlePasswordReset(values){
        const data = {
            email,
            token,
            new_password: password,
        };

        try {
            await api.put('reset_password', data).then(async response => {
                if (response.data.error) {
                    alert(`${response.data.error}`);
                    return
                }

                Alert.alert('Senha resetada com sucesso!', 'Sua senha foi resetada com sucesso!');
                navigation.navigate('Login');
            });     
        } catch (error) {
            Alert.alert('Erro ao resetar senha', 'tente novamente.');
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Recupere sua senha</Text>

            <View style={styles.userPortrait}><User width={100} height={100}/></View>

            <TextInput value={email} onChangeText={e => setEmail(e)} placeholderTextColor={'grey'} style={styles.emailField} placeholder="E-mail" />
            <TextInput value={token} onChangeText={e => setToken(e)} placeholderTextColor={'grey'} style={styles.emailField} placeholder="Token" />
            <TextInput value={password} onChangeText={e => setPassword(e)} secureTextEntry={true} placeholderTextColor={'grey'} style={styles.passwordField}  placeholder="Senha" />

            <TouchableOpacity style={styles.loginButton} onPress={() => handlePasswordReset()}>
                <Text style={{color: '#FFF', fontSize: 18}}>Resetar a senha</Text>
            </TouchableOpacity>
        </View>
    );
}