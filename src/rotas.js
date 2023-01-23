import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

import Principal from './paginas/Principal';
import Repositorios from './paginas/Repositorios';
import CriarRepositorio from './paginas/CriarRepositorio';
import InfoRepositorio from './paginas/InfoRepositorio';

export default function Rotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Principal" options={{ title: "Alura Hub" }} component={Principal} />
                <Tab.Screen name="Repositorios" options={{ title: "Repositórios" }} component={Repositorios} />
                <Tab.Screen name="CriarRepositorio" options={{ title: "Criar Repositório" }} component={CriarRepositorio} />
                <Tab.Screen name="InfoRepositorio" options={{ title: "Informações do Repositório" }} component={InfoRepositorio} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}