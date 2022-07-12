import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import Buttons from '../../components/Buttons/ButtonComponent';
import Colors from '../../components/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';

const KnowledgeTestIntro = () => {
    const image = 'https://raw.githubusercontent.com/github/explore/f3e22f0dca2be955676bc70d6214b95b13354ee8/topics/c/c.png'

    return (
        <View>
            <Header backArrow={true} />
            <Text>Teste de Conhecimento</Text>
            <Image source={image} />
            <Text>C</Text>
            <Text>
                Este teste irá ser usado para verificar o seu nível
                de conhecimento na linguagem selecionada
            </Text>
            <Text>
                Caso esteja pronto, basta clicar em começar
            </Text>
            <Text>
                Boa sorte!
            </Text>
            <Buttons>
                <Text>Começar</Text>
            </Buttons>
        </View>
    )
}

export default KnowledgeTestIntro

const styles = StyleSheet.create({})