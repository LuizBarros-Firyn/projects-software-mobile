import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import styles from './styles';

export default function OffersReview() {
    const navigation = useNavigation();
    const [offers, setOffers] = useState([]);
    const route = useRoute();
    const userSession = route.params.userSession;
    const authorization = route.params.authorization;
    const projectId = route.params.projectId;

    useEffect(() => {
        api.get('offers', {
            headers: {
                user_id: userSession.user_id,
                project_id: projectId,
                authorization: `Bearer ${authorization}`
            }
        }).then(response => {
            setOffers(response.data);
        });
    }, []);

    async function handleAcceptOffer(offer) {
        const data = {
            price: offer.price,
            start_date: offer.start_date,
            finish_date: offer.finish_date
        }

        try {
            await api.put(`assign_project_team/${offer.project}`, data, {
                headers: {
                    user_id: userSession.user_id,
                    team_id: offer.team._id,
                    authorization: `Bearer ${authorization}`
                }
            });

            Alert.alert('Oferta aceita com sucesso!', 'A oferta foi aceita');
        } catch {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    async function handleDeleteOffer(id) {
        try {
            await api.delete(`offers/${id}`, {
                headers: {
                    user_id: userSession.user_id,
                    authorization: `Bearer ${authorization}`
                }
            });

            setOffers(offers.filter(offers => offers._id !== id));
        } catch {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString('pt-BR',options);
    }

    return(  
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.optionsButton}><Text style={styles.optionsButtonText}>Em andamento</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('NewProject', { userSession, authorization })} style={styles.optionsButton}><Text style={styles.optionsButtonText}>Publicar Projeto</Text></TouchableOpacity>
                <TouchableOpacity style={styles.optionsButton}><Text style={styles.optionsButtonText}>Perfil</Text></TouchableOpacity>
            </View>
            <Text style={styles.h1}>Ofertas</Text>
            <FlatList style={styles.list} data={offers} keyExtractor={offer => offer._id} renderItem={({ item }) => (
                <View style={styles.itemCard}>
                    <Text style={styles.itemStrong}>Nome da Equipe:</Text>
                    <Text style={styles.ItemInfo}>{item.team.title}</Text>
                    <Text style={styles.itemStrong}>Descrição da oferta:</Text>
                    <Text style={styles.ItemInfo}>{item.description}</Text>
                    <Text style={styles.itemStrong}>Data de inicio:</Text>
                    <Text style={styles.ItemInfo}>{formatDate(item.start_date)}</Text>
                    <Text style={styles.itemStrong}>Data de entrega:</Text>
                    <Text style={styles.ItemInfo}>{formatDate(item.finish_date)}</Text>
                    <Text style={styles.itemStrong}>Preço:</Text>
                    <Text style={styles.ItemInfo}>{item.price}</Text>
                    <View style={styles.choices}>
                        <TouchableOpacity onPress={() => handleDeleteOffer(item._id)} style={styles.choice}><Text style={styles.choiceText}>Recusar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAcceptOffer(item)} style={styles.choice}><Text style={styles.choiceText}>Aceitar</Text></TouchableOpacity>
                    </View>
                </View>
            )}/>
        </View>
    );
}