import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import Colors from '../../utils/ColorPallete/Colors';

export default function RenderJsonContent({ content }) {
    return (
        <View>
            {
                content && (
                    Object.entries(JSON.parse(content)).map((item, index) => (
                        <View key={index}>
                            {
                                item[0].includes("image")  && (
                                    <Image source={{ uri: item[1] }} resizeMode="contain" style={styles.imageStyle} />
                                )
                            }
                            {
                                item[0].includes("code")  && (
                                    <SyntaxHighlighter 
                                    language='javascript' 
                                    style={docco}
                                    highlighter={"hljs"}
                                    >{item[1]}</SyntaxHighlighter>
                                )
                            }
                            {                
                                item[0].includes("paragraph")  && (
                                    <Text style={styles.textStyle}>{item[1]}</Text>
                                )
                            }
                            {
                                item[0].includes("input")  && (
                                    <View style={styles.testCase} key={index}>
                                    {
                                        item[1].map((input, index) => (
                                            <View style={styles.testCaseInput} key={index}>
                                                <Text style={styles.testTitleStyle}>Entradas {index + 1}: </Text>
                                                <Text style={styles.testTextStyle}>{input}</Text>
                                            </View>
                                        ))
                                    }
                                    </View>
                                )
                            }
                        </View>
                    ))
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 350, 
        height: 200,
        alignSelf: 'center'
    },

    textStyle: {
        color: Colors.TEXT_COLOR,
        fontSize: 20,
        textAlign: 'justify',
        paddingHorizontal: 10
    },

    testTitleStyle: {
        color: Colors.TEXT_COLOR,
        fontSize: 18
    },

    testTextStyle: {
        color: Colors.TEXT_COLOR,
        fontSize: 16
    },

    testCase: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },

    testCaseInput: {
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
        flexDirection: 'column',
        padding: 10,
        borderRadius: 5
    }
})
