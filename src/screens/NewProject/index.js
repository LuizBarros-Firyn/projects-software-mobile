import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import styles from './styles';

export default function NewProject() {
    const navigation = useNavigation();
    const route = useRoute();
    const userSession = route.params.userSession;
    const authorization = route.params.authorization;
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleNewProject() {
        if(!title || !description){
            Alert.alert('Campos em branco', 'Verifique se todos os campos foram preenchidos');
            return
        }
        
        if(title.length < 5 || title.length > 45) {
            Alert.alert('Titulo inválido', 'O titulo precisa de no minimo 5 e no máximo 45');
            return
        }

        if(description.length < 10 || description.length > 300) {
            Alert.alert('Descrição inválida', 'A descrição precisa de no minimo 10 e no máximo 45 caracteres');
            return
        }

        const data = {
            title,
            description
        }

        try {
            await api.post('projects', data, {
                headers: {
                    user_id: userSession.user_id,
                    authorization: `Bearer ${authorization}`
                }
            });
            Alert.alert('Projeto cadastrado com sucesso', 'Seu projeto foi cadastrado com sucesso');
        } catch (error) {
            Alert.alert('Erro no cadastro', 'Tente novamente mais tarde');
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.welcomeText}>Publique um projeto!</Text>

                <Text style={styles.paragraph}>Insira as informações de seu projeto para ter as melhores equipes a sua disposição!</Text>

                <TextInput value={title} onChangeText={e => setTitle(e)} placeholderTextColor={'grey'} style={styles.field} placeholder="Titulo do projeto" />
                <TextInput value={description} onChangeText={e => setDescription(e)} placeholderTextColor={'grey'} style={styles.field}  placeholder="Descrição do projeto" />

                <TouchableOpacity style={styles.button} onPress={() => handleNewProject()}>
                    <Text style={{color: '#FFF', fontSize: 20}}>Publicar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}