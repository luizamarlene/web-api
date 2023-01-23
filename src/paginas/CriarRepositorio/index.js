import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import RepositorioService from '../../services/RepositorioService';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');

    const criar = async () => {
        const reponse = await RepositorioService.create(
            route.params.id,
            nome,
            data)

        if (reponse === 'sucesso') {
            navigation.goBack()
            Alert.alert('', 'Salvo com sucesso!')
        } else {
            Alert.alert('', 'Erro ao criar repositório!')
        }

    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity
                onPress={() => criar()}
                style={estilos.botao}>
                <Text style={estilos.textoBotao}>
                    Criar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
