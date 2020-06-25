import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import styles from './styles';

export default function ProjectDevelopment() {
    const [project, setProject] = useState([]);
    const [projectMessages, setProjectMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const route = useRoute();
    const userSession = route.params.userSession;
    const authorization = route.params.authorization;
    const projectId = route.params.projectId;

    const navigation = useNavigation();

    useEffect(() => {
        async function fetchPageData() {
            await api.get(`ongoing_projects/${projectId}`, {
                headers: {
                        request_owner: userSession.user_is_freelancer ? userSession.user_team_id : userSession.user_id,
                        authorization: `Bearer ${authorization}`
                }            
            }).then(response => {
                setProject(response.data);
            });
    
            setInterval(async () => {
                await api.get(`project_messages/${projectId}`, {
                    headers: {
                            sender_id: userSession.user_is_freelancer ? userSession.user_team_id : userSession.user_id,
                            authorization: `Bearer ${authorization}`
                    }            
                }).then(response => {
                    setProjectMessages(response.data);
                });
            }, 5000);
        }

        fetchPageData();
    }, [userSession.user_is_freelancer, userSession.user_id, userSession.user_team_id, projectId, authorization]);

    async function handleNewMessage() {
        if (newMessage.length > 400) {
            Alert.alert('Mensagem muito grande', 'Por favor, reduza o numero de caracteres ou divida a mensagem em duas.');
            return;
        }
        
        if (newMessage.length === 0) {
            Alert.alert('Mensagem vazia', 'Digite uma mensagem na caixa de texto!');
            return;
        }

        const data = {
            message: newMessage
        }

        try {
            await api.post('project_messages', data, {
                headers: {
                    project_id: projectId,
                    sender_id: userSession.user_is_freelancer ? userSession.user_team_id : userSession.user_id,
                    authorization: `Bearer ${authorization}`
                }
            }).then(response => {
                setProjectMessages([...projectMessages, response.data]);
            })
        } catch (error) {
            Alert.alert('Erro ao enviar a mensagem', 'tente novamente mais tarde');
        }

        setNewMessage('');
    }

    async function handleSendToApproval() {
        try {
            await api.put(`project_approval_state/${project._id}`, {}, {
                headers: {
                    authorization: `Bearer ${authorization}`
                }
            }).then(response => {
                setProject(response.data);
            });

            Alert.alert('Marcado como pronto!', 'Aguarde a aprovação do cliente');
        } catch (error) {
            Alert.alert('Erro ao enviar para aprovação', 'tente novamente mais tarde');
        }
    }

    async function handleApprove() {
        try {
            await api.put(`ongoing_projects/${project._id}`, {}, {
                headers: {
                    authorization: `Bearer ${authorization}`
                }
            });

            Alert.alert('Aprovado com sucesso!', 'Agradecemos por fazer negócios em nossa plataforma!');
        } catch (error) {
            Alert.alert('Erro ao aprovar projeto', 'Tente mais tarde');
        }
    }

    async function handleRefuse() {
        try {
            await api.delete(`project_approval_state/${project._id}`, {
                headers: {
                    authorization: `Bearer ${authorization}`
                }
            }).then(response => {
                setProject(response.data);
            });

            Alert.alert('Projeto recusado!', 'Aguardo até que o freelancer te entregue uma nova versão');
        } catch (error) {
            alert('Erro ao recusar projeto, tente mais tarde');
        }
    }

    return(  
        <View style={styles.container}>
            <View style={styles.options}>
                {!project.is_sent_for_approval && userSession.user_is_freelancer && <TouchableOpacity onPress={() => handleSendToApproval()} style={styles.optionsButton}><Text style={styles.optionsButtonText}>Marcar como entregue</Text></TouchableOpacity>}
                {project.is_sent_for_approval && !userSession.user_is_freelancer && 
                    <Fragment>
                        <TouchableOpacity onPress={() => handleRefuse()} style={styles.optionsButton}><Text style={styles.optionsButtonText}>Recusar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleApprove()} style={styles.optionsButton}><Text style={styles.optionsButtonText}>Aprovar</Text></TouchableOpacity>
                    </Fragment>
                }
            </View>
            <Text style={styles.h1}>{project.title}</Text>
            <View style={styles.chatContainer}>
                <FlatList style={styles.list} data={projectMessages} keyExtractor={projectMessage => projectMessage._id} renderItem={({ item }) => (
                    userSession.user_is_freelancer ? 
                        item.sender === userSession.user_team_id ?
                            <Fragment>
                                <View style={styles.sessionUserMessages}>
                                    <Text style={styles.itemStrongMyMessage}>{project.team.title}</Text>
                                    <Text style={styles.itemInfo}>{item.message}</Text>
                                </View>
                            </Fragment>
                        :
                            <Fragment>
                                <View style={styles.interlocutorMessages}>
                                    <Text style={styles.itemStrongTheirMessage}>{project.user.name}</Text>
                                    <Text style={styles.itemInfo}>{item.message}</Text>
                                </View>
                            </Fragment>
                    :
                        item.sender === userSession.user_id ?
                            <Fragment>
                                <View style={styles.sessionUserMessages}>
                                    <Text style={styles.itemStrongMyMessage}>{project.user.name}</Text>
                                    <Text style={styles.itemInfo}>{item.message}</Text>
                                </View>
                            </Fragment>
                        :
                            <Fragment>
                                <View style={styles.interlocutorMessages}>
                                    <Text style={styles.itemStrongTheirMessage}>{project.team.title}</Text>
                                    <Text style={styles.itemInfo}>{item.message}</Text>
                                </View>
                            </Fragment>
                )}/>
                <View style={styles.newMessageContainer}>
                    <TextInput value={newMessage} onChangeText={e => setNewMessage(e)} placeholderTextColor={'grey'} style={styles.newMessage} placeholder="Digite sua mensagem" />
                    <TouchableOpacity onPress={() => handleNewMessage()} style={styles.newMessageButton}><Text>Enviar</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}