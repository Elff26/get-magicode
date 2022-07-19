import { WebView } from 'react-native-webview';

export default function CodeEditor({ setCode, language, theme }) {
    return (
        <WebView
            originWhitelist={['*']}
            source={{ html: `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>ACE in Action</title>
                    <style type="text/css" media="screen">
                        #editor { 
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                        }
                    </style>
                </head>
                <body>
                    <div id="editor" onChange="update()">// Aqui vai seu código :)</div>
                        
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.7.1/ace.js" integrity="sha512-FKkEO4RZEQjFmU1hoUYdx6HJLdpHpNzgWspgnQCxx7OOkDVz4kiGJxR97yWc5bzjwcCpJC/CRCiQzuoGYAChhQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                    <script>
                        var editor = ace.edit("editor");
                        editor.setTheme("ace/theme/${theme}");
                        editor.session.setMode("ace/mode/${language}");
                        editor.getSession().on('change', function() {
                            update();
                        });
                    </script>

                    <script>
                        function update() {
                            window.ReactNativeWebView.postMessage(editor.getSession().getValue());
                        }
                    </script>
                </body>
            </html>` }}
            style={{ flex: 1, width: '100%', height: 450, marginBottom: 25 }}
            scalesPageToFit={false}
            onMessage={(event) => setCode(event.nativeEvent.data)}
        />
    )
}