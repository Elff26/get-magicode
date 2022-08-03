import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    StyleSheet, 
    ScrollView,
    Text,
    View
} from "react-native";
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/styles/hljs';

import CodeEditor from '../../components/CodeEditor/CodeEditorComponent';
import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

export default function ChooseTechnologias({ navigation }) {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [code, setCode] = useState("//Seu código vai aqui :)");
    const [exampleCode, setExampleCode] = useState('public class T {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Teste");\n\t}\n}');
    const [language, setLanguage] = useState('java');
    const [theme, setTheme] = useState('dracula');


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
                            <SyntaxHighlighter 
                                language={language}
                                style={dracula}
                                highlighter={"hljs"}
                            >
                                {exampleCode}
                            </SyntaxHighlighter>
                        </View>

                        <CodeEditor
                            setCode={setCode}
                            language={language}
                            theme={theme}
                        />
                        
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

    codeEditor: {
        position: 'absolute',
        letterSpacing: -0.5,
        padding: 24,
        zIndex: 2,
        fontSize: 21,
        fontFamily: 'Roboto',
        width: '100%',
        color: 'rgba(0, 0, 0, 0)'
    }
})