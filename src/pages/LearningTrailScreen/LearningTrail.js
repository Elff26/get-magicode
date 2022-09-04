import { useState } from 'react';
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
import SvgPathComponent from '../../components/SvgPath/SvgPathComponent';
import PathObjects from '../../utils/SvgObjects/PathObjects';
import AnimatedButtonClassComponent from '../../components/AnimatedButton/AnimatedButtonClassComponent';
import PathSide from '../../components/SvgPath/PathSide';

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
