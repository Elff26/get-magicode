import { useEffect, useState, useRef, useContext } from 'react';
import {
    FlatList,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ChallengesHeaderComponent from '../../components/ChallengesHeader/ChallengesHeaderComponent';
import Colors from '../../utils/ColorPallete/Colors';
import AnimatedButtonGroupComponent from '../../components/AnimatedButton/AnimatedButtonGroupComponent';
import PathSide from '../../components/SvgPath/PathSide';
import BottomSheetTechnologiesComponent from '../../components/BottomSheetTechnologies/BottomSheetTechnologiesComponent';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../api/api';
import { useIsFocused } from '@react-navigation/native';
import PvPInviteCard from '../../components/PlayerVSPlayer/PvPInviteCard';
import { Picker } from '@react-native-picker/picker';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import { LifeContext } from '../../utils/contexts/LifeContext';

const ListChallenges = ({ route, navigation }) => {
    const flatListRef = useRef();
    const { life, setLife } = useContext(LifeContext);

    const routeParams = route;
    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [challengeToDo, setChallengeToDo] = useState(null);
    const [challenges, setChallenges] = useState();
    const [difficulties, setDifficulties] = useState([]);
    const [selectedDifficultyID, setSelectedDifficultyID] = useState();
    const [openBottomSheet, setOpenBottomSheet] = useState(false);
    const [currentTechnology, setCurrentTechnology] = useState(null);
    const [error, setError] = useState("");
    const [showPvPCard, setShowPvPCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function getData() {
            setIsLoading(true);
            var userData;

            if(routeParams.user) {
                userData = routeParams.user;
            } else {
                userData = JSON.parse(await AsyncStorage.getItem('@User'));
            }

            try {
                const responseDifficulties = await Axios.get('/FindAllDifficulties');
    
                if(responseDifficulties.data.difficulties && mounted) {
                    setDifficulties(responseDifficulties.data.difficulties);

                    let difficultyID = Number(await AsyncStorage.getItem("@Difficulty"));

                    if(!difficultyID) {
                        difficultyID = responseDifficulties.data.difficulties[0].difficultyID;
                    }
                    
                    setSelectedDifficultyID(difficultyID);
                }
            } catch(e) {
                setError(e.response.data.message);
            }

            if(userData && mounted) {
                setUser(userData);

                if(!userData.technologies || userData.technologies.length == 0) {
                    setIsLoading(false);
                    return navigation.navigate('ChooseTechnologies');
                } 

                let currentTech = userData.technologies.filter(tech => tech.learning);

                if(currentTech.length === 0) {
                    currentTech = userData.technologies[0];
                } else {
                    currentTech = currentTech[0];
                }

                setCurrentTechnology(currentTech);
            }
        }

        getData();

        return () => {
            mounted = false;
        }
    }, [route]);

    useEffect(() => {
        function updateUser() {
            if(routeParams && routeParams.params && routeParams.params.user) {
                setUser(routeParams.params.user);
            }
        }

        updateUser();
    }, [isFocused]);

    useEffect(() => {
        let mounted = true;

        async function getChallenges() {
            setChallenges([]);
            setIsLoading(true);
            if(currentTechnology && currentTechnology.technology) {
                try {
                    const response = await Axios.get(`/FindChallengeByTechnologyAndDifficulty/${currentTechnology.technology.technologyID}/${selectedDifficultyID}`);

                    if(response.data.challenges && mounted) {
                        const responseUserChallenges = await Axios.get(`/FindUserChallengeByTechnologyAndDifficulty/${user.userID}/${currentTechnology.technology.technologyID}/${selectedDifficultyID}`);

                        if(responseUserChallenges.data.userChallenges) {
                            let userChallenges = responseUserChallenges.data.userChallenges;
                            let userChallengesLength = userChallenges.length;
    
                            let challengeToDoTemp = userChallenges.findIndex((item) => !item.completed);

                            if(mounted) {
                                if(challengeToDoTemp !== -1) { 
                                    setChallengeToDo(challengeToDoTemp);
                                } else if(userChallengesLength < response.data.challenges.length) {
                                    setChallengeToDo(userChallengesLength);
                                } else {
                                    setChallengeToDo(null);
                                }

                                setChallenges(response.data.challenges);

                                setIsLoading(false);
                            }
                        }
                    }
                } catch(e) {
                    setError(e.response.data.message);
                } 
            }
        }

        getChallenges();

        return () => {
            mounted = false;
        }
    }, [currentTechnology, selectedDifficultyID]);

    async function goToClassroomScreen(challenge) {
        setIsLoading(true);

        try {
            const response = await Axios.post(`InitChallenge/${user.userID}/${challenge.challengeID}`)

            if(response.data.userChallenge) {
                if(challenge.typeChallenge === 'boss') {
                    navigation.navigate('ClassroomExercise', {
                        challengeID: challenge.challengeID
                    })
                } else {
                    navigation.navigate('Classroom', {
                        challengeID: challenge.challengeID
                    });
                }

                setIsLoading(false);
            }
        } catch(e) {
            setError(e.response.data.message);
        } 
    }

    async function changeDifficulty(difficultyID) {
        await AsyncStorage.setItem("@Difficulty", String(difficultyID));
        setSelectedDifficultyID(difficultyID);
    }

    const renderChallengeItem = ({ item, index }) => (
        <View key={item.challengeID} style={styles.challengesGroup}>
            <PathSide index={index} completed={index < challengeToDo} animated={challengeToDo === index ? true : false} todo={challengeToDo}>
                <TouchableOpacity style={styles.challengeItem} onPress={() => goToClassroomScreen(item)} disabled={!(index < challengeToDo || challengeToDo === index) || life <= 0}>
                    <AnimatedButtonGroupComponent item={item} animated={challengeToDo === index ? true : false} />
                    
                    <Text>{item.name}</Text>
                </TouchableOpacity>   
            </PathSide>
        </View>
    )

    return (
        <View style={[styles.screenContainer, openBottomSheet ? styles.backgroundWhenBottomSheetIsOpen : {}]}>
            {
                isLoading && (
                    <LoadingComponent />
                )
            }

            {
                (challengeToDo != null && challenges.length > 0) && (
                    <>
                        {
                            currentTechnology && (
                                <ChallengesHeaderComponent 
                                    navigation={navigation} 
                                    openBottomSheet={openBottomSheet} 
                                    setOpenBottomSheet={setOpenBottomSheet} 
                                    currentTechnology={currentTechnology}
                                    userID={user.userID}
                                />
                            )
                        }
            
                        {
                            selectedDifficultyID && (
                                <View style={styles.pickerConteiner}>
                                    <Picker 
                                        style={styles.picker}
                                        selectedValue={selectedDifficultyID}
                                        onValueChange={(itemValue) => changeDifficulty(itemValue)}
                                    >
                                        {
                                            difficulties.map((difficulty) => (
                                                <Picker.Item style={styles.pickerItem} key={difficulty.difficultyID} label={difficulty.description} value={difficulty.difficultyID} />
                                            ))
                                        }
                                    </Picker>
                                </View>
                            )
                        }
            
                        <FlatList 
                            extraData={user}
                            ref={flatListRef}
                            style={styles.challenges}
                            data={challenges}
                            onContentSizeChange={() => {
                                if (challengeToDo && challengeToDo > 1) {
                                    flatListRef.current.scrollToIndex({  index: challengeToDo });
                                }
                            }}
                            onScrollToIndexFailed={() => {}}
                            inverted={true}
                            renderItem={renderChallengeItem}
                        />  
            
                        <TouchableOpacity style={styles.versusButton} onPress={() => setShowPvPCard(!showPvPCard)}>
                            <MaterialCommunityIcons name="sword-cross" size={28} color={Colors.RED_COLOR_DEFAULT} />
                        </TouchableOpacity>
            
                        {
                            currentTechnology && (
                                <PvPInviteCard 
                                    showCard={showPvPCard} 
                                    setShowCard={setShowPvPCard} 
                                    navigation={navigation} 
                                    user={user} 
                                    currentTechnology={currentTechnology}
                                />
                            )
                        }
            
                        {
                            (user && user.technologies && user.technologies.length > 0) && (
                                <BottomSheetTechnologiesComponent 
                                    setCurrentTechnology={setCurrentTechnology} 
                                    setUser={setUser} 
                                    user={user} 
                                    navigation={navigation} 
                                    open={openBottomSheet} 
                                    setOpenBottomSheet={setOpenBottomSheet} 
                                    setIsLoading={setIsLoading}
                                />
                            )
                        }
                    </>
                )
            }
            
        </View>
    )
}

export default gestureHandlerRootHOC(ListChallenges);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    backgroundWhenBottomSheetIsOpen: {
        backgroundColor: Colors.BOTTOM_SHEET_SCREEN_BACKGROUND
    },
    
    challenges: {
        height: '100%',
        width: '100%'
    },

    challengesGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    challengeItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 25
    }, 

    versusButton: {
        width: 60, 
        height: 60,
        backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10
    },

    pickerConteiner: {
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
        width: '50%',
        borderRadius: 10,
        marginLeft: 5,
        marginTop: 5
    },

    pickerItem: {
        textAlign: 'center',
        color: Colors.PRIMARY_COLOR,
        fontSize: 20
    }
})
