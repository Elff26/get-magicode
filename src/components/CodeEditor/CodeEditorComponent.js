import { WebView } from 'react-native-webview';
import codeEditorHTML from '../../utils/CodeEditor/CodeEditorHtml';
import CodeEditorLanguageDictionary from '../../utils/CodeEditor/CodeEditorLanguageDictionary';


export default function CodeEditorComponent({ setCode, theme, language, show }) {
    return (
        <>
            {
                (show && language && theme) && (
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: codeEditorHTML(theme, CodeEditorLanguageDictionary[`${language}`]) }}
                        style={{ flex: 1, width: '95%', height: 450, marginBottom: 25, alignSelf: 'center' }}
                        scalesPageToFit={false}
                        onMessage={(event) => setCode(event.nativeEvent.data)}
                    />
                )
            }
        </>
    )
}