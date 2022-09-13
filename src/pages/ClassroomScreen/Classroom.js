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
                  Object.entries(JSON.parse(classroomContent.description)).map((item, index) => (
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
