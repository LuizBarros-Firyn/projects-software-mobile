import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Client from '../../assets/Client.svg';
import Freelancer from '../../assets/Freelancer.svg';

import styles from './styles';

export default function RegisterOptions() {
    const navigation = useNavigation();

    function handleLogin() {
        console.log(email, password)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.clientText}>Cliente</Text>

            <Client style={styles.portraits} width={100} height={100}/>

            <View style={styles.clientInfo}>
                <Icon name="check" size={20} color={"#e02041"} />
                <Text style={styles.clientInfoText}>Tenha acesso aos melhores profissionais</Text>
            </View>

            <View style={styles.clientInfo}>
                <Icon name="check" size={20} color={"#e02041"} />
                <Text style={styles.clientInfoText}>Receba seu software no menor tempo possível</Text>
            </View>

            <View style={styles.clientInfo}>
                <Icon name="check" size={20} color={"#e02041"} />
                <Text style={styles.clientInfoText}>Contrate equipes profissionalizadas</Text>
            </View>

            <TouchableOpacity style={styles.clientButton} onPress={() => navigation.navigate('ClientRegister')}>
                <Text style={{color: '#FFF', fontSize: 18}}>Cadastrar-se como cliente</Text>
            </TouchableOpacity>

            <Text style={styles.freelancerText}>Freelancer</Text>

            <Freelancer style={styles.portraits} width={100} height={100}/>

            <View style={styles.clientInfo}>
                <Icon name="check" size={20} color={"#e02041"} />
                <Text style={styles.clientInfoText}>Trabalhe nos melhores projetos e se destaque</Text>
            </View>

            <View style={styles.clientInfo}>
                <Icon name="check" size={20} color={"#e02041"} />
                <Text style={styles.clientInfoText}>Seja parte das melhores equipes</Text>
            </View>

            <View style={styles.clientInfo}>
                <Icon name="check" size={20} color={"#e02041"} />
                <Text style={styles.clientInfoText}>Seja recompensado com bonificações</Text>
            </View>

            <TouchableOpacity style={styles.clientButton} onPress={() => navigation.navigate('FreelancerRegister')}>
                <Text style={{color: '#FFF', fontSize: 18}}>Cadastrar-se como Freelancer</Text>
            </TouchableOpacity>
        </View>
    );
}