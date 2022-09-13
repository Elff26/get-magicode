import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import Axios from '../../api/api';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Colors from '../../utils/ColorPallete/Colors';

export default function Classroom({ navigation, route }) {
  const classroomID = route.params.classroomID;
  const [error, setError] = useState('');
  const [classroomContent, setClassroomContent] = useState();
  const [json, setJson] = useState({
    'paragraph_1': 'Nessa aula veremos o uso de condicionais. Um exemplo de bloco de código que utiliza condicionais é esse:',
    'code_1': `
    let idade = 18;

    if(idade < 18) {
        console.log('Você não é maior de idade!');
    } else {
        console.log('Você é maior de idade!');
    }
    `,
    'paragraph_2': 'Esse é um exemplo bem simples de uso de condicionais. Sua utilizadade é verificar se uma proposição é veradeira, caso seja, entra no IF, se não ela passa para o ELSE.',
    'paragraph_3': 'Temos ainda como concatenar IFs:',
    'image_1': 'https://wiki.ifsc.edu.br/mediawiki/images/5/56/TabOpsmatem.png',
    'code_2': `
    let idade = 18;

    if(idade < 18) {
        console.log('Você tem menos de 18 anos!!');
    } else {
        if(idade === 18) {
          console.log('Você tem 18 anos!')
        } else {
          console.log('Você tem mais de 18 anos!!');
        }
    }
    `
  });

  useEffect(() => {
    async function getData() {
      try {
        if(classroomID) {
          const response = await Axios.get(`FindClassroomById/${classroomID}`);

          if(response.data.classroom) {
            setClassroomContent(response.data.classroom);
          }
        }
      } catch(e) {
        setError(e.response.data.message);
      }
    }
    
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header backArrow={true} navigation={navigation} />

      {
        classroomContent && (
          <>
            <ScrollView style={styles.classroomContentStyle}>
              <Text style={styles.title}>{classroomContent.name}</Text>

              <View>
                {
                  Object.keys(JSON.parse(classroomContent.description)).map((key, index) => (
                    <View key={index}>
                        {
                          key.includes("image")  && (
                            <Image source={{ uri: json[key] }} resizeMode="contain" style={styles.imageStyle} />
                          )
                        }
                        {
                          key.includes("code")  && (
                            <SyntaxHighlighter 
                              language='javascript' 
                              style={docco}
                              highlighter={"hljs"}
                            >{json[key]}</SyntaxHighlighter>
                          )
                        }
                        {                
                          key.includes("paragraph")  && (
                            <Text>{json[key]}</Text>
                          )
                        }
                    </View>
                  ))
                }
              </View>
            </ScrollView>

            <View style={styles.buttonGroup}>
                <ButtonComponent newStyle={styles.newStyleButton} 
                    onPress={() => {}}>
                    <Text style={styles.textButton}>Ir para aula prática</Text>
                </ButtonComponent>
            </View>
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_SAFE_COLOR
  },
  
  title: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 28,
    textAlign: 'center'
  },

  classroomContentStyle: {
    paddingHorizontal: 15,
    paddingBottom: 5
  },

  imageStyle: {
    width: 350, 
    height: 200,
    alignSelf: 'center'
  },

  buttonGroup: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.FOOTER_BACKGROUND_COLOR
  },

  textButton: {
    color: Colors.WHITE_SAFE_COLOR
  },

  newStyleButton: {
      width: '70%',
      marginHorizontal: 10
  }
});
