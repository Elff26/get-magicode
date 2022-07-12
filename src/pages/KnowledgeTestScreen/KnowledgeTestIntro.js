import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from '../../components/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';

const KnowledgeTestIntro = ({navigation}) => {
    const image = 'https://raw.githubusercontent.com/github/explore/f3e22f0dca2be955676bc70d6214b95b13354ee8/topics/c/c.png'

    function goToKnowledgeTest () {
        navigation.navigate('KnowledgeTest');
    }

    return (
        <View style={styles.allPagesCode}>
            <Header backArrow={true} navigation={navigation}/>
            <Text style={styles.titleTest}>Teste de Conhecimento</Text>
            <Image source={image} style={styles.imageLanguage}/>
                <Text style={styles.textStyle}>C</Text>
                <Text style={styles.textStyle}>
                    Este teste irá ser usado para verificar o seu nível
                    de conhecimento na linguagem selecionada
                </Text>
                <Text style={styles.textStyle}>
                    Caso esteja pronto, basta clicar em começar
                </Text>
                <Text style={styles.textStyle}>
                    Boa sorte!
                </Text> 
            <ButtonComponent 
                newStyle={styles.buttonStyle}
                onPress={goToKnowledgeTest}>
                <Text style={styles.textButton}>Começar</Text>
            </ButtonComponent>
        </View>
    )
}

export default KnowledgeTestIntro

const styles = StyleSheet.create({
    allPagesCode: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    titleTest: {
        fontSize: 26,
        fontWeight: '400',
        color: Colors.PRIMARY_COLOR
    },
    imageLanguage: {
        width: 120,
        height: 120,
        marginTop: 20
    },
    textStyle: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        color: Colors.TEXT_COLOR,
    },
    buttonStyle: {
        width: 190,
        height: 35,
        marginTop: 20,
        borderRadius: 15
    },
    textButton: {
        color: '#FFF',
        fontSize: 15,
        padding: 10
    }
})