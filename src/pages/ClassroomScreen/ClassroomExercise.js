import { useEffect, useState } from "react"
import { Feather } from '@expo/vector-icons';
import { 
    ScrollView,
    StyleSheet, 
    Text,
    View
} from "react-native";

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import { Dimensions } from 'react-native';
import RenderJsonContent from "../../components/RenderJsonContent/RenderJsonContent";
import Axios from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CodeEditorComponent from "../../components/CodeEditor/CodeEditorComponent";
import RenderAlternativesComponent from "../../components/QuizExercise/RenderAlternativesComponent";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import OutputTerminal from "../../components/OutputTerminal/OutputTerminal";
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/styles/hljs';
import CardChallengeFinishedComponent from "../../components/Card/CardChallengeFinishedComponent";

const windowWidth = Dimensions.get('window').width;

export default function ClassroomExercise({ navigation, route }) {
    const challengeID = route.params.challengeID;

    const [questionNumber, setQuestionNumber] = useState(0);
    const [user, setUser] = useState();
    const [code, setCode] = useState("//Seu código vai aqui! :)");
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answered, setAnswered] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [result, setResult] = useState(0);
    const [numberOfExercises, setNumberOfExercises] = useState(0);
    const [codeQuestionAnswered, setCodeQuestionAnswered] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
              if(challengeID) {
                const response = await Axios.get(`FindChallengeById/${challengeID}`);
                
                if(response.data.challenge) {
                  let challenge = response.data.challenge;
                  
                  setChallenge(challenge);
                  setNumberOfExercises(challenge.exercises.length - 1);
                }
      
                setUser(JSON.parse(await AsyncStorage.getItem('@User')))
              }
            } catch(e) {
              setError(e.response.data.message);
            }
          }
          
          getData();
    }, []);

    useEffect(() => {
        async function verifyData() {
            try {
                if(answered) {
                    let result = answers.filter((item) => item.isCorrect).length / challenge.exercises.length;
                    setResult(result);
        
                    if(result < 0.5) {
                        const response = await Axios.put(`DecreaseNumberOfLifes/${user.userID}`);
    
                        if(response.data.numberOfLifes) {
                            user.numberOfLifes = response.data.numberOfLifes;
    
                            await AsyncStorage.mergeItem("@User", JSON.stringify(user));
                            setUser(user);
                            setAnswered(false);
                        }
                    } else {
                      const result = await Axios.put(`FinishChallenge/${user.userID}/${challengeID}`);
    
                      if(result.data.userChallenge) {
                          const resultUserUpdated = await Axios.post(`/AddExperienceToUser/${user.userID}`, {
                            xpGain: challenge.difficulty.valueXP
                          });

                          setUser(resultUserUpdated.data.user);
                          await AsyncStorage.mergeItem('@User', JSON.stringify(resultUserUpdated.data.user));
                      }
                    }
                } 
            } catch(e) {
                setError(e.response.data.message);
            }
        }

        verifyData()
    }, [answered]);

    async function goToNextQuestion() {
        checkIfIsComplete();

        if(challenge.typeChallenge === "code") {
            return nextCodeQuestion();
        } else if (challenge.typeChallenge === "quiz") {
            return nextQuizQuestion();
        }
    }

    async function nextCodeQuestion() {
        let answered = answers.findIndex((answer) => answer.exerciseID === challenge.exercises[questionNumber].exerciseID);

        if(questionNumber === answers.length - 1) {
            setCodeQuestionAnswered(false);
        }

        if(answered !== -1) {
            setQuestionNumber(questionNumber + 1);
        } else {
            await runCode();
        }
    }

    async function nextQuizQuestion() {
        try {
            let response = await Axios.get(`AlternativeIsCorrect/${checked}`);

            if(response.data) {
                saveQuizAnswers(response.data.alternativeIsCorrect);
        
                if(questionNumber < answers.length - 1) {
                    setChecked(answers[questionNumber + 1].alternativeID);
                }
        
                if(questionNumber < numberOfExercises) {
                    setQuestionNumber(questionNumber + 1);
                }

                if(questionNumber === numberOfExercises && !answered) {
                    setAnswered(true);
                    setShowCard(true);
                }
            }
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    function saveQuizAnswers(isCorrect) {
        let allAnswers = answers;

        let alreadyAnswered = allAnswers.findIndex(answer => answer.exerciseID === challenge.exercises[questionNumber].exerciseID);
    
        if(alreadyAnswered !== -1) {
            allAnswers[alreadyAnswered].alternativeID = checked;
            allAnswers[alreadyAnswered].isCorrect = isCorrect;
        } else {
            allAnswers.push({
                alternativeID: checked,
                exerciseID: challenge.exercises[questionNumber].exerciseID,
                isCorrect: isCorrect,
                answered: true 
            });
        }

        setAnswers(allAnswers);
    }

    async function runCode() {
        try {
            let response = await Axios.post(`SendExerciseCode/${user.userID}/${challenge.exercises[questionNumber].exerciseID}`, {
                userCode: code,
                language: challenge.technology.name
            });

            if(response.data) {
                let result = response.data.result;

                if(result.isCorrect) {
                    await Axios.post(`/AddExperienceToUser/${user.userID}`, {
                        xpGain: challenge.difficulty.valueXP
                    });
                }

                saveCodeAnswers(result);

                if(questionNumber === numberOfExercises && !answered) {
                    setAnswered(true);
                    setShowCard(true);
                }

                setCodeQuestionAnswered(true);
            }
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    function saveCodeAnswers(answer) {
        let allAnswers = answers;
    
        allAnswers.push({
            exerciseID: challenge.exercises[questionNumber].exerciseID,
            isCorrect: answer.isCorrect,
            answer,
            answered: true,
            code
        });

        setAnswers(allAnswers);
    }

    function returnToPreviousQuestion() {
        if (challenge.typeChallenge === "quiz") {
            setChecked(answers[questionNumber - 1].alternativeID);
        }

        if (challenge.typeChallenge === "code") {
            setCodeQuestionAnswered(true);
        }
        
        setQuestionNumber(questionNumber - 1);
    }

    function checkIfIsComplete() {
        if(answered && questionNumber === numberOfExercises) {
            return returnToChallengeList();
        }
    }

    function returnToChallengeList() {
        navigation.navigate('ListChallenges', {
            user
        });
    }

    function quitTest() {
        navigation.goBack();
    }

    function closeCard() {
        setShowCard(false);
    }

    return (
        <View style={styles.screenContainer}>
            {
                challenge && (
                    <>
                        <ScrollView>
                                <Header backArrow={true} navigation={navigation} />
                                    <View style={styles.content}>
                                        <Text style={styles.title}>Questão {questionNumber + 1}</Text>

                                        <RenderJsonContent content={challenge.exercises[questionNumber].description} />

                                        <RenderAlternativesComponent 
                                            alternatives={challenge.exercises[questionNumber].alternatives}
                                            checked={checked}
                                            setChecked={setChecked}
                                            answered={answered}
                                            show={challenge.typeChallenge === "quiz"}
                                        />

                                        <CodeEditorComponent 
                                            setCode={setCode} 
                                            language={challenge.technology.name} 
                                            theme="dracula" 
                                            show={challenge.typeChallenge === "code" && !codeQuestionAnswered} 
                                        />  
                                        
                                        {
                                            codeQuestionAnswered && (
                                                <SyntaxHighlighter 
                                                    language={challenge.technology.name} 
                                                    style={dracula}
                                                    highlighter={"hljs"}
                                                >{answers[questionNumber].code}</SyntaxHighlighter>
                                            )
                                        }  

                                        <OutputTerminal answer={codeQuestionAnswered ? answers[questionNumber].answer : null} />        
                                    </View>
                        </ScrollView>

                        <View style={styles.buttonGroup}>
                            <ButtonComponent newStyle={questionNumber === 0 ? styles.newStyleButtonDisabled : styles.newStyleButton} disabled={questionNumber === 0} onPress={returnToPreviousQuestion}>
                                <Text style={styles.textButton}>
                                    <Feather name="chevron-left" color={Colors.WHITE_SAFE_COLOR} size={32} />
                                </Text>
                            </ButtonComponent>

                            <ButtonComponent newStyle={styles.newStyleButtonCancel} onPress={quitTest}>
                                <Text style={styles.textButton}>
                                    <Feather name="x" color={Colors.ERROR_COLOR} size={32} />
                                </Text>
                            </ButtonComponent>

                            {
                                questionNumber <= numberOfExercises && (
                                    <ButtonComponent newStyle={{...styles.newStyleButton, backgroundColor: questionNumber === numberOfExercises ? Colors.LIGHT_GREEN : Colors.PRIMARY_COLOR}} onPress={goToNextQuestion}>
                                        <Text style={styles.textButton}>
                                            <Feather 
                                                name={questionNumber === numberOfExercises ? "check" : "chevron-right"} 
                                                color={questionNumber === numberOfExercises ? Colors.GREEN_CHECK_ICON : Colors.WHITE_SAFE_COLOR} size={32} 
                                            />
                                        </Text>
                                    </ButtonComponent>
                                )
                            }

                            {
                                answered && (
                                    <ButtonComponent newStyle={styles.newStyleReturnToHome} onPress={returnToChallengeList}>
                                        <Text style={styles.textButton}>
                                            <Feather name="home" color={Colors.WHITE_SAFE_COLOR} size={32} />
                                        </Text>
                                    </ButtonComponent>
                                )
                            }
                            
                        </View>

                        <CardChallengeFinishedComponent
                            title="Resultado"
                            subtitle={`${(result * 100).toFixed(2)}%`}
                            message={result >= 0.5 ? "Parabéns, você foi aprovado!" : "Você foi reprovado, mas não desista! Estude e gabarite esse exercício!"}
                            xp={result >= 0.5 ? challenge.difficulty.valueXP : 0}
                            showCard={showCard}
                            buttonText={result >= 0.5 ? "Fechar" : "Voltar ao início"}
                            onPressButton={result >= 0.5 ? closeCard : returnToChallengeList}
                            isPercentage={true}
                            setShowCard={setShowCard}
                        />
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR
    },

    content: {
        flex: 1,
        maxWidth: windowWidth,
        padding: 10
    },

    title: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15
    },

    subtitle: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 22,
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
        padding: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.FOOTER_BACKGROUND_COLOR,
        alignItems: 'flex-end'
    },

    textButton: {
        color: Colors.WHITE_SAFE_COLOR
    },

    newStyleButton: {
        borderRadius: 50,
        width: 50,
        height: 50
    },

    newStyleButtonDisabled: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: Colors.PRIMARY_COLOR_DISABLED
    },

    newStyleButtonCancel: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: Colors.CANCEL_BUTTON
    },

    newStyleButtonCompile: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: Colors.GREEN_BUTTON_CONFIRM
    },

    newStyleReturnToHome: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: Colors.PRIMARY_COLOR_DISABLED
    }
})