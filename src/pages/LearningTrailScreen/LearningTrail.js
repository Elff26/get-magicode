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

import LearningTrailHeaderComponent from '../../components/LearningTrailHeader/LearningTrailHeaderComponent';
import Colors from '../../utils/ColorPallete/Colors';
import AnimatedButtonClassComponent from '../../components/AnimatedButton/AnimatedButtonClassComponent';
import PathSide from '../../components/SvgPath/PathSide';
import BottomSheetTechnologiesComponent from '../../components/BottomSheetTechnologies/BottomSheetTechnologiesComponent';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LearningTrail = ({ route, navigation }) => {
    const routeParams = route;
    const [user, setUser] = useState();
    const [classes, setClasses] = useState([
        {
            title: 'Outra aula 2',
            isBoss: false,
            isDone: false
        },
        {
            title: 'Outra aula',
            isBoss: false,
            isDone: true
        },
        {
            title: 'Exercício',
            isBoss: true,
            isDone: true
        },
        {
            title: 'Tipos de Dados',
            isBoss: false,
            isDone: true
        },
        {
            title: 'Variáveis',
            isBoss: false,
            isDone: true
        },
        {
            title: 'Hello World!',
            isBoss: false,
            isDone: true
        }
    ]);
    const [openBottomSheet, setOpenBottomSheet] = useState(false);
    const [currentTechnology, setCurrentTechnology] = useState(null);

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

    return (
        <View style={[styles.screenContainer, openBottomSheet ? { backgroundColor: '#bbb' } : {}]}>
            {
                currentTechnology && (
                    <>
                        <LearningTrailHeaderComponent navigation={navigation} openBottomSheet={openBottomSheet} setOpenBottomSheet={setOpenBottomSheet} currentTechnology={currentTechnology} />


                        <FlatList 
                            style={styles.learningTrail}
                            data={classes}
                            initialScrollIndex={classes.findIndex((item) => !item.isDone)}
                            renderItem={({ item, index }) => (
                                <View key={index} style={styles.classesGroup}>
                                    <PathSide index={index} item={item} classesLength={classes.length}>
                                        <TouchableOpacity style={styles.classItem}>
                                            <AnimatedButtonClassComponent item={item} />
                                            
                                            <Text style={styles.classTitle}>{item.title}</Text>
                                        </TouchableOpacity>   
                                    </PathSide>
                                </View>
                            )}
                        />

                        <TouchableOpacity style={styles.versusButton}>
                            <MaterialCommunityIcons name="sword-cross" size={28} color={Colors.BUTTON_VERSUS_ICON} />
                        </TouchableOpacity>

                        {
                            (user && user.technologies && user.technologies.length > 0) && (
                                <BottomSheetTechnologiesComponent setCurrentTechnology={setCurrentTechnology} setUser={setUser} user={user} navigation={navigation} open={openBottomSheet} setOpenBottomSheet={setOpenBottomSheet} />
                            )
                        }
                    </>
                )
            }
        </View>
    )
}

export default gestureHandlerRootHOC(LearningTrail);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    
    learningTrail: {
        height: '100%',
        width: '100%'
    },

    classesGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    classItem: {
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
