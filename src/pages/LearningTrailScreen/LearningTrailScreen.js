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
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import LearningTrailHeaderComponent from '../../components/LearningTrailHeader/LearningTrailHeaderComponent';
import Colors from '../../utils/ColorPallete/Colors';
import SvgPathComponent from '../../components/SvgPath/SvgPathComponent';
import PathObjects from '../../utils/SvgObjects/PathObjects';
import { Easing } from 'react-native-reanimated';
import AnimatedButtonComponent from '../../components/AnimatedButton/AnimatedButtonComponent';

export default function LearningTrail ({ navigation }) {
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
    ])

    return (
        <View style={styles.screenContainer}>
            <LearningTrailHeaderComponent navigation={navigation} />

            <FlatList 
                style={styles.learningTrail}
                data={classes}
                initialScrollIndex={classes.findIndex((item) => !item.isDone)}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.classesGroup}>
                            { index % 2 == 0 &&
                                <SvgPathComponent
                                    paths={PathObjects.evenPath}
                                    width={150}
                                    height={110}
                                    from={1}
                                    to={2}
                                    isDone={item.isDone}
                                />
                            }

                            <TouchableOpacity style={styles.classItem}>
                                {
                                    !item.isDone && (
                                        <>
                                            <AnimatedButtonComponent 
                                                isBoss={item.isBoss}
                                                delay={3600}
                                                style={styles.classImageAbsolute}
                                                from={2}
                                                to={-0.5}
                                                duration={1500}
                                                reverse={true}
                                                repeat={2}
                                                easingType={Easing.bounce}
                                            />
                                            <AnimatedButtonComponent 
                                                isBoss={item.isBoss}
                                                delay={4100}
                                                style={styles.classImage}
                                                from={0}
                                                to={-0.5}
                                                duration={750}
                                                reverse={true}
                                                repeat={2}
                                                easingType={Easing.circle}
                                            />
                                        </>
                                    ) 
                                }

                                {
                                    item.isDone && (
                                        <View style={[styles.classImage, item.isBoss ? { backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND } : {}]} />
                                    )
                                }
                                
                                <Text style={styles.classTitle}>{item.title}</Text>
                            </TouchableOpacity>   

                            { index !== classes.length - 1 && index % 2 == 1 &&
                                <SvgPathComponent
                                    paths={PathObjects.oddPath}
                                    width={150}
                                    height={110}
                                    from={1}
                                    to={2}
                                    isDone={item.isDone}
                                />
                            }

                            { index === classes.length - 1 &&
                            <View style={styles.initialPath}>
                                <Ionicons style={styles.initialIcon} name="md-home" size={24} color="black" />
                                <SvgPathComponent
                                    paths={PathObjects.initialPath}
                                    width={108}
                                    height={85}
                                    from={1}
                                    to={0}
                                    isDone={item.isDone}
                                />
                            </View>
                            }

                        </View>
                )}
            />

            <TouchableOpacity style={styles.versusButton}>
                <MaterialCommunityIcons name="sword-cross" size={28} color={Colors.BUTTON_VERSUS_ICON} />
            </TouchableOpacity>
        </View>
    )
}

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

    classImage: {
        width: 100,
        height: 100,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 50
    },

    classImageAbsolute: {
        width: 100,
        height: 100,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        left: 0
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

    initialPath: {
        justifyContent: 'center',
        alignItems: 'center'    
    },

    initialIcon: {
        position: 'absolute'
    }
})
