import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import styles from './styles';

export default function OngoingProjects() {
    const navigation = useNavigation();
    const [projects, setProjects] = useState([]);
    const route = useRoute();
    const userSession = route.params.userSession;
    const authorization = route.params.authorization;

    useEffect(() => {
        api.get('ongoing_projects', {
            headers: userSession.user_is_freelancer ? 
                {
                    team_id: userSession.user_team_id,
                    authorization: `Bearer ${authorization}`
                }
                :
                {
                    user_id: userSession.user_id,
                    authorization: `Bearer ${authorization}`
                }
            }
        ).then(response => {
            setProjects(response.data);
        });
    }, [])

    return(  
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.optionsButton}><Text style={styles.optionsButtonText}>Em andamento</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('NewProject', { userSession, authorization })} style={styles.optionsButton}><Text style={styles.optionsButtonText}>Publicar Projeto</Text></TouchableOpacity>
                <TouchableOpacity style={styles.optionsButton}><Text style={styles.optionsButtonText}>Perfil</Text></TouchableOpacity>
            </View>
            <Text style={styles.h1}>Projetos</Text>
            <FlatList style={styles.list} data={projects} keyExtractor={project => project._id} renderItem={({ item }) => (
                <View style={styles.itemCard}>
                    <Text style={styles.itemStrong}>Nome:</Text>
                    <Text style={styles.ItemInfo}>{item.title}</Text>
                    {userSession.user_is_freelancer ?
                        <Fragment>
                            <Text style={styles.itemStrong}>Cliente:</Text>
                            <Text style={styles.ItemInfo}>{item.user.name}</Text>
                        </Fragment>
                    :
                        <Fragment>
                            <Text style={styles.itemStrong}>Equipe responsável:</Text>
                            <Text style={styles.ItemInfo}>{item.team.title}</Text>
                        </Fragment>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('ProjectDevelopment', { userSession, authorization, projectId: item._id })}style={styles.goOffers}>
                        <Icon name='arrow-right' size={20} color={'#e02041'} />
                        <Text style={styles.goOffersText}>Acompanhar este projeto</Text>
                    </TouchableOpacity>
                </View>
            )}/>
        </View>
    );
}