import { useContext, useEffect, useState } from "react"
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    ScrollView,
    StyleSheet, 
    Text,
    TouchableOpacity,
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
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs';
import CardChallengeFinishedComponent from "../../components/Card/CardChallengeFinishedComponent";
import CardTipComponent from "../../components/Card/CardTipComponent";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import { UnlockedAchievementsContext } from "../../utils/contexts/UnlockedAchievementsContext";
import ToastComponent from "../../components/Toast/ToastComponent";
import { GoalContext } from "../../utils/contexts/GoalContext";
import Messages from "../../utils/Messages";


const windowWidth = Dimensions.get('window').width;

export default function ClassroomExercise({ navigation, route }) {
    const { unlockedAchievements, setUnlockedAchievements } = useContext(UnlockedAchievementsContext);
    const { goal, setGoal } = useContext(GoalContext);

    const challengeID = route.params.challengeID;

    const [questionNumber, setQuestionNumber] = useState(0);
    const [user, setUser] = useState();
    const [code, setCode] = useState("");
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answered, setAnswered] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [result, setResult] = useState(null);
    const [numberOfExercises, setNumberOfExercises] = useState(0);
    const [codeQuestionAnswered, setCodeQuestionAnswered] = useState(false);
    const [currentTip, setCurrentTip] = useState(-1);
    const [showTipCard, setShowTipCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tips, setTips] = useState([]);
    const [hasCodeExercise, setHasCodeExercise] = useState(false);

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
      
                setIsLoading(false);
                setUser(JSON.parse(await AsyncStorage.getItem('@User')))
              }
            } catch(e) {
              setError(e.response.data.message);
            }
          }
          
          getData();
    }, []);

    useEffect(() => {
        let mounted = true;

        async function verifyData() {
            try {
                if(answered) {
                    let result = answers.filter((item) => item.isCorrect).length / challenge.exercises.length;
                    setResult(result);

                    await Axios.post(`/Counter/${user.userID}`, {
                        numberOfHits: answers.filter((item) => item.isCorrect).length,
                        numberOfMistakes: challenge.exercises.length - answers.filter((item) => item.isCorrect).length
                    });

                    if(result < 0.5) {
                        const response = await Axios.put(`DecreaseNumberOfLifes/${user.userID}`);
    
                        if(response.data.numberOfLifes && mounted) {
                            user.numberOfLifes = response.data.numberOfLifes;

                            await AsyncStorage.mergeItem("@User", JSON.stringify(user));
                            setUser(user);
                            setAnswered(false);
                        }
                        setIsLoading(false);
                    } else {
                        const result = await Axios.put(`FinishChallenge/${user.userID}/${challengeID}`);
    
                        if(result.data.userChallenge) {
                            const resultUserUpdated = await Axios.post(`/AddExperienceToUser/${user.userID}`, {
                                xpGain: challenge.difficulty.valueXP
                            });
                            
                            if(resultUserUpdated.data.user) {
                                if(mounted) {
                                    setUser(resultUserUpdated.data.user);
                                }

                                await AsyncStorage.mergeItem('@User', JSON.stringify(resultUserUpdated.data.user));
                            }

                            let resultCompletedGoal = await Axios.put(`/CompletedGoal/${user.userID}`);

                            if(resultCompletedGoal.data.response) {
                                if(resultCompletedGoal.data.response.isComplete && mounted) {
                                    setGoal(resultCompletedGoal.data.response);
                                }
                            }
                            
                            if(mounted) {
                                setIsLoading(false);
                            }
                            
                            try {
                                let response = await Axios.put(`/AssociateUserToAchievement/${user.userID}`, {
                                    technologyID: challenge.technology.technologyID
                                });

                                if(response.data.userAchievement) {
                                    setUnlockedAchievements(response.data.userAchievement.map((userAchievement) => userAchievement.achievement));
                                }
                            } catch(e) {
                                setError(e.response.data.message);
                            }
                            
                        }
                    }
                } 
            } catch(e) {
                setError(e.response.data.message);
            }
        }

        verifyData();

        return () => {
            mounted = false;
        }
    }, [answered]);

    useEffect(() => {
        if(!challenge || challenge.exercises.length <= 0) return;

        async function getTips() {
            try {
                const response = await Axios.get(`FindTipByExercise/${challenge.exercises[questionNumber].exerciseID}`);
    
                if(response.data.classrooms) {
                    setTips(response.data.classrooms);
                }
            } catch(e) {
                setError(e.response.data.message);
            }
        }

        getTips();
    }, [questionNumber, challenge]);

    async function goToNextQuestion() {
        if(!code && !codeQuestionAnswered && challenge.exercises[questionNumber].type === "code") {
            return ToastComponent(Messages.CODE_EMPTY);
        }

        if(result !== null && result < 0.5) {
            return returnToChallengeList();
        }

        setIsLoading(true);
        setShowTipCard(false);
        setCurrentTip(-1);
        checkIfIsComplete();

        if(answered) {
            setIsLoading(false);
            return setQuestionNumber(questionNumber + 1);
        }

        if(challenge.exercises[questionNumber].type === "code") {
            setHasCodeExercise(true);
            await nextCodeQuestion();
        } else if (challenge.exercises[questionNumber].type === "quiz") {
            await nextQuizQuestion();
        } 
    }

    async function nextCodeQuestion() {
        let answered = answers.findIndex((answer) => answer.exerciseID === challenge.exercises[questionNumber].exerciseID);

        if(questionNumber === answers.length - 1) {
            setCodeQuestionAnswered(false);
        }

        if(answered !== -1) {
            setCode("")
            setIsLoading(false);
            setQuestionNumber(questionNumber + 1);
        } else {
            await runCode();
        }
    }

    async function nextQuizQuestion() {
        try {
            if(!checked) {
                setIsLoading(false);
                return ToastComponent(Messages.CHOOSE_AN_OPTION)
            }

            let response = await Axios.get(`AlternativeIsCorrect/${checked}`);

            if(response.data) {
                saveQuizAnswers(response.data.alternativeIsCorrect);
        
                if(questionNumber < answers.length - 1) {
                    setChecked(answers[questionNumber + 1].alternativeID);
                }
        
                if(questionNumber < numberOfExercises) {
                    setQuestionNumber(questionNumber + 1);
                }

                setIsLoading(false);
                if(questionNumber === numberOfExercises && !answered) {
                    setIsLoading(true);
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
                    try {
                        let response = await Axios.put(`/AssociateUserToAchievement/${user.userID}`, {
                            technologyID: challenge.technology.technologyID
                        });

                        if(response.data.userAchievement) {
                            let achievements = await response.data.userAchievement.map((userAchievement) => userAchievement.achievement);

                            setUnlockedAchievements(achievements);
                        }
                    } catch(e) {
                        setError(e.response.data.message);
                    }

                    setAnswered(true);
                    setShowCard(true);
                    setIsLoading(true);
                } else {
                    setIsLoading(false);
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
            response: answer,
            answered: true,
            code
        });

        setAnswers(allAnswers);
    }

    function returnToPreviousQuestion() {
        setShowTipCard(false);
        setCurrentTip(-1);
        if (challenge.exercises[questionNumber].type === "quiz") {
            setChecked(answers[questionNumber - 1].alternativeID);
        }

        if (challenge.exercises[questionNumber].type === "code") {
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

    function getATip() {
        if(currentTip < 2) {
            setCurrentTip(currentTip + 1);
        } else {
            setCurrentTip(0);
        }

        setShowTipCard(true);
    }

    function closeCard() {
        setShowCard(false);
    }

    return (
        <View style={styles.screenContainer}>
            {
                isLoading && (
                    <LoadingComponent />
                )
            }
            {
                challenge && (
                    <>
                        <ScrollView>
                                <Header backArrow={true} navigation={navigation}>
                                    <TouchableOpacity style={styles.tipIcon} onPress={getATip}>
                                        <MaterialCommunityIcons name="lightbulb-on" size={32} color={Colors.GOLDEN_CROWN} />
                                    </TouchableOpacity>
                                </Header>
                                    <View style={styles.content}>
                                        <Text style={styles.title}>Questão {questionNumber + 1}</Text>
                                        
                                        {
                                            challenge.exercises.length > 0 && (
                                                <>
                                                    <RenderJsonContent content={challenge.exercises[questionNumber].description} />

                                                    <RenderAlternativesComponent 
                                                        alternatives={challenge.exercises[questionNumber].alternatives}
                                                        checked={checked}
                                                        setChecked={setChecked}
                                                        answered={answered && !isLoading}
                                                        show={challenge.exercises[questionNumber].type === "quiz"}
                                                    />

                                                    <CodeEditorComponent 
                                                        setCode={setCode} 
                                                        language={challenge.technology.name} 
                                                        theme="dracula" 
                                                        show={challenge.exercises[questionNumber].type === "code" && !codeQuestionAnswered} 
                                                    /> 

                                                    {
                                                        codeQuestionAnswered && (
                                                            <SyntaxHighlighter 
                                                                language={challenge.technology.name} 
                                                                style={atomOneDark}
                                                                highlighter={"hljs"}
                                                            >{answers[questionNumber].code}</SyntaxHighlighter>
                                                        )
                                                    }  

                                                    <OutputTerminal answers={codeQuestionAnswered ? answers[questionNumber].response : null} />        
                                                </>
                                            )
                                        }
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
                                challenge.exercises.length > 0 && (
                                    questionNumber <= numberOfExercises && (
                                        <ButtonComponent 
                                            newStyle={{...styles.newStyleButton, 
                                                backgroundColor: questionNumber === numberOfExercises ? Colors.LIGHT_GREEN : Colors.PRIMARY_COLOR
                                            }} 
                                            onPress={goToNextQuestion}>
                                            <Text style={styles.textButton}>
                                                <Feather 
                                                    name={questionNumber === numberOfExercises ? "check" : "chevron-right"} 
                                                    color={questionNumber === numberOfExercises ? Colors.GREEN_CHECK_ICON : Colors.WHITE_SAFE_COLOR} size={32} 
                                                />
                                            </Text>
                                        </ButtonComponent>
                                    )
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
                            message={result >= 0.5 ? Messages.MESSAGE_EXERCISE_SUCCESSFULLY : Messages.MESSAGE_EXERCISE_FAILED}
                            xp={result >= 0.5 ? challenge.difficulty.valueXP : 0}
                            showCard={showCard && !isLoading}
                            buttonText={result >= 0.5 || hasCodeExercise ? "Fechar" : "Voltar ao início"}
                            onPressButton={result >= 0.5 || hasCodeExercise ? closeCard : returnToChallengeList}
                            isPercentage={true}
                            setShowCard={setShowCard}
                        />

                        {
                            tips.length > 0 && (
                                <CardTipComponent 
                                    showCard={showTipCard}
                                    setShowCard={setShowTipCard}
                                    tip={tips[currentTip]}
                                    tipNumber={currentTip}
                                />
                            )
                        }
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

    tipIcon: {
        position: 'absolute',
        right: '10%'
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