import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    StyleSheet, 
    ScrollView,
    Text,
    View
} from "react-native";

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import { RadioButton } from 'react-native-paper';
import { Dimensions } from 'react-native';

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

export default function KnowledgeTest({ navigation }) {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [code, setCode] = useState("//Seu código vai aqui :)");
    const [language, setLanguage] = useState('java');
    const [checked, setChecked] = useState("first");

    function goToNextQuestion() {
        console.log(JSON.stringify(code));
    }

    function quitTest() {
        navigation.goBack();
    }

    return (
        <View style={styles.screenContainer}>
            <ScrollView>
                    <Header backArrow={true} navigation={navigation} />

                    <View style={styles.content}>
                        <Text style={styles.title}>Questão { questionNumber }</Text>

                        <View style={styles.questionText}>
                            <Text style={styles.contentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec magna a ex dictum venenatis. Etiam elit velit, pharetra in tempus sit amet, elementum ultrices ante. Nullam tempor nisi risus, ac sollicitudin neque scelerisque molestie. Curabitur interdum dapibus quam, imperdiet consectetur magna sodales et. Nullam dapibus mauris eget ante cursus rutrum. Ut lobortis quam non risus rhoncus semper. Proin consectetur odio vel tellus lobortis, in rhoncus tellus mollis.</Text>
                            <Text style={styles.contentText}>In at libero sapien. Integer nec ullamcorper velit, quis maximus erat. Integer dignissim feugiat iaculis. Cras porta volutpat nisl quis pellentesque. Morbi pulvinar placerat quam, sed semper elit placerat vehicula. Nullam rutrum eget nunc at luctus. Suspendisse potenti. Vivamus mattis nec dolor eu finibus.</Text>

                        </View>

                        <View style={styles.goalItem}>
                            <View style={styles.goalRadio}>
                                <RadioButton
                                    value="first"
                                    label="radio01"
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked("first")}
                                />
                                <Text style={styles.goalText}>HJADFGASHJFVBAHSFVASDJDFGSFSDFSDFSDFSDF</Text>
                            </View>

                            <View style={styles.goalRadio}>
                                <RadioButton
                                    value="second"
                                    label="radio02"
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked("second")}
                                />
                                <Text style={styles.goalText}>Teste 02</Text>
                            </View>

                            <View style={styles.goalRadio}>
                                <RadioButton
                                    value="third"
                                    label="radio03"
                                    status={checked === 'third' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked("third")}
                                />
                                <Text style={styles.goalText}>HJADFGASHJFVBAHSFVASDJDFGSFSDFSDFSDFSDF</Text>
                            </View>

                            <View style={styles.goalRadio}> 
                                <RadioButton
                                    value="fourth"
                                    label="radio04"
                                    status={checked === 'fourth' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked("fourth")}
                                />
                                <Text style={styles.goalText}>Teste 04</Text>
                            </View>
                        </View>
                    </View>

            </ScrollView>

            <View style={styles.buttonGroup}>
                <ButtonComponent newStyle={styles.newStyleButton}>
                    <Text style={styles.textButton}>
                        <Feather name="chevron-left" color="#FFF" size={32} />
                    </Text>
                </ButtonComponent>
                <ButtonComponent newStyle={styles.newStyleButtonCancel} onPress={quitTest}>
                    <Text style={styles.textButton}>
                        <Feather name="x" color={Colors.ERROR_COLOR} size={32} />
                    </Text>
                </ButtonComponent>
                <ButtonComponent newStyle={styles.newStyleButton} onPress={goToNextQuestion}>
                    <Text style={styles.textButton}>
                        <Feather name="chevron-right" color="#FFF" size={32} />
                    </Text>
                </ButtonComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },

    content: {
        paddingHorizontal: 10,
        flex: 1
    },

    title: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    contentText: {
        color: Colors.TEXT_COLOR,
        fontSize: 18,
        textAlign: 'center'
    },

    questionText: {
        marginBottom: 25
    },

    editorStyle: {
        marginBottom: 20,
    },  

    buttonGroup: {
        width: '100%',
        backgroundColor: "#2323",
        padding: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.FOOTER_BACKGROUND_COLOR,
        alignItems: 'flex-end'
    },

    textButton: {
        color: '#fff'
    },

    newStyleButton: {
        borderRadius: 50,
        width: 50,
        height: 50
    },
    
    newStyleButtonCancel: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: 'rgba(212, 51, 63, .5)'
    },

    goalItem: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
   },

   goalText: {
        fontSize: 18,
        color:Colors.TEXT_COLOR,
        textAlign: 'auto',
        marginVertical: 5
   },

    goalRadio: {
        flexDirection: 'row',
        witdh: windowWidth-50,
        
    }   
})