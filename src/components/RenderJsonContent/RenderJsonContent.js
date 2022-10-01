import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

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
                                    <Text>{item[1]}</Text>
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
})
