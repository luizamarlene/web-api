import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import UsuarioService from '../../services/UsuarioService';
import estilos from './estilos';

export default function Principal({ navigation }) {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [usuario, setUsuario] = useState({});

    const buscaUsuario = async () => {
        try {
            if (nomeUsuario.length === 0) {
                Alert.alert('Preenchimento Obrigatório', 'Digite o nome do usuário')
                setUsuario({})
                return
            }
            const usuarioResponse = await UsuarioService(nomeUsuario)
            if (usuarioResponse) {
                setUsuario(usuarioResponse)
                setNomeUsuario('')
            } else {
                Alert.alert('Usuário não encontrado', 'Não foi encontrado nenhum usuário com esse nome')
                setUsuario({})
            }
            
            
        } catch {
            Alert.alert('Oops', 'Não foi possível buscar o usuário, aguade um momento e tente novamente')
            nomeUsuario('')
        }
    }

    return (
        <ScrollView>
            <View style={estilos.container}>
                {usuario?.login &&
                    <>
                        <View style={estilos.fundo} />
                        <View style={estilos.imagemArea}>
                        <Image source={{ uri: usuario.avatar_url }} style={estilos.imagem} />
                        </View>
                        <Text style={estilos.textoNome}>{usuario.login}</Text>
                    <Text style={estilos.textoEmail}>{usuario.email}</Text>
                        <View style={estilos.seguidoresArea}>
                            <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.followers}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguidores</Text>
                            </View>
                            <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.following}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguindo</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Repositorios', {id: usuario.id})}>
                            <Text style={estilos.repositorios}>
                                Ver os repositórios
                            </Text>
                        </TouchableOpacity>
                    </>
                }
                <TextInput
                    placeholder="Busque por um usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    onChangeText={setNomeUsuario}
                    value={nomeUsuario}
                />

                <TouchableOpacity style={estilos.botao}
                    onPress={buscaUsuario}
                >
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
