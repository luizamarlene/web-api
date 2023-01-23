import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import RepositorioService from '../../services/RepositorioService';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);


    const deletar = async () => { 
        const reponse = await RepositorioService.delete(route.params.item.id)

        if (reponse === 'sucesso') {
            navigation.goBack()
            Alert.alert('', 'Apagado com sucesso!')
        } else {
            Alert.alert('', 'Erro ao apagar o repositório!')
         }
    }

    const salvar = async () => { 
        const reponse = await RepositorioService.update(
            route.params.item.postId,
            nome,
            data,
            route.params.item.id)

        if (reponse === 'sucesso') {
            navigation.goBack()
            Alert.alert('','Salvo com sucesso!')
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
                ONChangeText={setData}
            />
            <TouchableOpacity
                onPress={()=> salvar()}
                style={estilos.botao}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> deletar()}
                style={[estilos.botao, { backgroundColor: '#DD2B2B', marginTop: 10 }]}
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
