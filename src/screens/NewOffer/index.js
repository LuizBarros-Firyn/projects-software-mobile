import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker'

import styles from './styles';

export default function NewOffer() {
    const navigation = useNavigation();
    const route = useRoute();
    const userSession = route.params.userSession;
    const authorization = route.params.authorization;
    
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');

    async function handleNewOffer() {
        if(!price || !description || !startDate || !finishDate){
            Alert.alert('Campos em branco', 'Verifique se todos os campos foram preenchidos');
            return
        }

        if(description.length < 10 || description.length > 300) {
            Alert.alert('Descrição inválida', 'A descrição precisa de no minimo 10 e no máximo 45 caracteres');
            return
        }

        const data = {
            price,
            description,
            start_date: startDate,
            finish_date: finishDate,
        }

        try {
            await api.post('offers', data, {
                headers: {
                    user_id: userSession.user_id,
                    mobile: true,
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

                <TextInput value={price} onChangeText={e => setPrice(e)} placeholderTextColor={'grey'} style={styles.field} placeholder="Preço" />
                <TextInput value={description} onChangeText={e => setDescription(e)} placeholderTextColor={'grey'} style={styles.field}  placeholder="Descrição da oferta" />
                <TextInput value={startDate} onChangeText={e => setStartDate(e)} placeholderTextColor={'grey'} style={styles.field} placeholder="Data de inicio(dd/mm/yyyy)" />
                <TextInput value={finishDate} onChangeText={e => setFinishDate(e)} placeholderTextColor={'grey'} style={styles.field}  placeholder="Data de entrega(dd/mm/yyyy)" />

                
                <TouchableOpacity style={styles.button} onPress={() => handleNewProject()}>
                    <Text style={{color: '#FFF', fontSize: 20}}>Publicar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}