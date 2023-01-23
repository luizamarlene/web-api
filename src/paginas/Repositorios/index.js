import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import RepositorioService from '../../services/RepositorioService';
import estilos from './estilos';

export default function Repositorios({ route, navigation }) {
    const [repos, setRepos] = useState([]);
    const [repo, setRepo] = useState('');
    const estaNaTela = useIsFocused();


    async function buscarRepositorio() {
        try {
            const response = await RepositorioService.show(route.params.id,repo)
            if (response) {
                setRepos(response)
                console.log(response)
            }
        } catch (error) {
            Alert.alert('','Repositório não encontrado!')
        }
        
    }

    useEffect(() => {
        async function buscarRepositorios() {
            const response = await RepositorioService.index(route.params.id)
            if (response) {
                setRepos(response)
                console.log(response)
            }
        }
        buscarRepositorios()

    }, [estaNaTela])


    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Busque por um repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                onChangeText={setRepo}
                value={repo}
            />

            <TouchableOpacity style={estilos.botao}
                onPress={()=> buscarRepositorio()}
            >
                <Text style={estilos.textoBotao}>
                    Buscar
                </Text>
            </TouchableOpacity>
            <Text style={estilos.repositoriosTexto}>{repos.length} repositórios criados</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', { id: route.params.id })}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>
            <FlatList data={repos}
                style={{ width: '100%' }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={estilos.repositorio}
                        onPress={() => navigation.navigate('InfoRepositorio', { item })}>
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                    </TouchableOpacity>
                )} />
        </View>
    );
}
