import { useContext, useEffect, useRef, useState } from "react"
import { Feather } from '@expo/vector-icons';
import { 
    Image,
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
import { SocketContext } from '../../utils/Socket/socket';
import UserScoreComponent from "../../components/PlayerVSPlayer/UserScoreComponent";
import PvPResult from "../../components/PlayerVSPlayer/PvPResult";
import LoadingComponent from "../../components/Loading/LoadingComponent";

const windowWidth = Dimensions.get('window').width;

export default function PvPExercise({ navigation, route }) {exercises
    const socket = useContext(SocketContext);
    const roomNumber = route.params.roomNumber;
    
    const [user, setUser] = useState();
    const [questionNumber, setQuestionNumber] = useState(0);
    const [code, setCode] = useState("//Seu código vai aqui! :)");
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [numberOfExercises, setNumberOfExercises] = useState(0);
    const [currentTechnology, setCurrentTechnology] = useState({});
    const [userAnswers, setUserAnswers] = useState([]);
    const [opponent, setOpponent] = useState({});
    const [opponentAnswers, setOpponentAnswers] = useState([]);
    const [waitingOpponent, setWaitingOpponent] = useState(false);
    const [finished, setFinished] = useState(false);
    const [userXp, setUserXp] = useState(0);
    const [opponentXp, setOpponentXp] = useState(0);
    const [winner, setWinner] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            let user = JSON.parse(await AsyncStorage.getItem('@User'))
            socket.emit('randomizeExercises', roomNumber);
            
            let currentTech = user.technologies.filter(tech => tech.learning);

            if(currentTech.length === 0) {
                currentTech = user.technologies[0];
            } else {
                currentTech = currentTech[0];
            }

            setUser(user);
        }
          
        getData();
    }, []);

    useEffect(() => {
        socket.on('randomizedExercises', async (challenges, usersID, technologyName) => {
            let allExercises = challenges.map((challenge) => {
                let exercises = challenge.exercises.map((exercise) => {
                    return {
                        ...exercise, 
                        xp: challenge.difficulty.valueXP
                    }
                });

                return exercises;
            });

            setCurrentTechnology(technologyName);
            setExercises(allExercises.flat());
            setNumberOfExercises(allExercises.flat().length);
            
            try {
                if(user) {
                    let opponentID = usersID.filter((id) => id !== user.userID);
        
                    const opponent = await Axios.get(`FindUserById/${opponentID}`);
        
                    if(opponent.data.user) {
                        setOpponent(opponent.data.user);
                    }

                    setIsLoading(false);
                }
            } catch (e) {
                setError(e.response.data.message);
            }
        });

        if(exercises.length > 0) {
            socketEventOpponentAnwswer();
            socketEventGoToNextAnswer();
            socketEventChallengeFinished();
        }

        return () => {
            socket.off('opponentAnswer');
            socket.off('goToNextQuestion');
            socket.off('challengeFinished');
            socket.off('randomizedExercises');
        }
    }, [exercises, userAnswers, questionNumber, finished, opponent]);

    const socketEventOpponentAnwswer = () => {
        socket.on('opponentAnswer', (isCorrect) => {           
            setOpponentAnswers([...opponentAnswers, {
                exerciseID: exercises[questionNumber].exerciseID,
                isCorrect
            }]);

            if(isCorrect) {
                setOpponentXp(opponentXp + exercises[questionNumber].xp)
            }

            let userAnswered = userAnswers.findIndex((answer) => answer.exerciseID === exercises[questionNumber].exerciseID);
            
            if(userAnswered !== -1) {
                socket.emit('nextQuestion', roomNumber);
            }
        });
    }

    const socketEventGoToNextAnswer = () => {
        socket.on('goToNextQuestion', () => {
            setChecked(null);
            setQuestionNumber(oldQuestionNumber => {
                if(oldQuestionNumber < exercises.length - 1) {
                    return questionNumber + 1
                } else {
                    socket.emit('allUsersFinished', roomNumber);
                    return oldQuestionNumber;
                }
            });
            setWaitingOpponent(false);
        });
    }

    const socketEventChallengeFinished = () => {
        socket.on('challengeFinished', async () => {
            setIsLoading(true);
            let userCorrect = userAnswers.reduce((previousValue, answer) => answer.isCorrect ? previousValue + 1 : previousValue, 0);
            let opponentCorrect = opponentAnswers.reduce((previousValue, answer) => answer.isCorrect ? previousValue + 1 : previousValue, 0);

            if(userCorrect > opponentCorrect) {
                setWinner(1);
            } else if(userCorrect < opponentCorrect) {
                setWinner(0);
            } else {
                setWinner(-1);
            }

            try {
                if(userCorrect > opponentCorrect) {
                    await Axios.post(`/AddExperienceToUser/${user.userID}`, {
                        xpGain: userXp
                    });
                } else if(userCorrect === opponentCorrect) {
                    await Axios.post(`/AddExperienceToUser/${user.userID}`, {
                        xpGain: 10
                    });
                }
            } catch(e) {
                setError(e.response.data.message);
            }

            setIsLoading(false);
            setFinished(true);
        });
    }

    async function goToNextQuestion() {
        let isCorrect = false;

        if(exercises[questionNumber].type === "code") {
            isCorrect = await runCode();
        } else if(exercises[questionNumber].type === "quiz") {
            isCorrect = await nextQuizQuestion();
        }

        socket.emit('answered', roomNumber, isCorrect);
    }

    async function nextQuizQuestion() {
        try {
            let response = await Axios.get(`AlternativeIsCorrect/${checked}`);

            if(response.data) {
                saveAnswers(response.data.alternativeIsCorrect);
            }

            return response.data.alternativeIsCorrect;
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    async function runCode() {
        try {
            let response = await Axios.post(`SendExerciseCode/${user.userID}/${exercises[questionNumber].exerciseID}`, {
                userCode: code,
                language: currentTechnology
            });

            if(response.data.result) {
                saveAnswers(response.data.result.isCorrect);
            }

            return response.data.result.isCorrect;
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    function saveAnswers(isCorrect) {
        setUserAnswers([...userAnswers, {
            exerciseID: exercises[questionNumber].exerciseID,
            isCorrect
        }]);

        if(isCorrect) {
            setUserXp(userXp + exercises[questionNumber].xp);
        }

        setWaitingOpponent(true);
    }

    function quitTest() {
        navigation.goBack();
    }

    return (
        <View style={styles.screenContainer}>
            {
                isLoading && (
                    <LoadingComponent />
                )
            }
            {
                exercises.length > 0 && (
                    <>
                        {
                            finished && (
                                <>
                                    <View style={styles.finishedChellenge}>
                                        <PvPResult 
                                            user={user}
                                            userAnswers={userAnswers}
                                            opponent={opponent}
                                            opponentAnswers={opponentAnswers}
                                            questionNumber={questionNumber}
                                            winner={winner}
                                            userXp={userXp}
                                            opponentXp={opponentXp}
                                            drawXp={10}
                                        />
                                    </View>
                                    <View style={styles.buttonGroup}>
                                        <ButtonComponent onPress={quitTest} newStyle={{ width: '100%' }}>
                                            <Text style={styles.textButton}>
                                                Voltar ao início
                                            </Text>
                                        </ButtonComponent>
                                    </View>
                                </>
                            )
                        }

                        {
                            !finished && (
                                <>
                                    <ScrollView>
                                        <Header backArrow={true} navigation={navigation} />

                                        <View style={styles.content}>
                                            <View style={styles.scoreContent}>
                                                <UserScoreComponent 
                                                    user={user}
                                                    userAnswers={userAnswers}
                                                    questionNumber={questionNumber}
                                                />

                                                <UserScoreComponent 
                                                    user={opponent}
                                                    userAnswers={opponentAnswers}
                                                    questionNumber={questionNumber}
                                                />
                                            </View>

                                            <Text style={styles.title}>Questão {questionNumber + 1}</Text>

                                            <RenderJsonContent content={exercises[questionNumber].description} />

                                            <RenderAlternativesComponent 
                                                alternatives={exercises[questionNumber].alternatives}
                                                checked={checked}
                                                setChecked={setChecked}
                                                answered={answered}
                                                show={exercises[questionNumber].type === "quiz"}
                                                disabled={waitingOpponent}
                                            />

                                            <CodeEditorComponent 
                                                setCode={setCode} 
                                                language={currentTechnology} 
                                                theme="dracula" 
                                                show={exercises[questionNumber].type === "code" && !waitingOpponent} 
                                            />       

                                            {
                                                (waitingOpponent && exercises[questionNumber].type === "code") && (
                                                    <>
                                                        <SyntaxHighlighter 
                                                            language={currentTechnology} 
                                                            style={dracula}
                                                            highlighter={"hljs"}
                                                        >{code}</SyntaxHighlighter>
                                                    </>
                                                )
                                            } 
                                        </View>
                                    </ScrollView>

                                    <View style={styles.buttonGroup}>
                                        <ButtonComponent newStyle={styles.newStyleButtonCancel} onPress={quitTest}>
                                            <Text style={styles.textButton}>
                                                <Feather name="x" color={Colors.ERROR_COLOR} size={32} />
                                            </Text>
                                        </ButtonComponent>

                                        {
                                            questionNumber <= exercises.length && (
                                                <ButtonComponent 
                                                    newStyle={{...styles.newStyleButton, 
                                                            backgroundColor: questionNumber === exercises.length ? Colors.LIGHT_GREEN : 
                                                                !checked && exercises[questionNumber].type === 'quiz' ? Colors.PRIMARY_COLOR_DISABLED : Colors.PRIMARY_COLOR
                                                        }} 
                                                        onPress={goToNextQuestion}
                                                        disabled={!checked && exercises[questionNumber].type === 'quiz'}
                                                    >
                                                    <Text style={styles.textButton}>
                                                        <Feather 
                                                            name={questionNumber === exercises.length ? "check" : "chevron-right"} 
                                                            color={questionNumber === exercises.length ? Colors.GREEN_CHECK_ICON : Colors.WHITE_SAFE_COLOR} size={32} 
                                                        />
                                                    </Text>
                                                </ButtonComponent>
                                            )
                                        }
                                    </View>
                                </>
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

    scoreContent: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.TEXT_COLOR,
        marginBottom: 10
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
    },

    finishedChellenge: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }    
})