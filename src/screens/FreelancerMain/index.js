import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import styles from './styles';

export default function ClientRegister() {
    const navigation = useNavigation();
    const [projects, setProjects] = useState([]);
    const [isUserTeamOwner, setIsUserTeamOwner] = useState();
    const route = useRoute();
    const userSession = route.params.userSession;
    const authorization = route.params.authorization;

    useEffect(() => {
        api.get('available_projects', {
            headers: {
                authorization: `Bearer ${authorization}`   
            }
        }).then(response => {
            setProjects(response.data);
        });
        
        api.get('team_owner_verifications', {
            headers: {
                team_id: userSession.user_team_id,
                user_id: userSession.user_id,
                authorization: `Bearer ${authorization}`     
            }
        }).then(response => {
            setIsUserTeamOwner(response.data.user_is_team_owner);
        });
    },[userSession.user_team_id, userSession.user_id, authorization]);

    return(  
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity onPress={() => navigation.navigate('OngoingProjects', { userSession, authorization })} style={styles.optionsButton}><Text style={styles.optionsButtonText}>Em andamento</Text></TouchableOpacity>
                <TouchableOpacity style={styles.optionsButton}><Text style={styles.optionsButtonText}>Perfil</Text></TouchableOpacity>
            </View>
            <Text style={styles.h1}>Projetos</Text>
            <FlatList style={styles.list} data={projects} keyExtractor={project => project._id} renderItem={({ item }) => (
                <View style={styles.itemCard}>
                    <Text style={styles.itemStrong}>Nome:</Text>
                    <Text style={styles.ItemInfo}>{item.title}</Text>
                    <Text style={styles.itemStrong}>Descrição:</Text>
                    <Text style={styles.ItemInfo}>{item.description}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('NewOffer', { userSession, authorization })} style={styles.makeOffer}><Text style={{color: '#FFF'}}>Fazer proposta</Text></TouchableOpacity>
                </View>
            )}/>
        </View>
    );
}