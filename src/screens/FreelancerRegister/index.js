import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

export default function ClientRegister() {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [techs, setTechs] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [email, setEmail] = useState('');

    async function handleLogin() {
        if (!firstName || !lastName || !password || !age || !techs || !city || !uf || !email) {
            Alert.alert('Campos em branco', 'Verifique se todos os campos foram preenchidos');
            return
        }

        if (firstName.length <= 2 || lastName.length <= 2 || firstName.length >= 30 || lastName.length >= 30) {
            Alert.alert('Nome inválido', 'Verifique se os campos de nome foram preenchidos corretamente');
            return
        }

        if (password.length <= 4) {
            Alert.alert('Senha muito curta', 'Insira uma senha maior');
            return
        }

        if (password.length >= 30) {
            Alert.alert('Senha muito longa', 'Insira uma senha menor');
            return
        }
        
        if (age < 18) {
            Alert.alert('Apenas maiores de idade', 'Somente são permitidos maiores de idade');
            return
        }
        
        if (age > 120 || age.length > 120) {
            Alert.alert('Idade inválida', 'A idade informada está inválida');
            return
        }

        if (techs.length > 120) {
            Alert.alert('Tecnologias inválidas', 'Insira apenas suas principais tecnologias');
            return
        }

        if (city.length <= 1 || city.length >= 60) {
            Alert.alert('Cidade inválida', 'A cidade informada está inválida');
            return
        }

        if (uf.length != 2) {
            Alert.alert('UF inválido', 'Favor inserir um UF válido');
            return
        }

        const data = {
            name: firstName.trim() + " " + lastName.trim(),
            password,
            age,
            email,
            techs,   
            city,
            uf,
            is_freelancer: true
        };

        await api.post('/users', data).then(response => {
            if (response.data.fail_message){
                Alert.alert('Erro no registro', `${response.data.fail_message}`);
                return;
            }
        });

        navigation.navigate('Login');
    }

    return(
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled={true}
            
        >
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Olá Freelancer!</Text>

                <View style={styles.inputGroup}>
                    <TextInput value={firstName} onChangeText={e => setFirstName(e)} placeholderTextColor={'grey'} style={styles.groupField} placeholder="Nome" />
                    <TextInput value={lastName} onChangeText={e => setLastName(e)} placeholderTextColor={'grey'} style={styles.groupField} placeholder="Sobrenome" />
                </View>

                <TextInput value={email} onChangeText={e => setEmail(e)} placeholderTextColor={'grey'} style={styles.field} placeholder="E-mail" />

                <View style={styles.inputGroup}>
                    <TextInput value={password} onChangeText={e => setPassword(e)} secureTextEntry={true} placeholderTextColor={'grey'} style={styles.groupField}  placeholder="Senha" />
                    <TextInput value={age} onChangeText={e => setAge(e)} placeholderTextColor={'grey'} style={styles.groupField} placeholder="Idade" />
                </View>

                <TextInput value={techs} onChangeText={e => setTechs(e)} placeholderTextColor={'grey'} style={styles.field}  placeholder="Técnologias (separadas por vírgula)" />

                <View style={styles.inputGroup}>
                    <TextInput value={city} onChangeText={e => setCity(e)} placeholderTextColor={'grey'} style={styles.groupField} placeholder="Cidade" />
                    <TextInput value={uf} onChangeText={e => setUf(e)} placeholderTextColor={'grey'} style={styles.groupField}  placeholder="UF" />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
                    <Text style={{color: '#FFF', fontSize: 18}}>Cadastrar-se</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}