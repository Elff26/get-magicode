import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Axios from '../../api/api';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import RenderJsonContent from '../../components/RenderJsonContent/RenderJsonContent';
import Colors from '../../utils/ColorPallete/Colors';

export default function Classroom({ navigation, route }) {
  const challengeID = route.params.challengeID;
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const [challenge, setChallenge] = useState([]);
  const [currentClassIndex, setCurrentClassIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        if(challengeID) {
          const response = await Axios.get(`FindChallengeById/${challengeID}`);
          
          if(response.data.challenge) {
            setChallenge(response.data.challenge);
          }

          setUser(JSON.parse(await AsyncStorage.getItem('@User')))
        }
      } catch(e) {
        setError(e.response.data.message);
      }
    }
    
    getData();
  }, []);

  function nextClass() {
    setCurrentClassIndex(currentClassIndex + 1);
  }

  function returnClass() {
    setCurrentClassIndex(currentClassIndex - 1);
  }

  function startExercise() {
    navigation.navigate('ClassroomExercise', {
      challengeID
    })
  }

  async function finishChallenge() {
    try {
      const result = await Axios.put(`FinishChallenge/${user.userID}/${challengeID}`);

      if(result.data.userChallenge) {
        let userChallenge = result.data.userChallenge;
        let newUser = user;

        newUser.challenges = user.challenges.map(item => {
          if(item.userChallengeID === userChallenge.userChallengeID) {
            item.completed = true;
          }

          return item;
        })

        await AsyncStorage.mergeItem('@User', JSON.stringify(newUser));

        navigation.navigate('ListChallenges', {
          params: {
            user: newUser
          }
        });
      }
    } catch(e) {
      setError(e.response.data.message);
    } 
  } 

  return (
    <View style={styles.container}>
      <Header backArrow={true} navigation={navigation} />

      {
        (challenge.classes && challenge.classes.length > 0) && (
          <>
            <ScrollView style={styles.classroomContentStyle}>
              <Text style={styles.title}>{challenge.classes[currentClassIndex].name}</Text>

              <View>
                  <RenderJsonContent content={challenge.classes[currentClassIndex].description} />
              </View>
            </ScrollView>

            <View style={styles.buttonGroup}>
              {
                currentClassIndex > 0 && (
                  <ButtonComponent newStyle={styles.newStyleButton} onPress={returnClass}>
                    <Text style={styles.textButton}>Voltar</Text>
                  </ButtonComponent>
                )
              }
              {
                (currentClassIndex === challenge.classes.length - 1 && challenge.exercises.length > 0) && (
                  <ButtonComponent newStyle={styles.newStyleButton} onPress={startExercise}>
                    <Text style={styles.textButton}>Ir para exercício</Text>
                  </ButtonComponent>
                )
              }
              {
                currentClassIndex < challenge.classes.length - 1 && (
                  <ButtonComponent newStyle={styles.newStyleButton} onPress={nextClass}>
                    <Text style={styles.textButton}>Avançar</Text>
                  </ButtonComponent>
                )
              }
              {
                (currentClassIndex === challenge.classes.length - 1 && challenge.exercises.length === 0) && (
                  <ButtonComponent newStyle={styles.newStyleButton} onPress={finishChallenge}>
                    <Text style={styles.textButton}>Finalizar aula</Text>
                  </ButtonComponent>
                )
              }
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

  buttonGroup: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.FOOTER_BACKGROUND_COLOR
  },

  buttonSubgroup: {
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
      width: '49%',
      marginHorizontal: 10
  }
});
