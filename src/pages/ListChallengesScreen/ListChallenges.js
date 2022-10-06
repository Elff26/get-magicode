import { useEffect, useState } from 'react';
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

const ListChallenges = ({ route, navigation }) => {
    const routeParams = route;
    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [challengeToDo, setChallengeToDo] = useState(null);
    const [challenges, setChallenges] = useState();
    const [openBottomSheet, setOpenBottomSheet] = useState(false);
    const [currentTechnology, setCurrentTechnology] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            
            var userData;

            if(routeParams.screen === 'ChooseTechnologies') {
                userData = routeParams.user;
            } else {
                userData = JSON.parse(await AsyncStorage.getItem('@User'));
            }

            if(userData) {
                setUser(userData);

                if(!userData.technologies || userData.technologies.length == 0) {
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
    }, [route]);

    useEffect(() => {
        if(routeParams.user) {
            setUser(routeParams.user);
        }
    }, [isFocused]);

    useEffect(() => {
        async function getChallenges() {
            if(currentTechnology && currentTechnology.technology) {
                try {
                    const response = await Axios.get(`/FindChallengeByTechnology/${currentTechnology.technology.technologyID}`);
                
                    if(response.data.challenges) {
                        setChallenges(response.data.challenges);
    
                        const responseUserChallenges = await Axios.get(`/FindUserChallengeByTechnology/${user.userID}/${currentTechnology.technology.technologyID}`);
                        
                        if(responseUserChallenges.data.userChallenges) {
                            let userChallenges = responseUserChallenges.data.userChallenges;
                            let userChallengesLength = userChallenges.length;
    
                            let challengeToDoTemp = userChallenges.findIndex((item) => !item.completed);
    
                            if(challengeToDoTemp !== -1) { 
                                setChallengeToDo(challengeToDoTemp);
                            } else if(userChallengesLength < response.data.challenges.length) {
                                setChallengeToDo(userChallengesLength);
                            } else {
                                setChallengeToDo(userChallengesLength - 1);
                            }
                        }
                    }
                } catch(e) {
                    setError(e.response.data.message);
                } 
            }
        }

        getChallenges();
    }, [currentTechnology]);

    async function goToClassroomScreen(challenge) {
        try {
            const response = await Axios.post(`InitChallenge/${user.userID}/${challenge.challengeID}`)

            if(response.data.userChallenge) {
                navigation.navigate('Classroom', {
                    challengeID: challenge.challengeID
                });
            }
        } catch(e) {
            setError(e.response.data.message);
        } 
    }

    return (
        <View style={[styles.screenContainer, openBottomSheet ? styles.backgroundWhenBottomSheetIsOpen : {}]}>
            {
                currentTechnology && (
                    <>
                        <ChallengesHeaderComponent 
                            navigation={navigation} 
                            openBottomSheet={openBottomSheet} 
                            setOpenBottomSheet={setOpenBottomSheet} 
                            currentTechnology={currentTechnology}
                        />

                        {
                            challengeToDo != null && (
                                <FlatList 
                                    extraData={user}
                                    style={styles.challenges}
                                    data={challenges}
                                    initialScrollIndex={challengeToDo}
                                    inverted={true}
                                    renderItem={({ item, index }) => (
                                        <View key={index} style={styles.challengesGroup}>
                                            <PathSide index={index} completed={index < challengeToDo} animated={challengeToDo === index ? true : false} todo={challengeToDo}>
                                                <TouchableOpacity style={styles.challengeItem} onPress={() => goToClassroomScreen(item)} disabled={!(index < challengeToDo || challengeToDo === index)}>
                                                    <AnimatedButtonGroupComponent item={item} animated={challengeToDo === index ? true : false} />
                                                    
                                                    <Text>{item.name}</Text>
                                                </TouchableOpacity>   
                                            </PathSide>
                                        </View>
                                    )}
                                />  
                            )
                        }

                        <TouchableOpacity style={styles.versusButton}>
                            <MaterialCommunityIcons name="sword-cross" size={28} color={Colors.RED_COLOR_DEFAULT} />
                        </TouchableOpacity>

                        {
                            (user && user.technologies && user.technologies.length > 0) && (
                                <BottomSheetTechnologiesComponent 
                                    setCurrentTechnology={setCurrentTechnology} 
                                    setUser={setUser} 
                                    user={user} 
                                    navigation={navigation} 
                                    open={openBottomSheet} 
                                    setOpenBottomSheet={setOpenBottomSheet} 
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
    }
})
