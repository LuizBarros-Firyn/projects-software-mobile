import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import styles from './styles';

export default function Login() {
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if(!email || !password){
            Alert.alert('Campos em branco', 'Verifique se todos os campos foram preenchidos');
            return
        }

        const data = {
            email,
            password
        }

        await api.post('sessions', data).then(async response => {
            if (response.data.fail_message){
                Alert.alert('Erro no login', `${response.data.fail_message}`);
                return;
            }

            if (response.data.userSession.user_is_freelancer){
                navigation.navigate('FreelancerMain', { userSession: response.data.userSession, authorization: response.data.authorization});
            } else {
                navigation.navigate('ClientMain', { userSession: response.data.userSession, authorization: response.data.authorization});
            }
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Seja bem vindo!</Text>

            <TextInput value={email} onChangeText={e => setEmail(e)} placeholderTextColor={'grey'} style={styles.emailField} placeholder="E-mail" />
            <TextInput value={password} onChangeText={e => setPassword(e)} secureTextEntry={true} placeholderTextColor={'grey'} style={styles.passwordField}  placeholder="Senha" />

            <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
                <Text style={{color: '#FFF', fontSize: 18}}>Logar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetPasswordButton} onPress={() => {}}>
                <Text style={styles.resetPasswordButtonText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Ou</Text>

            <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('RegisterOptions')}>
                <Text style={{color: '#FFF', fontSize: 18}}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}